from django.utils.functional import cached_property
from wagtail.admin.panels import FieldPanel, Panel
from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register
from api.models import Competition


class CompetitionAdmin(ModelAdmin):
    model = Competition
    menu_label = 'Competitions'
    menu_order = 200
    menu_icon = 'calendar'
    add_to_settings_menu = False
    exclude_from_explorer = False
    list_display = ('id', 'name', 'max_participants', 'gen_brackets', 'download_report')
    search_fields = ('name', 'name', 'max_participants')

    def gen_brackets(self, obj):
        return f'<a href="/api/v2/contestBracket/{obj.id}/generate">Generate Brackets</a>'

    gen_brackets.allow_tags = True
    gen_brackets.short_description = "Generate Brackets"

    def download_report(self, obj):
        return f'<a href="/api/v2/contestReport/{obj.id}/download_pdf">Download PDF</a><br>' \
               f'<a href = "/api/v2/contestReport/{obj.id}/download_tex" > Download TEX </a>'

    download_report.allow_tags = True
    download_report.short_description = "Contest summary"


modeladmin_register(CompetitionAdmin)
