from django.urls import path

from .views import ShortenURLView,redirect_url,AnalyticsView,DashboardView

urlpatterns = [
    path("shorten/", ShortenURLView.as_view(), name="shorten-url"),
    path("analytics/<str:short_code>/", AnalyticsView.as_view()),
    path("dashboard/", DashboardView.as_view(),name="dashboard"),
    path("<str:short_code>/", redirect_url, name="redirect-url"),
]