# Generated by Django 5.0 on 2024-10-17 11:23

import wagtail.blocks
import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_remove_homepage_main_sponsor_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contactspage',
            name='our_team',
            field=wagtail.fields.StreamField([('team_member', wagtail.blocks.StructBlock([('name', wagtail.blocks.CharBlock(help_text='add name', required=True)), ('role', wagtail.blocks.CharBlock(help_text='add role', required=True)), ('contacts', wagtail.blocks.TextBlock(help_text='add contacts', required=True))]))], blank=True, null=True, use_json_field=True),
        ),
    ]
