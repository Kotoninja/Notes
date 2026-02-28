from django.urls import path

from project import views

app_name = "project"


urlpatterns = [
    path("", view=views.ProjectAPI.as_view({"get": "list"}), name="all"),
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
    path("create/", view=views.ProjectAPI.as_view({"post": "create"}), name="create"),
    path(
        "partial_update/<int:pk>/",
        view=views.ProjectAPI.as_view({"put": "partial_update"}),
        name="partial_update",
    ),
]
