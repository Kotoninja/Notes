from django.urls import path, include
from project import views
from rest_framework import routers

app_name = "project"

projects_pattern = [
    path("", view=views.ProjectAPI.as_view({"get": "list"}), name="list"),
    path(
        "detail/<int:pk>/",
        view=views.ProjectAPI.as_view({"get": "retrieve"}),
        name="detail",
    ),
    path(
        "delete/<int:pk>/",
        view=views.ProjectAPI.as_view({"delete": "destroy"}),
        name="delete",
    ),
    path("create/", view=views.ProjectAPI.as_view({"post": "create"})),
    path(
        "partial_update/<int:pk>/",
        view=views.ProjectAPI.as_view({"put": "partial_update"}),
    ),
]

urlpatterns = [
    path("", include((projects_pattern, "projects"))),
]
