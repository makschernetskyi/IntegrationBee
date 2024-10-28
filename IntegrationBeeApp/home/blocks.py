from random import randint

from PIL.ImagePalette import random
from wagtail import blocks
from wagtail.api import APIField
from wagtail.images.blocks import ImageChooserBlock
from wagtailmath.blocks import MathBlock


class HomeBulletPointBlock(blocks.StructBlock):
    """header and text"""

    header = blocks.CharBlock(required=True, help_text="add header")
    text = blocks.TextBlock(required=True, help_text="add text")

    class Meta:
        label = "Bullet Point"


class HomeAcknowledgementBlock(blocks.StructBlock):
    """header and text"""

    name = blocks.CharBlock(required=True, help_text="add name")

    class Meta:
        label = "name"


class TeamMemberBlock(blocks.StructBlock):
    """name role contacts and picture"""

    name = blocks.CharBlock(required=True, help_text="add name")
    role = blocks.CharBlock(required=True, help_text="add role")
    contacts = blocks.TextBlock(required=True, help_text="add contacts")
    picture = ImageChooserBlock()

    class Meta:
        label = "team_member"


class SponsorBlock(blocks.StructBlock):
    sponsor_name = blocks.CharBlock(required=True, max_length=100)
    sponsor_logo = ImageChooserBlock(required=True)
    sponsor_tier = blocks.ChoiceBlock(
        choices=[
            ('gold', 'Gold'),
            ('silver', 'Silver'),
            ('bronze', 'Bronze'),
            ('partner', 'Partner'),
            ('supporter', 'Supporter')
        ],
        default='supporter',
        required=True
    )
    sponsor_description = blocks.RichTextBlock(required=False, features=["bold", "link"])

    class Meta:
        icon = "user"
        label = "Sponsor"


class StepToParticipateBlock(blocks.StructBlock):
    step_number = blocks.IntegerBlock(required=True, max_value=3, min_value=1)
    step_title = blocks.CharBlock(required=True, max_length=100)
    step_description = blocks.CharBlock(required=True, max_length=500)

    class Meta:
        icon = "list-ol"
        label = "Step to participate"


class SocialMediaLinkBlock(blocks.StructBlock):
    social_media_name = blocks.CharBlock(required=True, max_length=100)
    social_media_link = blocks.URLBlock(required=True,  max_length=100)

    class Meta:
        icon = "link"
        label = "Social Media Link"