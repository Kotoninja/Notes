from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import viewsets
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from .models import Note


# TODO JSON write time


class NoteApi(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def list(self, request):
        notes = Note.objects.filter(user = request.user)
        serializer = self.get_serializer(notes, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

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
