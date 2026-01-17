from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete
from django.core.cache import cache


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=150, blank=True)
    publication_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True, null=True)
    completed = models.BooleanField(default=False)


@receiver(signal=[post_delete, post_save], sender=Note)
def note_cache_invalidation(sender, instance, **kwargs):
    cache.delete(key="user:{id}:notes:all".format(id=instance.user.id))
