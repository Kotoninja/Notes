from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path("users/", view=views.UserAPIList.as_view(), name="users"),
    path("registration/", view=views.UserApi.as_view(), name="registration"),
]
