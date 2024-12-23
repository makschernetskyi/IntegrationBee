# Generated by Django 5.0 on 2024-10-16 21:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='competitionpost',
            name='related_competition_id',
        ),
        migrations.RemoveField(
            model_name='competitionpost',
            name='related_competition_test',
        ),
        migrations.AddField(
            model_name='competitionpost',
            name='competition',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='api.competition', verbose_name='competition'),
        ),
    ]
