# Generated by Django 5.1.2 on 2024-10-30 23:47

import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_competition_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competition',
            name='series',
            field=wagtail.fields.StreamField([('series', 6)], blank=True, block_lookup={0: ('wagtail.blocks.ChoiceBlock', [], {'choices': [('finals', 'Finals'), ('semifinals', 'Semifinals'), ('quarterfinals', 'Quarterfinals'), ('eighth-finals', 'Eighth-finals'), ('16th-finals', '16th-finals'), ('32nd-finals', '32nd-finals'), ('64th-finals', '64th-finals'), ('preliminary', 'Preliminary'), ('practice', 'Practice'), ('spare', 'Spare'), ('other', 'Other')], 'help_text': 'Select the series', 'required': False}), 1: ('wagtailmath.blocks.MathBlock', (), {'required': True}), 2: ('wagtailmath.blocks.MathBlock', (), {'required': False}), 3: ('wagtail.blocks.IntegerBlock', (), {'default': 5, 'help_text': 'Difficulty level (1-10)', 'max_value': 10, 'min_value': 1}), 4: ('wagtail.blocks.StructBlock', [[('integral', 1), ('integral_solution', 2), ('difficulty_level', 3)]], {}), 5: ('wagtail.blocks.StreamBlock', [[('integral', 4)]], {'help_text': 'Integrals belonging to this series', 'required': False}), 6: ('wagtail.blocks.StructBlock', [[('series_name', 0), ('integrals', 5)]], {})}, null=True),
        ),
    ]