from django.db.models import Manager
from django.http import HttpResponseForbidden
from wagtail.admin.filters import WagtailFilterSet
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from wagtail.users.views.users import UserViewSet as WagtailUserViewSet

from api.models import Competition, UserToCompetitionRelationship
from .forms import CustomUserCreationForm, CustomUserEditForm
from .views import CustomRevisionsCompareView


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

    revisions_compare_view_class = CustomRevisionsCompareView

    @property
    def revisions_revert_view_class(self):
        revert_class = super().revisions_revert_view_class

        class CustomRevisionsRevertView(revert_class):
            def post(self, request, *args, **kwargs):
                if not request.user.is_superuser:
                    return HttpResponseForbidden()

                return super().post(request, *args, **kwargs)

            def get(self, request, *args, **kwargs):
                return super().get(request, *args, **kwargs)

        return CustomRevisionsRevertView

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
                    cleaned_data |= {'event_date_start': self.cleaned_data['event_date_end']}
                    cleaned_data |= {'event_date_end': self.cleaned_data['event_date_end']}
                    cleaned_data |= {'max_participants': self.cleaned_data['max_participants']}

                if self.for_user.has_perm('api.edit_rounds'):
                    formsets |= {'rounds': self.formsets['rounds']}

                if self.for_user.has_perm('api.edit_participants'):
                    cleaned_data |= {'participants_filter': self.cleaned_data['participants_filter']}
                    formsets |= {'participants_relationships': self.formsets['participants_relationships']}

                self.cleaned_data = cleaned_data
                self.formsets = formsets

                return super().clean()

        return CustomCompetitionForm


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
