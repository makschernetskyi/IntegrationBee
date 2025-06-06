# Generated by Django 5.1.2 on 2024-10-31 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_competition_event_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertocompetitionrelationship',
            name='status',
            field=models.CharField(choices=[('PENDING_REQUEST', 'Pending Request'), ('REQUEST_ACCEPTED', 'Request Accepted'), ('NOT_QUALIFIED', 'Not Qualified'), ('QUALIFIED', 'Qualified'), ('EIGHTH_FINALIST', '1/8 Finalist'), ('QUARTER_FINALIST', '1/4 Finalist'), ('SEMIFINALIST', 'Semifinalist'), ('FINALIST', 'Finalist'), ('SECOND_PLACE', '2nd Place'), ('WINNER', 'Won')], default='PENDING_REQUEST', max_length=20),
        ),
    ]
