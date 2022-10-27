from django.conf import settings
from django.db import models

import siarnaq.api.refs as refs


class EligibilityCriterion(models.Model):
    """
    A database model for an eligibility criterion for entering into a tournament.
    """

    episode = models.ForeignKey(
        refs.EPISODE_MODEL,
        on_delete=models.CASCADE,
        related_name="eligibility_criteria",
    )
    """The episode to which this criterion belongs."""

    question = models.TextField()
    """The text question to be asked for this criterion."""

    icon = models.CharField(max_length=8)
    """An icon to display for teams that satisfy this criterion."""


class Rating(models.Model):
    """
    An immutable database model for a Penalized Elo rating.
    """

    mean = models.FloatField(default=settings.TEAMS_ELO_INITIAL)
    """The Elo rating mean."""

    n = models.PositiveIntegerField(default=0)
    """The number of rated games played before this rating."""

    def step(self, opponent_rating, score):
        """Produce the new rating after a specific match is played."""
        e_self = self.win_probability(opponent_rating)
        new_mean = self.mean + settings.TEAMS_ELO_K * (score - e_self)
        return Rating.objects.create(
            mean=new_mean,
            n=self.n + 1,
        )

    def win_probability(self, opponent_rating):
        """Return the probability of winning against a given opponent."""
        diff = self.mean - opponent_rating.mean
        return 1 / (1 + 10 ** (-diff / settings.TEAMS_ELO_SCALE))

    def to_value(self):
        """Return the penalized version of this Elo rating."""
        return (
            self.mean
            - settings.TEAMS_ELO_INITIAL * settings.TEAMS_ELO_PENALTY**self.n
        )


class TeamStatus(models.TextChoices):
    """
    An immutable type enumerating the possible varieties of teams.
    """

    REGULAR = "R"
    """A regular team consisting of regular members."""

    INACTIVE = "X"
    """
    A regular team with no remaining members.
    Inactive teams cannot be reactivated and are only kept as archival data.
    """

    STAFF = "S"
    """
    A team with staff privileges that can play matches requested by regular teams.
    Staff teams do not have ratings.
    """

    INVISIBLE = "O"
    """
    A team with staff privileges that is invisible to regular users.
    Invisible teams are useful for testing purposes.
    """


class Team(models.Model):
    """
    A database model for a team participating in an episode.
    """

    episode = models.ForeignKey(
        refs.EPISODE_MODEL,
        on_delete=models.PROTECT,
        related_name="teams",
    )
    """The episode to which this team belongs."""

    name = models.CharField(max_length=32)
    """The name of the team."""

    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="teams")
    """The users who belong to this team."""

    join_key = models.SlugField(max_length=24)
    """A passcode for users to join the team."""

    status = models.CharField(
        max_length=1,
        choices=TeamStatus.choices,
        default=TeamStatus.REGULAR,
    )
    """The type of the team."""

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["episode", "name"],
                name="team-unique-episode-name",
            )
        ]

    def is_staff(self):
        """Check whether this is a team with staff privileges."""
        return self.status in {TeamStatus.STAFF, TeamStatus.INVISIBLE}

    def can_participate_tournament(self):
        """Check whether this team status can participate in a tournament."""
        return self.status == TeamStatus.REGULAR

    def has_active_submission(self):
        """Return whether this team has an active submission."""
        return self.submissions.filter(accepted=True).exists()

    def get_active_submission(self):
        """Return the current active submission belonging to the team."""
        return self.submissions.filter(accepted=True).order_by("-created").first()


class TeamProfile(models.Model):
    """
    A database model for the profile information augmenting a team of users.
    """

    team = models.OneToOneField(
        Team,
        on_delete=models.PROTECT,
        primary_key=True,
        related_name="profile",
    )
    """The team being augmented by this profile."""

    quote = models.CharField(max_length=80, blank=True)
    """The short quote written by the team, if any."""

    biography = models.TextField(max_length=1024, blank=True)
    """The biography provided by the team, if any."""

    has_avatar = models.BooleanField(default=False)
    """Whether the team has an uploaded avatar."""

    rating = models.OneToOneField(Rating, on_delete=models.PROTECT)
    """The current rating of the team."""

    auto_accept_ranked = models.BooleanField(default=True)
    """Whether the team automatically accepts ranked match requests."""

    auto_accept_unranked = models.BooleanField(default=True)
    """Whether the team automatically accepts unranked match requests."""

    eligible_for = models.ManyToManyField(EligibilityCriterion, related_name="teams")
    """The eligibility criteria that this team satisfies."""