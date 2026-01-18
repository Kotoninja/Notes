from django.urls import path

from project import views

urlpatterns = [
    path("ok/", view=views.check),
]
