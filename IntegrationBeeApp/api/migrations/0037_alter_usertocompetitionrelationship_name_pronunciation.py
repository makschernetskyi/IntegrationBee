# Generated by Django 5.1.2 on 2024-11-04 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0036_passwordresettoken'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertocompetitionrelationship',
            name='name_pronunciation',
            field=models.TextField(blank=True, max_length=2000000, null=True),
        ),
    ]