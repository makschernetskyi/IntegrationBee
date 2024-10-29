
from django.db import models
from django.shortcuts import redirect

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.fields import StreamField
from wagtail.api import APIField
from wagtail.search import index
from wagtailgeowidget.panels import LeafletPanel

from api.blocks import CompetitionPostSectionBlock
from api.serializers import CompetitionSerializer, LocationSerializer
from . import blocks

from api import models as api_models


class HomePage(Page):
    """Home Page Model"""

    template = "home/home.html"
    max_count = 1

    competition = models.ForeignKey(
        api_models.Competition,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='+',
        verbose_name='competition',
    )

    youtube_video_link = models.CharField(max_length=150, blank=True, null=True)

    sponsors = StreamField(
        [
            ("sponsor", blocks.SponsorBlock()),
        ],
        use_json_field=True,
        null=True,
        blank=True
    )

    steps_to_participate = StreamField(
        [
            ("step_to_participate", blocks.StepToParticipateBlock()),
        ],
        use_json_field=True,
        null=True,
        blank=True
    )

    social_media_links = StreamField(
        [
            ("social_media_link", blocks.SocialMediaLinkBlock())
        ],
        use_json_field=True,
        null=True,
        blank=True
    )

    why_participate = StreamField(
        [
            ("reason", blocks.ReasonBlock()),
        ],
        use_json_field=True,
        null=True,
        blank=True
    )

    slogan = RichTextField(features=["italic"], null=False)
    what_is_it_content = models.CharField(max_length=500, blank=False, null=True)

    title_background_image = models.ForeignKey(
        'wagtailimages.Image',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='+',
        verbose_name="Title Background Image"
    )

    content_panels = Page.content_panels + [
        FieldPanel("youtube_video_link"),
        FieldPanel("sponsors"),
        FieldPanel("competition"),
        FieldPanel("steps_to_participate"),
        FieldPanel("why_participate"),
        FieldPanel("slogan"),
        FieldPanel("what_is_it_content"),
        FieldPanel("title_background_image"),
        FieldPanel("social_media_links"),
    ]

    api_fields = [
        APIField("sponsors"),
        APIField("youtube_video_link"),
        APIField("competition"),
        APIField("steps_to_participate"),
        APIField("why_participate"),
        APIField("slogan"),
        APIField("what_is_it_content"),
        APIField("title_background_image"),
        APIField("social_media_links"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('slogan', partial_match=True),
        index.SearchField('what_is_it_content', partial_match=True),
        index.SearchField('why_participate', partial_match=True),
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

    text = RichTextField(features=["bold", "link", "italic"], null=True)
    picture = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+"
    )

    content_panels = Page.content_panels + [
        FieldPanel("text"),
        FieldPanel("picture"),
    ]

    api_fields = [
        APIField("title"),
        APIField("text"),
        APIField("picture"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('title', partial_match=True),
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

    edition = models.CharField(max_length=100, blank=False, null=False)
    short_description = RichTextField(features=["bold", "link"], null=True)
    description = RichTextField(features=["bold", "link"], null=True)
    place = models.CharField(max_length=100, blank=False, null=False)
    rules = RichTextField(features=["bold", "link", "italic", "ol", "ul"], null=True)
    location = models.CharField(max_length=250, blank=True, null=True)

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

    sections = StreamField(
        [
            ("section", CompetitionPostSectionBlock())
        ],
        use_json_field=True,
        null=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel("edition"),
        FieldPanel("short_description"),
        FieldPanel("description"),
        FieldPanel("sections"),
        FieldPanel("place"),
        LeafletPanel('location'),
        FieldPanel("picture"),
        FieldPanel("competition"),
        FieldPanel("rules"),
    ]

    api_fields = [
        APIField("title"),
        APIField("edition"),
        APIField("description"),
        APIField("sections"),
        APIField("place"),
        APIField("latitude"),
        APIField("longitude"),
        APIField("picture"),
        APIField("competition", serializer=CompetitionSerializer(competition)),
        APIField("rules"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('title', partial_match=True),
        index.SearchField('edition', partial_match=True),
        index.SearchField('short_description', partial_match=True),
        index.SearchField('description', partial_match=True),
        index.SearchField('place', partial_match=True),
        index.SearchField('rules', partial_match=True),
    ]

    @property
    def latitude(self):
        try:
            print(type(self.location))
            return float(self.location.split(" ")[0].split("(")[1])
        except (AttributeError, IndexError):
            return None

    @property
    def longitude(self):
        try:
            return float(self.location.split(" ")[1].split(")")[0])
        except (AttributeError, IndexError):
            return None

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
        APIField("title"),
        APIField("about_us"),
        APIField("contacts"),
        APIField("socials"),
        APIField("our_team")
    ]

    search_fields = Page.search_fields + [
        index.SearchField('title', partial_match=True),
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


class PrivacyPolicyPage(Page):

    privacy_policy = RichTextField(features=["bold", "link", "italic", "ol", "ul"], null=True)

    content_panels = Page.content_panels + [
        FieldPanel("privacy_policy"),
    ]

    api_fields = [
        APIField("privacy_policy"),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('privacy_policy', partial_match=True),
    ]

    def serve(self, request, *args, **kwargs):
        return redirect('/')
