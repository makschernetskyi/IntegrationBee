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


# class CompetitionForm(WagtailAdminModelForm):
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#
#         user = self.for_user  # You'll need to pass the request to the form
#
#         # List of fields to exclude
#         exclude_fields = []
#
#         # Check permissions and add fields to exclude list
#         if not user.has_perm('api.edit_integrals'):
#             exclude_fields.append('series')
#
#         if not user.has_perm('api.edit_rounds'):
#             exclude_fields.append('rounds')
#
#         if not user.has_perm('api.edit_participants'):
#             exclude_fields.append('participants_relationships')
#
#         if not user.has_perm('api.edit_detail'):
#             exclude_fields.extend(['name', 'event_date', 'max_participants'])
#
#         # Exclude fields from the form
#         for field_name in exclude_fields:
#             if field_name in self.fields:
#                 del self.fields[field_name]


class CustomYourModelForm(WagtailAdminModelForm):
    # Customize fields or add custom validation here
    class Meta:
        model = Competition
        fields = ['name']  # or specify a list of fields if needed

    def clean_field_name(self):
        # Example of custom validation for a field
        data = self.cleaned_data.get('field_name')
        print(data)
        return data

