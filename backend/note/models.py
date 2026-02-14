from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from django.core.cache import cache
from project.models import Project
from cache.keys import PROJECT_DETAIL


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(
        Project, on_delete=models.SET_NULL, related_name="notes", null=True, blank=True
    )
    title = models.CharField(
        max_length=200, blank=True
    )  # BUG When creating a title, add text such as "untitled".
    description = models.CharField(max_length=150, blank=True)
    publication_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True, null=True)
    completed = models.BooleanField(default=False)


@receiver(signal=[post_delete, post_save], sender=Note)
def note_cache_invalidation(
    sender, instance, **kwargs
):  # BUG When adding a note in the admin panel, the project cache is not updated.
    cache.delete(key="user:{id}:notes:all".format(id=instance.user.id))
    if instance.project:
        cache.delete(PROJECT_DETAIL.format(id=instance.user.id, pk=instance.project.pk))
