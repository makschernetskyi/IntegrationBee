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
    list_display = ('id', 'name', 'max_participants', 'download_pdf')
    search_fields = ('name', 'name', 'max_participants')

    def download_pdf(self, obj):
        return f'<a href="/api/v2/contestReport/{obj.id}/download">Download PDF</a>'
    download_pdf.allow_tags = True
    download_pdf.short_description = "Contest summary"


modeladmin_register(CompetitionAdmin)
