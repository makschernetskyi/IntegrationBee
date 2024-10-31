from django.apps import AppConfig
from wagtail.users.apps import WagtailUsersAppConfig


class ApiConfig(WagtailUsersAppConfig):
    user_viewset = "api.viewsets.UserViewSet"

    def ready(self):
        import api.signals
