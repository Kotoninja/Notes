from django.contrib.auth.models import User
from django.test import TestCase

from user.models import Additional


class AdditionalModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.user = User.objects.create_user(username="Bob", password="123")

    def test_avatar_url(self):
        user_additional = Additional.objects.get(user=self.user)
        field_label = user_additional._meta.get_field("avatar_url")
        self.assertEqual(field_label.verbose_name, "avatar url")
        self.assertEqual(field_label.upload_to, "images/%Y/%m/%d")
        self.assertIsNone(field_label.default)
        self.assertTrue(field_label.blank)
