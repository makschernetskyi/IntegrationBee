# Generated by Django 5.1.2 on 2025-01-28 15:30

import wagtail.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0054_alter_dailyintegral_integral'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailyintegral',
            name='integral',
            field=wagtail.fields.StreamField([('integral', 0)], blank=True, block_lookup={0: ('wagtailmath.blocks.MathBlock', (), {'default': '$$\\int_{0}^{1} x^2 \\, dx$$', 'required': True})}, default=[('integral', '$$\\int_{0}^{1} x^2 \\, dx$$')], null=True),
        ),
    ]
