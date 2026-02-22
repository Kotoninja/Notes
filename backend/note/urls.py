from django.urls import path

from note import views

app_name = "note"

urlpatterns = [
    path("all/", view=views.NoteApi.as_view({"get": "list"}), name="all"),
    path("create/", view=views.NoteApi.as_view({"post": "create"}), name="create"),
    path(
        "update/<int:pk>/", view=views.NoteApi.as_view({"put": "update"}), name="update"
    ),
    path(
        "delete/<int:pk>/",
        view=views.NoteApi.as_view({"delete": "destroy"}),
        name="delete",
    ),
]
