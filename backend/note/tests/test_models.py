from django.contrib.auth.models import User
from django.test import TestCase

from note.models import Note
from project.models import Project
from django.db import models


class AdditionalModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls) -> None:
        cls.user = User.objects.create_user(username="Bob", password="123")
        cls.note = Note.objects.create(user=cls.user, title="Test")

    def test_project_label(self):
        field_label = self.note._meta.get_field("project")
        self.assertEqual(field_label.verbose_name, "project")
        self.assertEqual(field_label.related_model, Project)
        self.assertEqual(field_label.remote_field.on_delete, models.SET_NULL)
        self.assertEqual(field_label.remote_field.related_name, "notes")
        self.assertTrue(field_label.null)
        self.assertTrue(field_label.blank)

    def test_title_field(self):
        field_label = self.note._meta.get_field("title")
        self.assertEqual(field_label.verbose_name, "title")
        self.assertEqual(field_label.max_length, 200)
        self.assertTrue(field_label.blank)

    def test_description_field(self):
        field_label = self.note._meta.get_field("description")
        self.assertEqual(field_label.verbose_name, "description")
        self.assertEqual(field_label.max_length, 150)
        self.assertTrue(field_label.blank)

    def test_publication_date_field(self):
        field_label = self.note._meta.get_field("publication_date")
        self.assertEqual(field_label.verbose_name, "publication date")
        self.assertTrue(field_label.auto_now_add)

    def test_end_date_field(self):
        field_label = self.note._meta.get_field("end_date")
        self.assertEqual(field_label.verbose_name, "end date")
        self.assertTrue(field_label.null)
        self.assertTrue(field_label.blank)

    def test_completed_field(self):
        field_label = self.note._meta.get_field("completed")
        self.assertEqual(field_label.verbose_name, "completed")
        self.assertFalse(field_label.default)
