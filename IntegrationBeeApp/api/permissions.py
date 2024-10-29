from rest_framework.permissions import BasePermission

from home.models import CompetitionPost
from .models import User


class IsAdminUser(BasePermission):
    """
    Custom permission to only allow users with the admin role to access the view.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin()


class IsPublishedCompetitionPost(BasePermission):
    """
    Custom permission to only allow access to competitions with published CompetitionPost entries.
    """

    def has_permission(self, request, view):
        if request.method == 'GET':
            competition_id = view.kwargs.get('pk')

            if competition_id is not None:
                is_live = CompetitionPost.objects.filter(
                    competition_id=competition_id, live=True
                ).exists()
                return is_live

        return False
