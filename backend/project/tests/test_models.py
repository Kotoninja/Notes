import re

from django.contrib.auth.models import User
from django.test import TestCase

from project.models import Project


class AdditionalModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.user = User.objects.create_user(username="Bob", password="123")
        cls.project = Project.objects.create(user=cls.user)

    def test_name_label(self):
        field_label = self.project._meta.get_field("name")
        self.assertEqual(field_label.verbose_name, "name")
        self.assertEqual(field_label.max_length, 200)
        self.assertTrue(field_label.blank)

    def test_description_field(self):
        field_label = self.project._meta.get_field("description")
        self.assertEqual(field_label.verbose_name, "description")
        self.assertEqual(field_label.max_length, 150)
        self.assertTrue(field_label.blank)

    def test_created_field(self):
        field_label = self.project._meta.get_field("created")
        self.assertEqual(field_label.verbose_name, "created")
        self.assertTrue(field_label.auto_now_add)

    def test_color_field(self):
        field_label = self.project._meta.get_field("color")
        self.assertEqual(field_label.verbose_name, "color")
        self.assertEqual(field_label.max_length, 7)
        self.assertTrue(field_label.blank)

    def test_str(self):
        self.assertEqual(
            str(self.project),
            f"User - {self.user.pk} : {self.project.pk} - {self.project.name} {self.project.color and '- colored'}",
        )

    def test_save(self):
        self.assertEqual(self.project.name, f"Project #{self.project.pk}")
        self.assertIsNotNone(self.project.color)

    def test_color_validation(self):
        self.assertTrue(re.match(r"^#(?:[0-9a-fA-F]{3}){1,2}$", self.project.color))
