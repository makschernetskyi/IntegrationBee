# Generated by Django 5.0 on 2024-05-23 21:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_user_role'),
    ]

    operations = [
        migrations.CreateModel(
            name='IntegralSolution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('solution', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='IntegralsSeries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('time_per_integral', models.IntegerField(default=180)),
            ],
        ),
        migrations.CreateModel(
            name='Integral',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('position', models.IntegerField()),
                ('integral', models.TextField()),
                ('difficulty', models.IntegerField(blank=True, null=True)),
                ('author', models.TextField(blank=True, null=True)),
                ('solution', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.integralsolution')),
                ('Series', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='integrals', to='api.integralsseries')),
            ],
        ),
    ]