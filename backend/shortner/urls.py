from django.urls import path

from .views import ShortenURLView,redirect_url,AnalyticsView,DashboardView,DeleteURLView

urlpatterns = [
    path("shorten/", ShortenURLView.as_view(), name="shorten-url"),
    path("analytics/<str:short_code>/", AnalyticsView.as_view()),
    path("dashboard/", DashboardView.as_view(),name="dashboard"),
    path("delete/<int:pk>/", DeleteURLView.as_view(), name="delete-url"),
    path("<str:short_code>/", redirect_url, name="redirect-url"),

]