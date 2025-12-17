from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User


class Additional(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
    avatar_url = models.ImageField(upload_to="images/%Y/%m/%d", default=None, blank=True)


@receiver(post_save, sender=User)
def user_handler(sender, instance, created, **kwargs):
    if created:
        Additional.objects.create(user=instance)
