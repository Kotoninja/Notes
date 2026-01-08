from django.urls import path
from note import views

urlpatterns = [
    path("all/", view=views.NoteApi.as_view({"get": "list"}), name="notes"),
    path("create/", view=views.NoteApi.as_view({"post": "create"}), name="notes"),
    path("update/<int:pk>/", view=views.NoteApi.as_view({"put": "update"}), name="notes"),
    path("delete/<int:pk>/", view=views.NoteApi.as_view({"delete": "destroy"}), name="notes"),
]
