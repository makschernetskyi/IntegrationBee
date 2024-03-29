# Generated by Django 5.0 on 2024-03-18 11:50

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_competition'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competition',
            name='participants',
            field=models.ManyToManyField(related_name='competitions', to=settings.AUTH_USER_MODEL),
        ),
    ]
