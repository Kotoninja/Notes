from typing import Never
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from project.models import Project
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from note.models import Note
from note.serializers import NoteDetailOutputSerializer
from typing import cast
from project.serializers import (
    ProjectDetailOutputSerializer,
    ProjectInputSerializer,
    ProjectOutputSerializer,
)

"""
[x] API CRUD
[ ] Cache
[ ] Update OpenAPI
"""


class ProjectAPI(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        serializer = ProjectOutputSerializer(
            self.queryset.filter(user=request.user), many=True
        )
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        project = get_object_or_404(
            self.queryset.prefetch_related("notes"), pk=pk, user=request.user
        )
        serializer = ProjectDetailOutputSerializer(project)
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
