# Generated by Django 5.0 on 2024-05-09 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_token_emailverificationtoken_token_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailverificationtoken',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default='2024-03-19 00:50:28.517544'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='forgotpasswordtoken',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default='2024-03-19 00:50:28.517544'),
            preserve_default=False,
        ),
    ]