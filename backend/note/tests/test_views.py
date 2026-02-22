from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from note.models import Note

NOTE_ALL_URL: str = reverse("note:all")
NOTE_CREATE_URL: str = reverse("note:create")


def NOTE_UPDATE_URL(note_id: int | str = 1) -> str:
    return reverse("note:update", kwargs={"pk": note_id})


def NOTE_DELETE_URL(note_id: int | str = 1) -> str:
    return reverse("note:delete", kwargs={"pk": note_id})


class NoteNoAuthTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username="bob", password="123")
        Note.objects.create(user=user, title="Test title")

    def test_note_methods(self):
        endpoints = [
            ("get", NOTE_ALL_URL, {}),
            ("post", NOTE_CREATE_URL, {"title": "TEST"}),
            ("put", NOTE_UPDATE_URL(), {"title": "hello"}),
            ("delete", NOTE_DELETE_URL(), {}),
        ]

        for method, endpoint, data in endpoints:
            with self.subTest(endpoint=endpoint, method=method, data=data):
                client_method = getattr(self.client, method)
                response = client_method(path=endpoint, data=data)
                self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
