# Generated by Django 5.1.2 on 2024-10-31 17:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_remove_user_additional_info_and_more'),
        ('home', '0030_competitionpost_sponsors'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competitionpost',
            name='competition',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='api.competition', verbose_name='competition'),
        ),
    ]