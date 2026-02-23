from typing import Any, cast

from cache.decorators import validate_cache
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from .models import Note
from .serializers import NoteCreateSerializer, NoteSerializer, NoteUpdateSerializer


@extend_schema_view( # TODO Update API (project "null")
    list=extend_schema(
        summary="All user notes.",
        responses={
            status.HTTP_200_OK: NoteSerializer(many=True),
            status.HTTP_204_NO_CONTENT: OpenApiResponse(response={}),
        },
    ),
    create=extend_schema(  # FIXME description="Please specify <b>project</b> id or delete project field",
        summary="Create a note",
        request=NoteCreateSerializer,
        responses={
            status.HTTP_201_CREATED: NoteCreateSerializer,
            status.HTTP_400_BAD_REQUEST: OpenApiResponse(
                response={}, description="Bad request"
            ),
        },
    ),
    update=extend_schema(
        summary="Update a note.",
        request=NoteUpdateSerializer,
        responses={
            status.HTTP_200_OK: NoteUpdateSerializer,
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                response={}, description="Not found"
            ),
        },
    ),
    destroy=extend_schema(
        summary="Destroy a note.",
        responses={
            status.HTTP_200_OK: OpenApiResponse(response={}, description="Ok"),
            status.HTTP_404_NOT_FOUND: OpenApiResponse(
                response={}, description="Not found"
            ),
        },
    ),
)
class NoteApi(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_queryset(self) -> Any:
        return Note.objects.filter(user=self.request.user, project=None)

    def get_serializer_class(self, *args, **kwargs) -> Any:
        if self.action == "create":
            return NoteCreateSerializer
        if self.action == "update":
            return NoteUpdateSerializer
        return NoteSerializer

    def perform_create(self, serializer: NoteCreateSerializer):
        return serializer.save(user=self.request.user)

    def perform_update(self, serializer: NoteUpdateSerializer):
        instance = serializer.save()
        return instance

    def perform_destroy(self, instance: Note):
        instance.delete()

    def list(self, request):
        cache_key = "user:{id}:notes:all".format(id=request.user.id)

        cache_data = cache.get(cache_key)

        if cache_data:
            return Response(data=cache_data["data"], status=cache_data["status"])
        else:
            notes = self.get_queryset()
            if notes.exists():
                serializer = self.get_serializer(notes, many=True)
                cache.set(
                    cache_key,
                    {"data": serializer.data, "status": status.HTTP_200_OK},
                    timeout=600,
                )
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            cache.set(
                cache_key,
                {"data": [], "status": status.HTTP_204_NO_CONTENT},
                timeout=600,
            )
            return Response(data=[], status=status.HTTP_204_NO_CONTENT)

    @validate_cache(key="user:{id}:notes:all")
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_note = cast(Note, self.perform_create(serializer))
            response_data = dict(serializer.data) | {"id": new_note.pk}
            return Response(data=response_data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @validate_cache(key="user:{id}:notes:all")
    def update(self, request, pk):
        note = get_object_or_404(Note, pk=pk, user=request.user)
        serializer = self.get_serializer(note, data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_update(serializer)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @validate_cache(key="user:{id}:notes:all")
    def destroy(self, request, pk):
        self.perform_destroy(get_object_or_404(Note, pk=pk, user=request.user))
        return Response(status=status.HTTP_200_OK)
