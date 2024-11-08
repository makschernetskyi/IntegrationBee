from django import forms
from django.forms import ModelForm
from django.utils.translation import gettext_lazy as _
from wagtail.admin.forms import WagtailAdminModelForm

from wagtail.users.forms import UserEditForm, UserCreationForm

from api.models import User, Competition


class CustomUserEditForm(UserEditForm):

    class Meta(UserEditForm.Meta):
        model = User
        fields = (
            'email', 'first_name', 'last_name', 'institution', 'phone_number',
            'program_of_study', 'is_verified', 'is_active', 'is_staff', 'is_superuser',
            'groups', 'username',
        )


class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = User
        fields = (
            'email', 'first_name', 'last_name', 'institution', 'phone_number',
            'program_of_study', 'is_verified', 'is_active', 'is_staff', 'is_superuser',
            'groups', 'username',
        )


class CustomYourModelForm(WagtailAdminModelForm):

    class Meta:
        model = Competition
        fields = ['name']

    def clean_field_name(self):
        data = self.cleaned_data.get('field_name')
        return data

