import re
import urllib
from io import StringIO
import requests
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db import models
from django.http import HttpResponse
from django.shortcuts import redirect
from wagtail.contrib.routable_page.models import RoutablePageMixin

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.fields import StreamField
from wagtail.api import APIField
from wagtail.search import index

from . import blocks

from api import models as api_models
from .blocks import SponsorBlock


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

    project_description = RichTextField(features=["bold", "link"], null=True)

    youtube_video_link = models.CharField(max_length=150, blank=True, null=True)

    sponsors = StreamField(
        [
            ("sponsor", SponsorBlock()),
        ],
        use_json_field=True,
        null=True,
        blank=True
    )

    acknowledgements = StreamField(
        [
            ("thanks_to", blocks.HomeAcknowledgementBlock())
        ],
        use_json_field=True,
        null=True,
        blank=True
    )

    content_panels = Page.content_panels + [
        FieldPanel("title_section_header"),
        FieldPanel("title_section_description"),
        FieldPanel("bullet_points_section_header"),
        FieldPanel("bullet_points"),
        FieldPanel("homepage_picture"),
        FieldPanel("sponsors"),
        FieldPanel("acknowledgements"),
        FieldPanel("project_description"),
        FieldPanel("youtube_video_link")
    ]

    api_fields = [
        APIField("title_section_header"),
        APIField("title_section_description"),
        APIField("bullet_points_section_header"),
        APIField("bullet_points"),
        APIField("homepage_picture"),
        APIField("sponsors"),
        APIField("acknowledgements"),
        APIField("project_description"),
        APIField("youtube_video_link"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('title_section_header', partial_match=True),
        index.SearchField('title_section_description', partial_match=True),
        index.SearchField('bullet_points_section_header', partial_match=True),
        index.SearchField('project_description', partial_match=True),
        index.SearchField('youtube_video_link', partial_match=True),
    ]

    subpage_types = ["home.NewsPage", "home.CompetitionsPage", "home.ContactsPage"]


class NewsPage(Page):

    api_fields = [
        APIField("title"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('title', partial_match=True),
    ]

    subpage_types = ["home.NewsPost"]

    def serve(self, request, *args, **kwargs):
        return redirect('/')


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

    search_fields = Page.search_fields + [
        index.SearchField('header', partial_match=True),
        index.SearchField('text', partial_match=True),
    ]

    def serve(self, request, *args, **kwargs):
        return redirect('/')


class CompetitionsPage(Page):

    api_fields = [
        APIField("title"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('title', partial_match=True),
    ]

    subpage_types = ["home.CompetitionPost"]

    def serve(self, request, *args, **kwargs):
        return redirect('/')


class CompetitionPost(Page):

    header = models.CharField(max_length=100, blank=False, null=False)
    short_description = RichTextField(features=["bold", "link"], null=True)
    description = RichTextField(features=["bold", "link"], null=True)
    event_date = models.DateTimeField(blank=True, null=True)
    place = models.CharField(max_length=100, blank=False, null=False)
    place_maps_url = models.CharField(max_length=100, blank=True, null=True)
    rules = RichTextField(features=["bold", "link", "italic", "ol", "ul"], null=True)

    competition = models.ForeignKey(
        api_models.Competition,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='+',
        verbose_name='competition'
    )

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
        FieldPanel("competition"),
        FieldPanel("rules"),
    ]

    api_fields = [
        APIField("header"),
        APIField("short_description"),
        APIField("description"),
        APIField("event_date"),
        APIField("place"),
        APIField("place_maps_url"),
        APIField("picture"),
        APIField("competition"),
        APIField("rules"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('header', partial_match=True),
        index.SearchField('short_description', partial_match=True),
        index.SearchField('description', partial_match=True),
        index.SearchField('event_date'),
        index.SearchField('place', partial_match=True),
        index.SearchField('rules', partial_match=True),
    ]

    def serve(self, request, *args, **kwargs):
        return redirect('/')


class ContactsPage(Page):

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

    search_fields = Page.search_fields + [
        index.SearchField('about_us', partial_match=True),
        index.SearchField('contacts', partial_match=True),
        index.SearchField('socials', partial_match=True),
    ]

    def serve(self, request, *args, **kwargs):
        return redirect('/')


class ImprintPage(Page):

    imprint = RichTextField(features=["bold", "link", "italic", "ol", "ul"], null=True)

    content_panels = Page.content_panels + [
        FieldPanel("imprint"),
    ]

    api_fields = [
        APIField("imprint"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('imprint', partial_match=True),
    ]

    def serve(self, request, *args, **kwargs):
        return redirect('/')


class TermsOfUsePage(Page):

    terms_of_use = RichTextField(features=["bold", "link", "italic", "ol", "ul"], null=True)

    content_panels = Page.content_panels + [
        FieldPanel("terms_of_use"),
    ]

    api_fields = [
        APIField("terms_of_use"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('terms_of_use', partial_match=True),
    ]

    def serve(self, request, *args, **kwargs):
        return redirect('/')
