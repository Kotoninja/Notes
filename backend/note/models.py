from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=150, blank=True)
    publication_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True, null=True)
    completed = models.BooleanField(default=False)
