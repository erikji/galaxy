import json

from django.conf import settings
from django.db import models, transaction
from django.db.models import OuterRef, Subquery

from siarnaq.gcloud import saturn


class SaturnInvokableQuerySet(models.QuerySet):
    @property
    def _publish_topic(self):
        """The name of the topic to which queued items should be published."""
        raise NotImplementedError

    @property
    def _publish_ordering_key(self):
        """The ordering key with which to ensure FIFO order of queued items."""
        raise NotImplementedError

    @transaction.atomic
    def enqueue(self):
        """Enqueue all unqueued items in this queryset for invocation on Saturn."""
        from siarnaq.api.compete.models import SaturnStatus

        publish_client = saturn.get_publish_client()
        invocations = list(
            self.select_for_update().filter(status=SaturnStatus.CREATED).all()
        )
        futures = [
            publish_client.publish(
                topic=self._publish_topic,
                data=json.dumps(invocation.enqueue_options()).encode(),
                ordering_key=self._publish_ordering_key,
            )
            for invocation in invocations
        ]
        for invocation, future in zip(invocations, futures):
            try:
                message_id = future.result()
                invocation.status = SaturnStatus.QUEUED
                invocation.logs = f"Enqueued with ID: {message_id}"
            except Exception as err:
                invocation.status = SaturnStatus.ERRORED
                publish_client.resume_publish(
                    topic=self._publish_topic,
                    ordering_key=self._publish_ordering_key,
                )
                invocation.logs = f"type: {type(err)} Exception message: {err}"
        self.model.objects.bulk_update(invocations, ["status", "logs"])


class SubmissionQuerySet(SaturnInvokableQuerySet):
    @property
    def _publish_topic(self):
        return settings.GCLOUD_TOPIC_COMPILE

    @property
    def _publish_ordering_key(self):
        return settings.GCLOUD_ORDER_COMPILE


class MatchParticipantManager(models.Manager):
    def bulk_create(self, objs, **kwargs):
        """
        Create a collection of match participations in bulk, and set up the linked list
        connections for participations in all teams involved. It is required that these
        objects have the `submission` field set.

        Note that signals are not sent by bulk creation.

        See Also
        --------
        siarnaq.api.compete.signals.connect_linked_list :
            A post_save signal that performs the equivalent linked-list insertion
            performed by this method.
        """
        objs = list(objs)
        if any(obj.submission_id is None for obj in objs):
            raise ValueError("Must set MatchParticipant.submission to use bulk_create")
        objs = super().bulk_create(objs, **kwargs)
        self.model.objects.filter(pk__in={obj.pk for obj in objs}).update(
            previous_participation=Subquery(
                self.model.objects.filter(team=OuterRef("team"), pk__lt=OuterRef("pk"))
                .order_by("-pk")
                .values("pk")[:1]
            )
        )
        return objs


class MatchQuerySet(SaturnInvokableQuerySet):
    @property
    def _publish_topic(self):
        return settings.GCLOUD_TOPIC_EXECUTE

    @property
    def _publish_ordering_key(self):
        return settings.GCLOUD_ORDER_EXECUTE


class ScrimmageRequestQuerySet(models.QuerySet):
    def accept(self):
        """Accept all pending scrimmage requests in this queryset."""
        from siarnaq.api.compete.models import (
            Match,
            MatchParticipant,
            ScrimmageRequestStatus,
        )
        from siarnaq.api.teams.models import Team

        with transaction.atomic():
            requests = list(
                self.filter(status=ScrimmageRequestStatus.PENDING)
                .prefetch_related("maps")
                .select_for_update(of=("self"))
            )
            self.filter(pk__in={request.pk for request in requests}).update(
                status=ScrimmageRequestStatus.ACCEPTED
            )
            team_submissions = dict(
                Team.objects.with_active_submission()
                .filter(
                    pk__in={request.requested_by_id for request in requests}
                    | {request.requested_to_id for request in requests}
                )
                .values_list("pk", "active_submission")
                .all()
            )
            participations = MatchParticipant.objects.bulk_create(
                MatchParticipant(
                    team_id=team_id,
                    submission_id=team_submissions[team_id],
                )
                for request in requests
                for team_id in (
                    [request.requested_by_id, request.requested_to_id]
                    if request.determine_is_requester_red_first()
                    else [request.requested_to_id, request.requested_by_id]
                )
            )
            matches = Match.objects.bulk_create(
                Match(
                    episode_id=request.episode_id,
                    red=red,
                    blue=blue,
                    alternate_color=request.is_alternating_color(),
                    is_ranked=request.is_ranked,
                )
                for red, blue, request in zip(
                    participations[0::2], participations[1::2], requests
                )
            )
            Match.maps.through.objects.bulk_create(
                Match.maps.through(match=match, map=map_obj)
                for match, request in zip(matches, requests)
                for map_obj in request.maps.all()
            )

        # Send them to Saturn
        Match.objects.filter(pk__in={match.pk for match in matches}).enqueue()

    def reject(self):
        """Reject all pending scrimmage requests in this queryset."""
        from siarnaq.api.compete.models import ScrimmageRequestStatus

        self.filter(status=ScrimmageRequestStatus.PENDING).update(
            status=ScrimmageRequestStatus.REJECTED
        )
