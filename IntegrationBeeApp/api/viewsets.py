from wagtail.users.views.users import UserViewSet as WagtailUserViewSet
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from wagtail.users.views.users import UserViewSet as WagtailUserViewSet
from api.models import Competition
from .forms import CustomUserCreationForm, CustomUserEditForm
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


register_snippet(CompetitionSnippetViewSet)

