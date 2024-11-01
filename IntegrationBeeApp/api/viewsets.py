from pprint import pprint

from django.db.models import Manager
from django.forms.utils import ErrorList
from wagtail.admin.filters import WagtailFilterSet
from wagtail.admin.panels import TabbedInterface, FieldPanel, ObjectList
from wagtail.users.views.users import UserViewSet as WagtailUserViewSet
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from wagtail.users.views.users import UserViewSet as WagtailUserViewSet
from api.models import Competition, UserToCompetitionRelationship
from .forms import CustomUserCreationForm, CustomUserEditForm, CustomYourModelForm
from .forms import CustomUserCreationForm, CustomUserEditForm


class UserViewSet(WagtailUserViewSet):
    create_template_name = "user_create.html"
    edit_template_name = "user_edit.html"

    def get_form_class(self, for_update=False):
        if for_update:
            return CustomUserEditForm
        return CustomUserCreationForm


class CompetitionManager(Manager):
    def visible_in_admin(self):
        return self.filter(show_in_admin='ALL')  # Adjust as needed


class CompetitionSnippetViewSet(SnippetViewSet):
    model = Competition
    icon = 'calendar'
    menu_label = 'Competitions'
    add_to_settings_menu = False
    add_to_admin_menu = True
    menu_order = 300
    list_display = ('id', 'name', 'max_participants', 'gen_brackets', 'download_report')
    search_fields = ('name', 'name', 'max_participants')


class UserToCompetitionRelationshipFilterSet(WagtailFilterSet):
    class Meta:
        model = UserToCompetitionRelationship
        fields = ['competition', 'user', 'status']


class UserToCompetitionRelationshipSnippetViewSet(SnippetViewSet):
    model = UserToCompetitionRelationship
    icon = 'tasks'
    menu_label = 'Submissions'
    menu_name = 'Submissions'
    name = 'Submissions'
    add_to_settings_menu = False
    add_to_admin_menu = True
    menu_order = 301
    list_display = ('id', 'competition', 'user', 'status')
    filterset_class = UserToCompetitionRelationshipFilterSet


register_snippet(CompetitionSnippetViewSet)
register_snippet(UserToCompetitionRelationshipSnippetViewSet)
