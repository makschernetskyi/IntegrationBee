from rest_framework.permissions import BasePermission
from .models import User


class IsAdminUser(BasePermission):
    """
    Custom permission to only allow users with the admin role to access the view.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin()

