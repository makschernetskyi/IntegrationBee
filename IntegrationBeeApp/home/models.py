from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.fields import StreamField

from . import blocks


class HomePage(Page):
    """Home Page Model"""

    template = "home/home.html"
    max_count = 1

    title_section_header = models.CharField(max_length=50, blank=False, null=True)
    title_section_description = RichTextField(features=["bold", "link"], null=True)

    bullet_points_section_header = models.CharField(max_length=50, blank=False, null=True)

    bullet_points = StreamField(
        [
            ("home_bullet_point", blocks.HomeBulletPointBlock())
        ],
        use_json_field=True,
        null=True,
        blank=True
    )


    content_panels = Page.content_panels + [
        FieldPanel("title_section_header"),
        FieldPanel("title_section_description"),
        FieldPanel("bullet_points_section_header"),
        FieldPanel("bullet_points")
    ]


class NewsPage(Page):
    """News Page Model"""

    template = "home/home.html"

    page_title = models.CharField(max_length=50, blank=False, null=True)


    content_panels = Page.content_panels + [
        FieldPanel("page_title")
    ]

