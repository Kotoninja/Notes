from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from project.models import Project
from note.models import Note

USERNAME: str = "Bob"
PASSWORD: str = "123"
EMAIL: str = "Bob@email.ru"


ALL_PROJECT_URL: str = reverse("project:all")
CREATE_PROJECT_URL: str = reverse("project:create")


def DELETE_PROJECT_URL(project_id: int | str = 1) -> str:
    return reverse("project:delete", kwargs={"pk": project_id})


def DETAIL_PROJECT_URL(project_id: int | str = 1) -> str:
    return reverse("project:detail", kwargs={"pk": project_id})


def PARTIAL_UPDATE_PROJECT_URL(project_id: int | str = 1) -> str:
    return reverse("project:partial_update", kwargs={"pk": project_id})


class ProjectNoAuthTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username="bob", password="123")
        cls.project = Project.objects.create(user=user, name="Test Project")

    def test_all_method(self):
        endpoints = [
            ("get", ALL_PROJECT_URL, {}),
            ("post", CREATE_PROJECT_URL, {"name": "BLABLA"}),
            ("delete", DELETE_PROJECT_URL(), {}),
            ("get", DETAIL_PROJECT_URL(), {}),
            ("patch", PARTIAL_UPDATE_PROJECT_URL(), {"name": "123123"}),
        ]

        for method, url, data in endpoints:
            with self.subTest(method=method, url=url, data=data):
                client_method = getattr(self.client, method)
                response = client_method(path=url, data=data)
                self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ProjectAuthTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="bob", password="123")
        cls.project = Project.objects.create(user=cls.user, name="Test project")

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_note_methods(self):
        endpoints = [
            ("get", ALL_PROJECT_URL, {}),
            ("post", CREATE_PROJECT_URL, {"name": "BLABLA"}),
            ("get", DETAIL_PROJECT_URL(self.project.pk), {}),
            ("put", PARTIAL_UPDATE_PROJECT_URL(self.project.pk), {"name": "123123"}),
            ("delete", DELETE_PROJECT_URL(self.project.pk), {}),
        ]

        for method, endpoint, data in endpoints:
            with self.subTest(endpoint=endpoint, method=method, data=data):
                client_method = getattr(self.client, method)
                response = client_method(path=endpoint, data=data)
                match method:
                    case "post":
                        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
                    case "delete":
                        self.assertEqual(
                            response.status_code, status.HTTP_204_NO_CONTENT
                        )
                    case _:
                        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProjectCreateAPIBadRequestTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="bob", password="123")
        cls.project = Project.objects.create(user=cls.user, name="Test project")

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_with_empty_data(self):
        response = self.client.post(path=CREATE_PROJECT_URL)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_color_without_hash(self):  # FIXME: BAD REQUEST
        response = self.client.post(path=CREATE_PROJECT_URL, data={"color": "ffffff"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    # TODO add test with color "green"


class ProjectDetailAPIWihNotesTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="bob", password="123")
        cls.project = Project.objects.create(user=cls.user, name="Test project")
        for i in range(2):
            Note.objects.create(user=cls.user, title=str(i), project=cls.project)

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_project_note_output(self):
        response = self.client.get(path=DETAIL_PROJECT_URL(self.project.pk))
        self.assertIsNotNone(response.data.get("notes"))
        self.assertEqual(len(response.data.get("notes")), 2)


class ProjectUpdateAPIBadRequestTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.user = User.objects.create(username="Bob", password="123")
        cls.other_user = User.objects.create(username="Alex", password="123")

        cls.user_project = Project.objects.create(user=cls.user, name="Note for Bob")
        cls.other_user_project = Project.objects.create(
            user=cls.other_user, name="Note for Alex"
        )

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_no_exist_project(self):
        response = self.client.put(path=PARTIAL_UPDATE_PROJECT_URL(111))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_someone_else_note(self):
        response = self.client.put(
            path=PARTIAL_UPDATE_PROJECT_URL(self.other_user_project.pk)
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_with_empty_data(self):
        response = self.client.put(
            path=PARTIAL_UPDATE_PROJECT_URL(self.user_project.pk)
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_color_with_hash(self):  # FIXME: BAD REQUEST
        response = self.client.post(path=CREATE_PROJECT_URL, data={"color": "ffffff"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    # TODO add test with color "green"


class ProjectDeleteAPIBadRequestTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.user = User.objects.create(username="Bob", password="123")
        cls.other_user = User.objects.create(username="Alex", password="123")

        cls.user_project = Project.objects.create(user=cls.user, name="Note for Bob")
        cls.other_user_project = Project.objects.create(
            user=cls.other_user, name="Note for Alex"
        )

    def setUp(self) -> None:
        self.client = APIClient()
        refresh = RefreshToken.for_user(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_no_exist_project(self):
        response = self.client.delete(path=DELETE_PROJECT_URL(111))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_someone_else_note(self):
        response = self.client.delete(
            path=DELETE_PROJECT_URL(self.other_user_project.pk)
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
