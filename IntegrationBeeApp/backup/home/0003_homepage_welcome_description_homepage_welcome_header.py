# Generated by Django 5.0 on 2024-02-17 17:29

import wagtail.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_create_homepage'),
    ]

    operations = [
        migrations.AddField(
            model_name='homepage',
            name='welcome_Description',
            field=wagtail.fields.RichTextField(null=True),
        ),
        migrations.AddField(
            model_name='homepage',
            name='welcome_Header',
            field=models.CharField(max_length=50, null=True),
        ),
    ]