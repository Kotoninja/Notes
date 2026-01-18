from django.db import models
from django.contrib.auth.models import User
import random


class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=150, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=7, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.name:
            self.name = f"Project #{self.pk}"

        if not self.color:
            self.color = f"#{hex(random.randrange(2**24))[2:]}"

        return super(Project, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.pk} - {self.name}"
