import logging

from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication
from wagtail import hooks

from home.models import CompetitionPost
from .models import User, Competition
from rest_framework.authentication import TokenAuthentication
from wagtail.admin.models import Admin


class IsPublishedCompetitionPost(BasePermission):
    """
    Custom permission to only allow access to competitions with published CompetitionPost entries.
    """

    def has_permission(self, request, view):
        return request.method == 'GET'

    def has_object_permission(self, request, view, obj):
        is_live = CompetitionPost.objects.filter(
            competition=obj, live=True
        ).exists()
        return is_live


@hooks.register('register_permissions')
def register_my_custom_permissions():
    content_type = ContentType.objects.get_for_model(Competition)
    Permission.objects.get_or_create(
        codename='edit_detail',
        name='Edit detail',
        content_type=content_type,
    )

    Permission.objects.get_or_create(
        codename='edit_participants',
        name='Edit participants',
        content_type=content_type,
    )

    Permission.objects.get_or_create(
        codename='edit_rounds',
        name='Edit rounds',
        content_type=content_type,
    )

    Permission.objects.get_or_create(
        codename='edit_integrals',
        name='Edit integrals',
        content_type=content_type,
    )

    return Permission.objects.filter(content_type=content_type)

