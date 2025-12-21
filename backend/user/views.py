from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


@extend_schema(
    description="Return a list of all usernames in the system.",
)
class UserAPIList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]


class UserApi(generics.CreateAPIView):  # TODO add routes
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        AllowAny,
    ]
