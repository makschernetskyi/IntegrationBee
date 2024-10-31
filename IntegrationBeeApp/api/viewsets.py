from pprint import pprint

from wagtail.users.views.users import UserViewSet as WagtailUserViewSet
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from wagtail.users.views.users import UserViewSet as WagtailUserViewSet
from api.models import Competition
from .forms import CustomUserCreationForm, CustomUserEditForm, CustomYourModelForm
from .forms import CustomUserCreationForm, CustomUserEditForm


class UserViewSet(WagtailUserViewSet):
    create_template_name = "user_create.html"
    edit_template_name = "user_edit.html"

    def get_form_class(self, for_update=False):
        if for_update:
            return CustomUserEditForm
        return CustomUserCreationForm


class CompetitionSnippetViewSet(SnippetViewSet):
    model = Competition
    icon = 'calendar'
    add_to_settings_menu = False
    add_to_admin_menu = True
    menu_order = 300
    list_display = ('id', 'name', 'max_participants', 'gen_brackets', 'download_report')
    search_fields = ('name', 'name', 'max_participants')

    def get_form_class(self, for_update=False):
        form_class = super().get_form_class(for_update)

        class CustomCompetitionForm(form_class):

            def clean(self):

                if self.for_user.is_superuser:
                    return super().clean()

                cleaned_data = {}
                formsets = {}

                if self.for_user.has_perm('api.edit_integrals'):
                    cleaned_data |= {'series': self.cleaned_data['series']}

                if self.for_user.has_perm('api.edit_detail'):
                    cleaned_data |= {'name': self.cleaned_data['name']}
                    cleaned_data |= {'event_date': self.cleaned_data['event_date']}
                    cleaned_data |= {'max_participants': self.cleaned_data['max_participants']}

                if self.for_user.has_perm('api.edit_rounds'):
                    formsets |= {'rounds': self.formsets['rounds']}

                if self.for_user.has_perm('api.edit_participants'):
                    formsets |= {'participants_relationships': self.formsets['participants_relationships']}
                
                self.cleaned_data = cleaned_data
                self.formsets = formsets
                
                return super().clean()

        return CustomCompetitionForm


register_snippet(CompetitionSnippetViewSet)
