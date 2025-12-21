from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path("users/", view=views.UserAPIList.as_view(), name="users"),
    path("registration/", view=views.UserApi.as_view({"post":"create"}), name="registration"),
    path("context/", view=views.UserApi.as_view({"get":"list"}), name="registration"),
]
