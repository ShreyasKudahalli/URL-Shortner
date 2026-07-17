from django.urls import path

from .views import ShortenURLView,redirect_url

urlpatterns = [
    path("shorten/", ShortenURLView.as_view(), name="shorten-url"),
    path("<str:short_code>/", redirect_url, name="redirect-url"),
]