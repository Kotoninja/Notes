from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from project.models import Project
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from typing import cast
from project.serializers import (
    ProjectDetailOutputSerializer,
    ProjectInputSerializer,
    ProjectOutputSerializer,
)
from django.core.cache import cache
from cache import keys
from drf_spectacular.utils import extend_schema, extend_schema_view
from drf_spectacular.utils import OpenApiResponse


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
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectInputSerializer

    def list(self, request):
        cache_key = keys.PROJECT_ALL.format(id=request.user.pk)

        cache_data = cache.get(key=cache_key)

        if cache_data:
            # print("Cached")
            return Response(data=cache_data["data"], status=cache_data["status"])
        else:
            serializer = ProjectOutputSerializer(
                self.queryset.filter(user=request.user), many=True
            )
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
            # print("Cached")
            return Response(data=cache_data["data"], status=cache_data["status"])
        else:
            project = get_object_or_404(
                self.queryset.prefetch_related("notes"), pk=pk, user=request.user
            )
            serializer = ProjectDetailOutputSerializer(project)
            cache.set(
                key=cache_key,
                value={"data": serializer.data, "status": status.HTTP_200_OK},
                timeout=600,
            )
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        serializer = ProjectInputSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_project = cast(Project, serializer.save(user=request.user))
            response_data = dict(serializer.data) | {"id": new_project.pk}
            return Response(data=response_data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectInputSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        get_object_or_404(
            self.queryset.prefetch_related("notes"), pk=pk, user=request.user
        ).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
