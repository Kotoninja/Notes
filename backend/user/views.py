from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework.response import Response
from rest_framework import status


@extend_schema(
    summary="Return a list of all usernames in the system.",
)
class UserAPIList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsAuthenticated,
    ]


@extend_schema_view(
    list=extend_schema(summary="Information about the authorized user"),
    create=extend_schema(summary="Register a user"),
)
class UserApi(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        if request.user.is_authenticated:
            user = User.objects.get(pk=request.user.id)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        return Response(
            data={"detail": "Authentication credentials were not provided."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    def post(self, request):
        serializer = self.get_serializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
