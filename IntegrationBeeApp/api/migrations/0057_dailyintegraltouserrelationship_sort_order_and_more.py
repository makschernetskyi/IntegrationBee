# Generated by Django 5.1.2 on 2025-01-28 16:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0056_alter_dailyintegral_integral'),
    ]

    operations = [
        migrations.AddField(
            model_name='dailyintegraltouserrelationship',
            name='sort_order',
            field=models.IntegerField(blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='dailyintegraltouserrelationship',
            name='integral',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_relationships', to='api.dailyintegral'),
        ),
    ]
