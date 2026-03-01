from typing import Any, cast

from cache import keys
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from project.models import Project
from project.serializers import (
    ProjectDetailOutputSerializer,
    ProjectInputSerializer,
    ProjectOutputSerializer,
)


@extend_schema_view(
    list=extend_schema(
        summary="All user projects.",
        responses={
            status.HTTP_200_OK: ProjectOutputSerializer(many=True),
        },
    ),
    retrieve=extend_schema(
        summary="Project detail.",
        responses={
            status.HTTP_200_OK: ProjectDetailOutputSerializer(),
        },
    ),
    create=extend_schema(
        summary="Create a project",
        request=ProjectInputSerializer,
        responses={
            status.HTTP_201_CREATED: ProjectInputSerializer,
        },
    ),
    partial_update=extend_schema(
        summary="Project partial update.",
        responses={
            status.HTTP_200_OK: ProjectInputSerializer,
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                response={}, description="Not found"
            ),
        },
    ),
    destroy=extend_schema(
        summary="Destroy a project.",
        responses={
            status.HTTP_200_OK: OpenApiResponse(response={}, description="Ok"),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                response={}, description="Not found"
            ),
        },
    ),
)
class ProjectAPI(viewsets.ModelViewSet):
    queryset = Project.objects
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectInputSerializer

    def get_object(self) -> Project:  # type: ignore
        return get_object_or_404(
            self.queryset,
            pk=self.kwargs.get("pk"),
            user=self.request.user,
        )

    def filter_queryset(self, queryset) -> Project:
        return get_object_or_404(
            queryset.prefetch_related("notes"),
            pk=self.kwargs.get("pk"),
            user=self.request.user,
        )

    def get_queryset(self) -> Any:
        return self.queryset.filter(user=self.request.user)

    def get_serializer_class(self) -> type[Serializer]:  # type: ignore
        if self.action == "list":
            return ProjectOutputSerializer
        if self.action == "retrieve":
            return ProjectDetailOutputSerializer
        return ProjectInputSerializer

    def perform_create(self, serializer: ProjectInputSerializer):
        return serializer.save(user=self.request.user)

    def perform_update(self, serializer: ProjectInputSerializer):
        instance = serializer.save()
        return instance

    def perform_destroy(self, instance: Project):
        instance.delete()

    def list(self, request):
        cache_key = keys.PROJECT_ALL.format(id=request.user.pk)

        cache_data = cache.get(key=cache_key)

        if cache_data:
            return Response(data=cache_data["data"], status=cache_data["status"])
        else:
            serializer = self.get_serializer(self.get_queryset(), many=True)
            cache.set(
                key=cache_key,
                value={"data": serializer.data, "status": status.HTTP_200_OK},
                timeout=600,
            )
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        cache_key = keys.PROJECT_DETAIL.format(id=request.user.pk, pk=pk)

        cache_data = cache.get(key=cache_key)

        if cache_data:
            return Response(data=cache_data["data"], status=cache_data["status"])
        else:
            project = self.filter_queryset(self.queryset)
            serializer = self.get_serializer(project)
            cache.set(
                key=cache_key,
                value={"data": serializer.data, "status": status.HTTP_200_OK},
                timeout=600,
            )
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_project = cast(Project, self.perform_create(serializer=serializer))
            response_data = dict(serializer.data) | {"id": new_project.pk}
            return Response(data=response_data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk):
        project = self.get_object()
        serializer = self.get_serializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer=serializer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        self.perform_destroy(self.get_object())
        return Response(status=status.HTTP_204_NO_CONTENT)
