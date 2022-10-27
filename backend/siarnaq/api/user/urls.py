from django.urls import include, path
from rest_framework.routers import DefaultRouter

from siarnaq.api.user import views

router = DefaultRouter()
router.register("all", views.UserProfileViewSet, basename="all")
router.register("public", views.PublicUserProfileViewSet, basename="public")

urlpatterns = [
    path("", include(router.urls)),
]