from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from user.models import Additional

USERNAME: str = "Bob"
PASSWORD: str = "123"
EMAIL: str = "Bob@email.ru"
REGISTRATION_URL: str = reverse("user:registration")
TOKEN_OBTAIN_PAIR_URL: str = reverse("token_obtain_pair")
USER_CONTEXT_URL: str = reverse("user:context")


class RegistrationTestCase(APITestCase):
    def test_registration_with_good_credentials(self):
        response = self.client.post(
            REGISTRATION_URL,
            {"username": USERNAME, "password": PASSWORD, "email": EMAIL},
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Additional.objects.count(), 1)

    def test_registration_with_wrong_email(self):
        response = self.client.post(
            REGISTRATION_URL,
            {"username": USERNAME, "password": PASSWORD, "email": "email"},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"email": ["Enter a valid email address."]})

    def test_registration_without_username_field(self):
        response = self.client.post(
            REGISTRATION_URL,
            {"password": PASSWORD, "email": EMAIL},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"username": ["This field is required."]})

    def test_registration_without_password_field(self):
        response = self.client.post(
            REGISTRATION_URL,
            {"username": USERNAME, "email": EMAIL},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"password": ["This field is required."]})

    def test_registration_without_email_field(self):
        response = self.client.post(
            REGISTRATION_URL,
            {"username": USERNAME, "password": PASSWORD},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"email": ["This field is required."]})


class RegisteringWhenAnotherUserExistsTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username=USERNAME, password=PASSWORD, email=EMAIL)

    def test_registration_on_exist_email(self):
        response = self.client.post(
            REGISTRATION_URL,
            {"username": USERNAME + "TEST", "password": PASSWORD, "email": EMAIL},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"email": "An account with this email exists."})

    def test_registration_on_exist_username(self):
        response = self.client.post(
            REGISTRATION_URL,
            {"username": USERNAME, "password": PASSWORD, "email": "TEST" + EMAIL},
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data, {"username": ["A user with that username already exists."]}
        )

    def test_registration_on_exist_password(self):
        response = self.client.post(
            REGISTRATION_URL,
            {
                "username": USERNAME + "TEST",
                "password": PASSWORD,
                "email": "TEST" + EMAIL,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)


class AuthUserTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username=USERNAME, password=PASSWORD, email=EMAIL)

    def test_login_request(self):
        response = self.client.post(
            path=TOKEN_OBTAIN_PAIR_URL,
            data={"username": USERNAME, "password": PASSWORD},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "refresh")
        self.assertContains(response, "access")

    def test_get_user_context_no_auth(self):
        response = self.client.get(path=USER_CONTEXT_URL)
        self.assertEqual(
            response.status_code, status.HTTP_401_UNAUTHORIZED, response.content
        )

    def test_get_user_context(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
        response = self.client.get(path=USER_CONTEXT_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
