# Generated by Django 5.1.2 on 2024-10-31 17:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0032_alter_competitionpost_competition'),
        ('wagtailimages', '0026_delete_uploadedimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competitionpost',
            name='picture',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='competition_page', to='wagtailimages.image', verbose_name='competition'),
        ),
    ]