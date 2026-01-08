from functools import wraps
from django.core.cache import cache


def validate_cache(key: str):
    def decorator(func):
        @wraps(func)
        def wrappper(*args, **kwargs):
            id = args[1].__dict__.get("_auth").get("user_id")
            if id:
                cache.delete(key.format(id=id))
            else:
                print("Invalid cache key")
            return func(*args, **kwargs)

        return wrappper

    return decorator
