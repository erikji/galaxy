import google.cloud.scheduler as scheduler
from django.conf import settings
from django.contrib.sites.models import Site
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.urls import reverse

import siarnaq.gcloud as gcloud
from siarnaq.api.episodes.models import Episode


@receiver(pre_save, sender=Episode)
def update_autoscrim_schedule(instance, update_fields, **kwargs):
    """
    Update the Google Cloud Scheduler resource for automatic scrimmage scheduling
    whenever the specification is changed, raising an exception if the operation fails.
    """
    if not gcloud.enable_actions:
        return
    if update_fields is not None and "autoscrim_schedule" not in update_fields:
        return  # No new schedule
    try:
        old_schedule = Episode.objects.values_list("autoscrim_schedule", flat=True).get(
            pk=instance.pk
        )
    except Episode.DoesNotExist:
        old_schedule = None
    new_schedule = instance.autoscrim_schedule
    if old_schedule == new_schedule:
        return

    # Autoscrims are always best of 3. Future devs are welcome to change this if they
    # wish, perhaps by adding `best_of` as a column in the Episode model.
    best_of = 3

    parent = f"projects/{gcloud.project_id}/locations/{gcloud.location}"
    job_name = f"{parent}/jobs/autoscrim_{instance.name_short}"
    url = "https://{}{}".format(
        Site.objects.get_current().domain,
        reverse("episode-autoscrim", kwargs={"pk": instance.pk}),
    )
    job = scheduler.Job(
        name=job_name,
        description=f"Autoscrims for {instance.name_short} ({instance.name_long})",
        http_target=scheduler.HttpTarget(
            uri=url,
            http_method=scheduler.HttpMethod.POST,
            body=f"best_of={best_of}".encode(),
            oidc_token=scheduler.OidcToken(service_account_email=gcloud.admin_email),
        ),
        schedule=new_schedule,
        time_zone=settings.TIME_ZONE,
    )

    client = scheduler.CloudSchedulerClient(credentials=gcloud.credentials)
    if old_schedule is None:
        client.create_job(request=dict(parent=parent, job=job))
    elif new_schedule is None:
        client.delete_job(request=dict(name=job_name))
    else:
        client.update_job(request=dict(job=job))