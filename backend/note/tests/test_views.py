import json

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

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


class NoteAuthTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="bob", password="123")
        Note.objects.create(user=cls.user, title="Test title")

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

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
                if method == "post":
                    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
                else:
                    self.assertEqual(response.status_code, status.HTTP_200_OK)


class NoteCreateAPIBadRequestTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="bob", password="123")
        Note.objects.create(user=cls.user, title="Test title")

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_without_title_field(self):
        response = self.client.post(path=NOTE_CREATE_URL)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIsNotNone(response.data.get("title"))
        self.assertEqual(response.data["title"], ["This field is required."])

    def test_with_no_exist_project(self):
        project_id = 0
        response = self.client.post(
            path=NOTE_CREATE_URL, data={"title": "some text", "project": project_id}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIsNotNone(response.data.get("project"))
        self.assertEqual(
            response.data["project"],
            [f'Invalid pk "{project_id}" - object does not exist.'],
        )


class NoteUpdateAPIBadRequestTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.user = User.objects.create(username="Bob", password="123")
        cls.other_user = User.objects.create(username="Alex", password="123")

        cls.user_note = Note.objects.create(user=cls.user, title="Note for Bob")
        cls.other_user_note = Note.objects.create(
            user=cls.other_user, title="Note for Alex"
        )

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_no_exist_note(self):
        response = self.client.put(path=NOTE_UPDATE_URL(1111))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_with_empty_data(self):
        response = self.client.put(path=NOTE_UPDATE_URL(self.user_note.pk))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_someone_else_note(self):
        response = self.client.put(path=NOTE_UPDATE_URL(self.other_user_note.pk))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_bad_date_format(self):
        response = self.client.put(
            path=NOTE_UPDATE_URL(self.user_note.pk),
            data={"end_date": "invalid-date"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn(
            "Datetime has wrong format.", json.loads(response.content)["end_date"][0]
        )


class NoteDeleteAPIBadRequestTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.user = User.objects.create(username="Bob", password="123")
        cls.user_note = Note.objects.create(user=cls.user, title="Note for Bob")

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_with_no_exist_note(self):
        response = self.client.put(path=NOTE_UPDATE_URL(1111))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
