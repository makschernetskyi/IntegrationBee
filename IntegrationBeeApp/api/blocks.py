from random import randint

from PIL.ImagePalette import random
from wagtail import blocks
from wagtail.api import APIField
from wagtail.images.blocks import ImageChooserBlock
from wagtailmath.blocks import MathBlock


class IntegralBlock(blocks.StructBlock):
    integral = MathBlock(required=True)
    integral_solution = MathBlock(required=False)
    difficulty_level = blocks.IntegerBlock(min_value=1, max_value=10, help_text="Difficulty level (1-10)", default=5)

    class Meta:
        icon = "code"
        label = "Integral"


class SeriesChoiceBlock(blocks.ChoiceBlock):
    SERIES_CHOICES = [
        ('finals', 'Finals'),
        ('semifinals', 'Semifinals'),
        ('quarterfinals', 'Quarterfinals'),
        ('eighth-finals', 'Eighth-finals'),
        ('16th-finals', '16th-finals'),
        ('32nd-finals', '32nd-finals'),
        ('64th-finals', '64th-finals'),
        ('preliminary', 'Preliminary'),
        ('practice', 'Practice'),
        ('spare', 'Spare'),
        ('other', 'Other')
    ]

    def __init__(self, **kwargs):
        kwargs['choices'] = self.SERIES_CHOICES
        super().__init__(**kwargs)


class SeriesBlock(blocks.StructBlock):
    series_name = SeriesChoiceBlock(required=True, help_text="Select the series")
    integrals = blocks.StreamBlock([
        ('integral', IntegralBlock()),
    ], required=True, help_text="Integrals belonging to this series")

    class Meta:
        icon = "list-ul"
        label = "Series"


class CompetitionPostSectionBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True, help_text="Title of the section", max_length=50)
    body = blocks.RichTextBlock(required=True, help_text="Text of the section", features=["bold", "italic", "link"])

    class Meta:
        icon = "list-ul"
        label = "Section"
