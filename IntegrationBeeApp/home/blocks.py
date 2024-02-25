

from wagtail import blocks


class HomeBulletPointBlock(blocks.StructBlock):
    """header and text"""

    header = blocks.CharBlock(required=True, help_text="add header")
    text = blocks.TextBlock(required=True, help_text="add text")

    class Meta:
        label = "Bullet Point"

class NewsBlock(blocks.StructBlock):
    """header and text"""

    header =  blocks.CharBlock(required=True, help_text="add header")
    text = blocks.TextBlock(required=True, help_text="add text")
    picture = blocks.TextBlock(required=False, help_text="add image")


    class Meta:
        label = "News"