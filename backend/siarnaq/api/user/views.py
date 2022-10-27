# from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from siarnaq.api.user.models import UserProfile
from siarnaq.api.user.permissions import IsAuthenticatedAsRequestedUser
from siarnaq.api.user.serializers import (
    PublicUserProfileSerializer,
    UserProfileSerializer,
)


class UserProfileViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    """
    A viewset for retrieving and updating all user info.
    """

    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticatedAsRequestedUser,)

    def get_queryset(self):
        return UserProfile.objects.all()


class PublicUserProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for retrieving public user info.
    """

    serializer_class = PublicUserProfileSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return UserProfile.objects.all()