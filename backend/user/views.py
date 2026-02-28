from typing import Any

from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .serializers import UserSerializer


@extend_schema_view(
    list=extend_schema(summary="Information about the authorized user"),
    create=extend_schema(summary="Register a user"),
)
class UserApi(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_object(self) -> Any:
        return User.objects.get(pk=self.request.user.pk)

    def perform_create(self, serializer: UserSerializer):
        return serializer.save()

    def retrieve(self, request):
        if request.user.is_authenticated:
            user = self.get_object()
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        return Response(
            data={"detail": "Authentication credentials were not provided."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer=serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
