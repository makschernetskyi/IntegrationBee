from django.apps import AppConfig
from wagtail.users.apps import WagtailUsersAppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        import api.signals


class CustomUsersAppConfig(WagtailUsersAppConfig):
    user_viewset = "api.viewsets.UserViewSet"
