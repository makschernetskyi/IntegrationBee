# Generated by Django 5.1.2 on 2024-10-31 01:03

import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0026_remove_contactspage_contacts_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competitionpost',
            name='sections',
            field=wagtail.fields.StreamField([('section', 2)], blank=True, block_lookup={0: ('wagtail.blocks.CharBlock', (), {'help_text': 'Title of the section', 'max_length': 50, 'required': False}), 1: ('wagtail.blocks.RichTextBlock', (), {'features': ['bold', 'italic', 'link'], 'help_text': 'Text of the section', 'required': False}), 2: ('wagtail.blocks.StructBlock', [[('title', 0), ('body', 1)]], {})}, null=True),
        ),
        migrations.AlterField(
            model_name='contactspage',
            name='our_team',
            field=wagtail.fields.StreamField([('team_member', 5)], blank=True, block_lookup={0: ('wagtail.blocks.CharBlock', (), {'help_text': 'add name', 'max_length': 25, 'required': True}), 1: ('wagtail.blocks.CharBlock', (), {'help_text': 'add role', 'max_length': 25, 'required': True}), 2: ('wagtail.blocks.CharBlock', (), {'help_text': 'add phone', 'max_length': 25, 'required': False}), 3: ('wagtail.blocks.CharBlock', (), {'help_text': 'add email', 'max_length': 100, 'required': False}), 4: ('wagtail.images.blocks.ImageChooserBlock', (), {}), 5: ('wagtail.blocks.StructBlock', [[('name', 0), ('role', 1), ('phone', 2), ('email', 3), ('picture', 4)]], {})}, null=True),
        ),
    ]