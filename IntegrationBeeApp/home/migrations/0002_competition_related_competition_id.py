# Generated by Django 5.0 on 2024-03-18 11:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='competition',
            name='related_competition_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
