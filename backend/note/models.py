from cache.keys import PROJECT_DETAIL
from django.contrib.auth.models import User
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from django.utils import timezone
from project.models import Project


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(
        Project, on_delete=models.SET_NULL, related_name="notes", null=True, blank=True
    )
    title = models.CharField(max_length=200, null=True)
    description = models.CharField(max_length=150, blank=True)
    publication_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True, null=True)
    completed = models.BooleanField(default=False)

    def clean(self, *args, **kwargs):
        if self.end_date is not None and self.end_date < timezone.now():
            raise ValidationError(
                "The end date cannot be less than the current date.",
                params={"end_date": self.end_date},
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


@receiver(signal=[post_delete, post_save], sender=Note)
def note_cache_invalidation(sender, instance, **kwargs):
    cache.delete(key="user:{id}:notes:all".format(id=instance.user.id))
    if instance.project:
        cache.delete(PROJECT_DETAIL.format(id=instance.user.id, pk=instance.project.pk))
