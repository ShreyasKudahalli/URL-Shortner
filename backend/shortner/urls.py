from django.urls import path

from .views import ShortenURLView,redirect_url,AnalyticsView

urlpatterns = [
    path("shorten/", ShortenURLView.as_view(), name="shorten-url"),
    path("<str:short_code>/", redirect_url, name="redirect-url"),
    path("analytics/<str:short_code>/", AnalyticsView.as_view()),
]