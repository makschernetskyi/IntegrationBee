import logging

from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import BasePermission, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from wagtail import hooks

from home.models import CompetitionPost
from .models import User, Competition, UserToCompetitionRelationship
from rest_framework.authentication import TokenAuthentication
from wagtail.admin.models import Admin


class IsWagtailAdminUser(IsAdminUser):
    def has_permission(self, request, view):
        user = request.user
        if user.is_authenticated:
            return user.is_superuser or user.is_staff
        return False


@hooks.register('register_permissions')
def register_competition_permissions():
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


@hooks.register('register_permissions')
def register_submission_permissions():
    content_type = ContentType.objects.get_for_model(UserToCompetitionRelationship)
    Permission.objects.get_or_create(
        codename='edit_submission',
        name='Edit submission',
        content_type=content_type,
    )

    return Permission.objects.filter(content_type=content_type)

