from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path("registration/", view=views.UserApi.as_view({"post":"create"}), name="registration"),
    path("context/", view=views.UserApi.as_view({"get":"retrieve"}), name="registration"),
]
