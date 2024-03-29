from .base import *

DEBUG = False

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "IntegrationBeeDB",
        "USER": "massraum",
        "PASSWORD": "12345678",
        "HOST": "massraum.mysql.eu.pythonanywhere-services.com",
    }
}

try:
    from .local import *
except ImportError:
    pass
