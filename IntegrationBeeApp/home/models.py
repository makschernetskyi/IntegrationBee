from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.fields import StreamField
from wagtail.api import APIField

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

    homepage_picture = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+"
    )


    content_panels = Page.content_panels + [
        FieldPanel("title_section_header"),
        FieldPanel("title_section_description"),
        FieldPanel("bullet_points_section_header"),
        FieldPanel("bullet_points"),
        FieldPanel("homepage_picture"),
    ]

    api_fields = [
        APIField("title_section_header"),
        APIField("title_section_description"),
        APIField("bullet_points_section_header"),
        APIField("bullet_points"),
        APIField("homepage_picture"),
    ]

    subpage_types = ["home.NewsPage", "home.CompetitionsPage", "home.ContactsPage"]







class NewsPage(Page):
    """News Page Model"""

    template = "home/home.html"

    page_title = models.CharField(max_length=50, blank=False, null=True)

    content = StreamField(
        [
            ("news", blocks.NewsBlock())
        ],
        null=True,
        blank=True,
        use_json_field=True
    )


    content_panels = Page.content_panels + [
        FieldPanel("page_title"),
        FieldPanel("content"),
    ]

    api_fields = [
        APIField("page_title"),
        APIField("content")
    ]

    subpage_types = ["home.NewsPost"]

    def get_url_parts(self, request=None):
        return self.get_parent().get_url_parts()




class NewsPost(Page):


    header = models.CharField(max_length=100, blank=False, null=False)
    text = RichTextField(features=["bold", "link", "italic"], null=True)
    picture = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+"
    )

    content_panels = Page.content_panels + [
        FieldPanel("header"),
        FieldPanel("text"),
        FieldPanel("picture"),
    ]

    api_fields = [
        APIField("header"),
        APIField("text"),
        APIField("picture"),
    ]

    def get_url_parts(self, request=None):
        return self.get_parent().get_url_parts()


class CompetitionsPage(Page):

    header = models.CharField(max_length=50, null=False, blank=False)

    content_panels = Page.content_panels + [
        FieldPanel("header"),
    ]

    api_fields = [
        APIField("header"),
    ]

    subpage_types = ["home.Competition"]

    def get_url_parts(self, request=None):
        return self.get_parent().get_url_parts()


class Competition(Page):


    header = models.CharField(max_length=100, blank=False, null=False)
    short_description = RichTextField(features=["bold", "link"], null=True)
    description = RichTextField(features=["bold", "link"], null=True)
    event_date = models.DateTimeField(blank=True, null=True)
    place = models.CharField(max_length=100, blank=False, null=False)
    place_maps_url = models.CharField(max_length=100, blank=True, null=True)

    related_competition_id = models.IntegerField(blank=True, null=True)

    picture = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+"
    )

    content_panels = Page.content_panels + [
        FieldPanel("header"),
        FieldPanel("short_description"),
        FieldPanel("description"),
        FieldPanel("event_date"),
        FieldPanel("place"),
        FieldPanel("place_maps_url"),
        FieldPanel("picture"),
        FieldPanel("related_competition_id"),
    ]

    api_fields = [
        APIField("header"),
        APIField("header"),
        APIField("short_description"),
        APIField("description"),
        APIField("event_date"),
        APIField("place"),
        APIField("place_maps_url"),
        APIField("picture"),
        APIField("related_competition_id"),
    ]

    def get_url_parts(self, request=None):
        return None, None, None, None


class ContactsPage(Page):
    """Contacts Page Model"""

    # template = "home/home.html"

    about_us = models.TextField(blank=False, null=True)
    contacts = models.TextField(blank=False, null=True)
    socials = models.TextField (blank=True, null=True)


    our_team = StreamField(
        [
            ("team_member", blocks.TeamMemberBlock())
        ],
        null=True,
        blank=True,
        use_json_field=True
    )


    content_panels = Page.content_panels + [
        FieldPanel("about_us"),
        FieldPanel("contacts"),
        FieldPanel("socials"),
        FieldPanel("our_team")
    ]

    api_fields = [
        APIField("about_us"),
        APIField("contacts"),
        APIField("socials"),
        APIField("our_team")
    ]

    def get_url_parts(self, request=None):
        return None, None, None, None
