from django.db import models
from django.contrib.auth.models import User
import random
from django.core.cache import cache
from cache import keys
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


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

        return super(Project, self).save(update_fields=["name", "color"])

    def clear_cache(self):
        cache.delete(key=keys.PROJECT_ALL.format(id=self.user.pk))
        cache.delete(key=keys.PROJECT_DETAIL.format(id=self.user.pk, pk=self.pk))

    def __str__(self):
        return f"User - {self.user.pk} : {self.pk} - {self.name} {self.color and '- colored'}"


@receiver([post_save, post_delete], sender=Project)
def clear_project_cache(sender, instance, **kwargs):
    instance.clear_cache()
