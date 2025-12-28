from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .models import Note
from drf_spectacular.utils import extend_schema, extend_schema_view
from drf_spectacular.utils import OpenApiResponse, OpenApiExample


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
        description="'publication_date' sets the current time and <b>NEVER</b> changes. <br> The 'completed' parameter is <b>always</b> 'false'. <br> The user is determined by the request. ",
        responses={
            status.HTTP_201_CREATED: NoteSerializer,
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
# TODO JSON write time
class NoteApi(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def list(self, request):
        notes = Note.objects.filter(user=request.user)
        if notes.exists():
            serializer = self.get_serializer(notes, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data=[], status=status.HTTP_204_NO_CONTENT)

    def create(self, request):
        context: dict = {"user": request.user.pk, **request.data, "completed": False}
        serializer = self.get_serializer(data=context)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        note = get_object_or_404(Note, pk=pk, user=request.user)
        context: dict = {"user": request.user.pk, **request.data}
        serializer = self.get_serializer(note, context)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk):
        get_object_or_404(Note, pk=pk, user=request.user).delete()
        return Response(status=status.HTTP_200_OK)
