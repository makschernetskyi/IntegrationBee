# Generated by Django 5.0 on 2024-10-28 19:29

import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0018_alter_homepage_sponsors'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homepage',
            name='slogan',
            field=wagtail.fields.RichTextField(null=True),
        ),
    ]