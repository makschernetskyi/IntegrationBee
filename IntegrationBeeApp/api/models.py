import subprocess
import urllib
import datetime
from pathlib import Path

import requests
from django.core.exceptions import ValidationError
from django.db import models

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.forms import ModelForm
from django.http import HttpResponse
from django.template.loader import render_to_string
from modelcluster.fields import ParentalKey
from wagtail.admin.forms import WagtailAdminModelForm
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.api import APIField
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
    event_date = models.DateTimeField(blank=True, null=True)

    series = StreamField([
        ('series', SeriesBlock()),
    ], null=True, blank=True, use_json_field=True)

    panels = [
        FieldPanel('name'),
        FieldPanel('event_date'),
        FieldPanel('max_participants', classname="collapsed"),
        InlinePanel('participants_relationships', label="Participants", classname="collapsed"),
        InlinePanel('rounds', label="Rounds", classname="collapsed"),
        FieldPanel("series", classname="collapsed")
    ]

    ROUND_ORDER = [
        '1/8 Finals',
        'Quarterfinals',
        'Semifinals',
        'Finals',
    ]

    def __str__(self):
        return self.name

    def generate_latex(self, full_latex_file):
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

    def generate_latex_pdf_report(self):
        try:
            latex_path = Path(f'competition_{self.pk}_report.tex')
            pdf_path = Path(f'competition_{self.pk}_report.pdf')

            self.generate_latex(latex_path)

            pdf_command = f"pdflatex -jobname={pdf_path.stem} {latex_path}"
            subprocess.run(pdf_command, shell=True)

            response = HttpResponse(open(pdf_path, 'rb').read(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{pdf_path}"'

            return response

        except Exception as e:
            print(e)
            return HttpResponse("Error generating LaTeX report", status=500)

    def generate_latex_tex_report(self):
        try:
            latex_path = Path(f'competition_{self.pk}_report.tex')
            self.generate_latex(latex_path)

            response = HttpResponse(open(latex_path, 'rb').read(), content_type='application/tex')
            response['Content-Disposition'] = f'attachment; filename="{latex_path}"'

            return response

        except Exception as e:
            print(e)
            return HttpResponse("Error generating LaTeX report", status=500)

    def generate_bracket(self):

        participants = self.participants_relationships.filter(status__in=['Q', 'E', 'F', 'S', 'V', 'T', 'W'])
        participants = [rel.user for rel in participants]

        if len(participants) != 16:
            raise ValueError('Exactly qualified 16 participants are required.')

        if self.rounds.exists():
            raise ValueError('Bracket already exists for this competition.')

        rounds = {}
        for round_name in self.ROUND_ORDER:
            round_instance = self.rounds.create(name=round_name, competition=self)
            rounds[round_name] = round_instance

        initial_round = rounds['1/8 Finals']
        for i in range(0, 16, 2):
            player1 = participants[i]
            player2 = participants[i + 1]

            initial_round.matches.create(
                player1=player1,
                player2=player2,
                sort_order=i//2,
            )

            player1_rel = self.participants_relationships.get(user=player1, competition=self)
            player2_rel = self.participants_relationships.get(user=player2, competition=self)
            player1_rel.status = "E"
            player2_rel.status = "E"
            player1_rel.save()
            player2_rel.save()

        match_counts = {
            'Quarterfinals': 4,
            'Semifinals': 2,
            'Finals': 1,
        }

        for round_name, num_matches in match_counts.items():
            round_instance = rounds[round_name]
            for i in range(num_matches):
                round_instance.matches.create(
                    player1=None,
                    player2=None,
                    sort_order=i,
                )

        self.save()



class UserToCompetitionRelationship(Orderable):
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
        ('V', 'Finalist'),
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


class Round(ClusterableModel):
    ROUND_PROGRESSION = {
        '1/8 Finals': 'Quarterfinals',
        'Quarterfinals': 'Semifinals',
        'Semifinals': 'Finals',
    }

    competition = ParentalKey('Competition', on_delete=models.CASCADE, related_name='rounds')
    name = models.CharField(max_length=20)
    propagate_winner = models.BooleanField(default=True, null=False, blank=False)

    panels = [
        FieldPanel("name"),
        FieldPanel("propagate_winner"),
        InlinePanel('matches', classname="collapsed"),
    ]

    def __str__(self):
        return f"{self.name} - {self.competition.name}"


class Match(ClusterableModel):
    WINNER_CHOICES = [
        ('player1', 'Player 1'),
        ('player2', 'Player 2'),
    ]

    round = ParentalKey('Round', on_delete=models.CASCADE, related_name='matches')
    player1 = models.ForeignKey(User, related_name='+', on_delete=models.CASCADE, null=True, blank=True)
    player2 = models.ForeignKey(User, related_name='+', on_delete=models.CASCADE, null=True, blank=True)
    match_winner = models.CharField(max_length=7, choices=WINNER_CHOICES, null=True, blank=True)
    sort_order = models.IntegerField(default=0, null=False, blank=False)

    panels = [
        FieldPanel('player1'),
        FieldPanel('player2'),
        FieldPanel('match_winner'),
        FieldPanel('sort_order'),
    ]

    def __str__(self):
        return f"[{self.player1}] vs [{self.player2}] - winner: {self.match_winner} - {self.round.name}"

    @property
    def winner(self):
        if self.match_winner == 'player1':
            return self.player1
        elif self.match_winner == 'player2':
            return self.player2
        else:
            return None

    def clean(self):
        super().clean()
        if self.winner == 'player1' and not self.player1:
            raise ValidationError("Cannot select Player 1 as winner when Player 1 is not set.")
        if self.winner == 'player2' and not self.player2:
            raise ValidationError("Cannot select Player 2 as winner when Player 2 is not set.")

    def save(self, **kwargs):

        if self.pk:
            original = Match.objects.get(pk=self.pk)
        else:
            super().save(**kwargs)
            return None

        data_changed = original.winner != self.winner

        if data_changed and self.round.propagate_winner:
            self.update_participant_status()

            if self.round.name != 'Finals':
                self.propagate_winner()
            else:
                second_player = self.player1 if self.player1 != self.winner else self.player2
                second_player_relationship = UserToCompetitionRelationship.objects.get(
                    user=second_player,
                    competition=self.round.competition
                )
                second_player_relationship.status = 'T'
                second_player_relationship.save()

        super().save(**kwargs)

    def update_participant_status(self):
        try:
            relationship = UserToCompetitionRelationship.objects.get(
                user=self.winner,
                competition=self.round.competition
            )
            status_map = {
                '1/8 Finals': 'F',
                'Quarterfinals': 'S',
                'Semifinals': 'V',
                'Finals': 'W',
            }
            new_status = status_map.get(self.round.name)
            if new_status:
                relationship.status = new_status
                relationship.save()
        except UserToCompetitionRelationship.DoesNotExist:
            raise ValidationError('Winner is not a participant in the competition.')

    def propagate_winner(self):

        try:
            next_round_name = self.round.ROUND_PROGRESSION[self.round.name]
            next_round = self.round.competition.rounds.get(name=next_round_name)
        except (ValueError, Round.DoesNotExist):
            raise ValidationError('Invalid round progression.')

        next_match_index = self.sort_order // 2
        next_match = next_round.matches.order_by('sort_order')[next_match_index]

        if self.sort_order % 2 == 0:
            next_match.player1 = self.winner
        else:
            next_match.player2 = self.winner

        next_match.save()


class EmailVerificationToken(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=300, null=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=False, null=False)


class ForgotPasswordToken(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=300, null=False)
    date_created = models.DateTimeField(auto_now_add=True, blank=False, null=False)

