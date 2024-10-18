import subprocess
import urllib
import datetime

import requests
from django.db import models

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.http import HttpResponse
from django.template.loader import render_to_string
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.fields import StreamField
from wagtail.models import Orderable
from django.db import models

from wagtail.models import ClusterableModel
from wagtail.admin.panels import FieldPanel, InlinePanel
from django.db import models
from modelcluster.fields import ParentalKey

from api.blocks import SeriesBlock


class UserManager(BaseUserManager):

    use_in_migration = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is Required')

        user = self.model(email=self.normalize_email(email), username=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(unique=True, null=False, blank=False)
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    institution = models.CharField(max_length=100, null=True, blank=True)

    phone_number = models.CharField(max_length=20, null=True, blank=True)
    emergency_phone_number = models.CharField(max_length=20, null=True, blank=True)
    program_of_study = models.CharField(max_length=100, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    name_pronunciation = models.CharField(max_length=100, null=True, blank=True)
    additional_info = models.TextField(null=True, blank=True)

    profile_picture = models.ImageField(upload_to="user_pictures/profile_pictures/", blank=True, null=True)
    is_verified = models.BooleanField(default=False, null=False, blank=False)

    registration_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_login_date = models.DateTimeField(auto_now=True, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'institution']

    objects = UserManager()

    def is_editor(self):
        return self.groups.filter(name='Editors').exists()

    def is_moderator(self):
        return self.groups.filter(name='Moderators').exists()

    def is_admin(self):
        return self.groups.filter(name='Admins').exists()

    def get_role(self):
        if self.is_admin():
            return 'Admin'
        elif self.is_moderator():
            return 'Moderator'
        elif self.is_editor():
            return 'Editor'
        else:
            return 'User'

    def __str__(self):
        return f"{self.email} - {self.first_name} {self.last_name}"


class Competition(ClusterableModel):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    max_participants = models.IntegerField(null=True, blank=True)

    series = StreamField([
        ('series', SeriesBlock()),
    ], null=True, blank=True, use_json_field=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('max_participants'),
        InlinePanel('participants_relationships', label="Participants"),
        FieldPanel("series")
    ]

    def __str__(self):
        return self.name

    def generate_latex_report(self):
        try:
            participants = self.participants_relationships.filter(status__in=['R', 'Q', 'E', 'F', 'S', 'T', 'W'])
            series = self.series

            report_html = render_to_string('contest_report.html', {
                'competition': self,
                'participants': participants,
                'series': series,
            })

            html_file_template = 'contest_report.html'
            html_file = 'competition_report.html'
            latex_file_template = 'contest_report.tex'
            latex_file = 'competition_report.tex'
            full_latex_file = 'full_competition_report.tex'
            pdf_file = 'competition_report'

            with open(html_file, 'w') as f:
                f.write(report_html)

            pandoc_latex_command = [
                'pandoc',
                '-f', 'html+tex_math_dollars+tex_math_single_backslash',
                '-t', 'latex',
                '-o', latex_file,
                html_file
            ]

            subprocess.run(pandoc_latex_command, stdout=subprocess.PIPE, check=True)

            latex_content = render_to_string(latex_file_template, {
                    'body': open(latex_file, 'r').read(),
                    'date': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    'name': self.name,
                })

            with open(full_latex_file, 'w') as f:
                f.write(latex_content)

            lualatex_pdf_command = f"lualatex -jobname={pdf_file} {full_latex_file}"
            subprocess.run(lualatex_pdf_command, shell=True)

            return HttpResponse(open(f"{pdf_file}.pdf", 'rb').read(), content_type='application/pdf')

        except Exception  as e:
            print(e)
            return HttpResponse("Error generating LaTeX report", status=500)


class UserToCompetitionRelationship(Orderable, models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    competition = ParentalKey('Competition', on_delete=models.CASCADE, related_name='participants_relationships')
    registration_date = models.DateTimeField(auto_now_add=True)

    choices = [
        ('P', 'Pending Request'),
        ('R', 'Request Accepted'),
        ('N', 'Not Qualified'),
        ('Q', 'Qualified'),
        ('E', '1/8 Finalist'),
        ('F', '1/4 Finalist'),
        ('S', 'Semifinalist'),
        ('T', '2nd Place'),
        ('W', 'Won')
    ]

    status = models.CharField(max_length=1, choices=choices, default='P')

    panels = [
        FieldPanel('user'),
        FieldPanel('status'),
    ]

    def __str__(self):
        return f"{self.user.email} - {self.competition.name} - {self.status}"


class EmailVerificationToken(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=300, null=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=False, null=False)


class ForgotPasswordToken(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=300, null=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=False, null=False)


class IntegralsSeries(models.Model):
    objects = None
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    time_per_integral = models.IntegerField(null=False, blank=False, default=180)


class IntegralSolution(models.Model):
    id = models.AutoField(primary_key=True)
    solution = models.TextField()


class Integral(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    position = models.IntegerField(null=False, blank=False)
    integral = models.TextField(null=False, blank=False)
    Series = models.ForeignKey(IntegralsSeries, on_delete=models.CASCADE, related_name="integrals")
    solution = models.ForeignKey(IntegralSolution, on_delete=models.SET_NULL, null=True)
    difficulty = models.IntegerField(blank=True, null=True)
    author = models.TextField(null=True, blank=True)


