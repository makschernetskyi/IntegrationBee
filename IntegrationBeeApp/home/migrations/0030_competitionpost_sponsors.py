# Generated by Django 5.1.2 on 2024-10-31 15:47

import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0029_alter_contactspage_inquiry_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='competitionpost',
            name='sponsors',
            field=wagtail.fields.StreamField([('sponsor', 5)], blank=True, block_lookup={0: ('wagtail.blocks.CharBlock', (), {'max_length': 100, 'required': True}), 1: ('wagtail.images.blocks.ImageChooserBlock', (), {'required': True}), 2: ('wagtail.blocks.CharBlock', (), {'max_length': 3, 'required': True}), 3: ('wagtail.blocks.ChoiceBlock', [], {'choices': [('main', 'Main'), ('gold', 'Gold'), ('silver', 'Silver'), ('bronze', 'Bronze'), ('partner', 'Partner'), ('supporter', 'Supporter')]}), 4: ('wagtail.blocks.RichTextBlock', (), {'features': ['bold', 'link'], 'required': False}), 5: ('wagtail.blocks.StructBlock', [[('sponsor_name', 0), ('sponsor_logo', 1), ('sponsor_logo_size', 2), ('sponsor_tier', 3), ('sponsor_description', 4)]], {})}, null=True),
        ),
    ]