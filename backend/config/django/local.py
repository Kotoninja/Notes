from .base import *
from django.db.utils import OperationalError

DEBUG = env.bool("DJANGO_DEBUG", default=True)

ALLOWED_HOSTS = ["*"]

print(f"Used DB - {env('DJANGO_DB')}")

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases


if env("DJANGO_DB") == "postgres":
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

else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
