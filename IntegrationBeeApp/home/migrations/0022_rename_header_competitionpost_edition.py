# Generated by Django 5.0 on 2024-10-29 21:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0021_remove_competitionpost_event_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='competitionpost',
            old_name='header',
            new_name='edition',
        ),
    ]