# Generated by Django 5.1.2 on 2024-11-01 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_remove_user_additional_info_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usertocompetitionrelationship',
            name='show_in_admin',
            field=models.CharField(choices=[('PENDING_REQUEST', 'Pending Request'), ('REQUEST_ACCEPTED', 'Request Accepted'), ('NOT_QUALIFIED', 'Not Qualified'), ('QUALIFIED', 'Qualified'), ('EIGHTH_FINALIST', '1/8 Finalist'), ('QUARTER_FINALIST', '1/4 Finalist'), ('SEMIFINALIST', 'Semifinalist'), ('FINALIST', 'Finalist'), ('SECOND_PLACE', '2nd Place'), ('WINNER', 'Won'), ('ALL', 'All')], default='*', max_length=20),
        ),
    ]