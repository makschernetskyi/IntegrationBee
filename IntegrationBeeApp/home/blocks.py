

from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock


class HomeBulletPointBlock(blocks.StructBlock):
    """header and text"""

    header = blocks.CharBlock(required=True, help_text="add header")
    text = blocks.TextBlock(required=True, help_text="add text")

    class Meta:
        label = "Bullet Point"


class NewsBlock(blocks.StructBlock):
    """header and text"""

    header = blocks.CharBlock(required=True, help_text="add header")
    text = blocks.TextBlock(required=True, help_text="add text")
    picture = blocks.TextBlock(required=False, help_text="add image")


    class Meta:
        label = "News"


class TeamMemberBlock(blocks.StructBlock):
    """name role contacts and picture"""

    name = blocks.CharBlock(required=True, help_text="add name")
    role = blocks.CharBlock(required=True, help_text="add role")
    contacts = blocks.TextBlock(required=True, help_text="add contacts")
    picture = ImageChooserBlock()


    class Meta:
        label = "team_member"
