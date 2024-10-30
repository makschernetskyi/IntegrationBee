from django import forms
from django.utils.translation import gettext_lazy as _

from wagtail.users.forms import UserEditForm, UserCreationForm

from api.models import User


class CustomUserEditForm(UserEditForm):

    class Meta(UserEditForm.Meta):
        model = User
        fields = (
            'email', 'first_name', 'last_name', 'institution', 'phone_number',
            'emergency_phone_number', 'program_of_study', 'date_of_birth',
            'name_pronunciation', 'additional_info', 'is_verified',
            'is_active', 'is_staff', 'is_superuser', 'groups', 'username',
        )


class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = User
        fields = (
            'email', 'first_name', 'last_name', 'institution', 'phone_number',
            'emergency_phone_number', 'program_of_study', 'date_of_birth',
            'name_pronunciation', 'additional_info', 'is_verified',
            'is_active', 'is_staff', 'is_superuser', 'groups', 'username',
        )

