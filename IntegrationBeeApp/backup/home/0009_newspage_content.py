# Generated by Django 5.0 on 2024-02-25 12:30

import wagtail.blocks
import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_delete_indexpage'),
    ]

    operations = [
        migrations.AddField(
            model_name='newspage',
            name='content',
            field=wagtail.fields.StreamField([('news', wagtail.blocks.StructBlock([('news', wagtail.blocks.ListBlock(wagtail.blocks.StructBlock([('header', wagtail.blocks.CharBlock(help_text='add header', required=True)), ('text', wagtail.blocks.TextBlock(help_text='add text', required=True)), ('picture', wagtail.blocks.TextBlock(help_text='add image', required=False))])))]))], blank=True, null=True, use_json_field=True),
        ),
    ]