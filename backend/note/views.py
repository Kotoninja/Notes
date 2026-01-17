from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .serializers import NoteSerializer, NoteCreateSerializer
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .models import Note
from drf_spectacular.utils import extend_schema, extend_schema_view
from drf_spectacular.utils import OpenApiResponse, OpenApiExample
from django.core.cache import cache
from cache.decorators import validate_cache


@extend_schema_view(
    list=extend_schema(
        summary="All user notes.",
        responses={
            status.HTTP_200_OK: NoteSerializer,
            status.HTTP_204_NO_CONTENT: OpenApiResponse(response={}),
        },
    ),
    create=extend_schema(
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
        description="The value of 'user' <b>does not</b> change.",
        responses={
            status.HTTP_200_OK: NoteSerializer,
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

    def list(self, request):
        cache_key = "user:{id}:notes:all".format(id=request.user.id)

        cache_data = cache.get(cache_key)

        if cache_data:
            return Response(data=cache_data["data"], status=cache_data["status"])
        else:
            notes = Note.objects.filter(user=request.user)
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
        context: dict = {"user": request.user.pk, **request.data}
        serializer = NoteCreateSerializer(data=context)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @validate_cache(key="user:{id}:notes:all")
    def update(self, request, pk):
        note = get_object_or_404(Note, pk=pk, user=request.user)
        context: dict = {"user": request.user.pk, **request.data}
        serializer = self.get_serializer(note, context)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    @validate_cache(key="user:{id}:notes:all")
    def destroy(self, request, pk):
        get_object_or_404(Note, pk=pk, user=request.user).delete()
        return Response(status=status.HTTP_200_OK)
