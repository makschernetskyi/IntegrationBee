# Generated by Django 5.1.2 on 2025-01-19 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0043_user_ranking_elo_gym'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='ranking_elo',
            field=models.FloatField(default=1000),
        ),
        migrations.AlterField(
            model_name='user',
            name='ranking_elo_gym',
            field=models.FloatField(default=1000),
        ),
    ]
