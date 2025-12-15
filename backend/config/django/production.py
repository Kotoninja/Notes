from .base import *

DEBUG = False

ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS", default=[])

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databasesu

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("POSTGRES_NAME"),
        "USER": env("POSTGRES_USER"),
        "PASSWORD": env("POSTGRES_PASSWORD"),
        "HOST": env("POSTGRES_HOST"),
        "PORT": env("POSTGRES_PORT"),
    }
}