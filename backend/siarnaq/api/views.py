from django.conf import settings
from django.http import HttpResponse


def ping(request):
    """Check that the server is alive."""
    return HttpResponse("pong")


def build(request):
    """Return the current version of the server."""
    return HttpResponse(settings.SIARNAQ_BUILD)
