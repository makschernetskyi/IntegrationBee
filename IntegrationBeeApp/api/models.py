import datetime
import subprocess
from html import unescape
from pathlib import Path

from django.contrib.auth.models import AbstractUser, BaseUserManager, Group
from django.contrib.contenttypes.fields import GenericRelation
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models.fields import CharField, IntegerField
from django.forms import BaseInlineFormSet
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import format_html
from modelcluster.fields import ParentalKey
from wagtail.admin.panels import FieldPanel, InlinePanel, PublishingPanel
from wagtail.admin.panels import MultiFieldPanel
from wagtail.blocks import StreamBlock
from wagtail.fields import StreamField
from wagtail.models import ClusterableModel, RevisionMixin
from wagtail.models import Orderable
from wagtailmath.blocks import MathBlock

from api.blocks import SeriesBlock
from api.widgets import Base64AudioWidget
from api.elo_config import MU, DECAY_INTERVAL


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
    program_of_study = models.CharField(max_length=100, null=True, blank=True)

    region = models.CharField(max_length=100, null=True, blank=True, default='No Affiliation')
    ranking_elo = models.FloatField(default=MU)
    ranking_gym = models.IntegerField(default=0)

    is_verified = models.BooleanField(default=False, null=False, blank=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    gym_last_completed = models.DateField(null=True, blank=True)
    gym_daily_streak = models.IntegerField(default=0)
    gym_daily_streak_max = models.IntegerField(default=0)

    @property
    def get_gym_daily_streak_max(self):
        return self.gym_daily_streak_max

    @property
    def get_gym_daily_streak(self):
        today = timezone.localdate()
        yesterday = today - datetime.timedelta(days=1)

        if self.gym_last_completed in (today, yesterday):
            return self.gym_daily_streak

        self.gym_daily_streak = 0
        self.save()
        return 0

    @property
    def get_gym_success_rate(self):
        all_count = DailyIntegralToUserRelationship.objects.filter(user=self).count()
        solved_count = DailyIntegralToUserRelationship.objects.filter(user=self, solved=True).count()
        return solved_count / all_count if all_count > 0 else 0

    @property
    def is_wagtail_admin(self):
        return self.is_superuser or self.is_staff

    @property
    def is_page_editor(self):
        return self.groups.filter(name='PageEditor').exists()

    @property
    def is_integral_editor(self):
        return self.groups.filter(name='IntegralEditor').exists()

    @property
    def is_submission_editor(self):
        return self.groups.filter(name='SubmissionEditor').exists()

    @property
    def role(self):
        roles = {'Admin': self.is_wagtail_admin, 'PageEditor': self.is_page_editor,
                 'IntegralEditor': self.is_integral_editor, 'SubmissionEditor': self.is_submission_editor, }

        return roles

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class UserToCompetitionRelationship(RevisionMixin, Orderable):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='+', null=True, blank=False)
    competition = ParentalKey('Competition', on_delete=models.CASCADE, related_name='participants_relationships')
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    emergency_phone_number = models.CharField(max_length=20, null=True, blank=True)
    program_of_study = models.CharField(max_length=100, null=True, blank=True)
    name_pronunciation = models.TextField(max_length=2 * (10 ** 6), null=True, blank=True)
    additional_info = models.TextField(null=True, blank=True)
    _revisions = GenericRelation("wagtailcore.Revision", related_query_name="usertocompetitionrelationship")

    choices = [('PENDING_REQUEST', 'Pending Request'), ('REQUEST_ACCEPTED', 'Request Accepted'),
               ('NOT_QUALIFIED', 'Not Qualified'), ('QUALIFIED', 'Qualified'), ('EIGHTH_FINALIST', '1/8 Finalist'),
               ('QUARTER_FINALIST', '1/4 Finalist'), ('SEMIFINALIST', 'Semifinalist'), ('FINALIST', 'Finalist'),
               ('SECOND_PLACE', '2nd Place'), ('WINNER', 'Won')]

    status = models.CharField(max_length=20, choices=choices, default='PENDING_REQUEST', null=False, blank=False)

    panels = [FieldPanel('user'), FieldPanel('status'), FieldPanel('competition'), FieldPanel('phone_number'),
              FieldPanel('emergency_phone_number'), FieldPanel('program_of_study'),
              FieldPanel('name_pronunciation', widget=Base64AudioWidget), FieldPanel('additional_info'), ]

    def __str__(self):
        return f"{self.user.email} - {self.competition.name} - {self.status}"

    @property
    def revisions(self):
        return self._revisions


class FilteredInlineFormSet(BaseInlineFormSet):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        show_status = self.instance.participants_filter

        if show_status == 'PENDING_REQUEST':
            self.queryset = self.queryset.filter(status=show_status)
        if show_status == 'REQUEST_ACCEPTED':
            self.queryset = self.queryset.filter(status=show_status)
        if show_status == 'IN_COMPETITION':
            self.queryset = self.queryset.filter(
                status__in=['QUALIFIED', 'EIGHTH_FINALIST', 'QUARTER_FINALIST', 'SEMIFINALIST', 'FINALIST',
                            'SECOND_PLACE', 'WINNER'])


class FilteredInlinePanel(InlinePanel):
    def get_form_options(self):
        form_options = super().get_form_options()
        formset_options = form_options['formsets'][self.relation_name]
        formset_options['formset'] = FilteredInlineFormSet
        return form_options


class Competition(RevisionMixin, ClusterableModel):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True, null=True, blank=True)
    max_participants = models.IntegerField(null=True, blank=True)
    event_date_start = models.DateTimeField(blank=True, null=True)
    event_date_end = models.DateTimeField(blank=True, null=True)
    close_registration = models.CharField(max_length=100, null=True, blank=True, default="Registration Closed")
    _revisions = GenericRelation("wagtailcore.Revision", related_query_name="competition")
    
    # Track if decay has been applied for this competition
    decay_applied = models.BooleanField(default=False)

    series = StreamField([('series', SeriesBlock()), ], null=True, blank=True, use_json_field=True)

    panels = [MultiFieldPanel([FieldPanel('name'), FieldPanel('event_date_start'), FieldPanel('event_date_end'),
                               FieldPanel('max_participants'), FieldPanel('close_registration'), ],
                              heading="Competition Details", permission='api.edit_detail'),

              MultiFieldPanel([FieldPanel('participants_filter'),
                               FilteredInlinePanel('participants_relationships', label="Participants",
                                                   classname="collapsed", panels=[FieldPanel('user', read_only=True),
                                                                                  FieldPanel('status')]), ],
                              heading="Competition Participants", classname="collapsed",
                              permission='api.edit_participants'),

              MultiFieldPanel([InlinePanel('rounds', label="Rounds", classname="collapsed"), ],
                              heading="Competition Rounds", classname="collapsed", permission='api.edit_rounds'),

              MultiFieldPanel([FieldPanel("series", classname="collapsed")], heading="Competition Integrals",
                              classname="collapsed", permission='api.edit_integrals'), ]

    ROUND_ORDER = ['1/8 Finals', 'Quarterfinals', 'Semifinals', 'Finals', ]

    choices = [('PENDING_REQUEST', 'Pending Request'), ('REQUEST_ACCEPTED', 'Request Accepted'),
               ('IN_COMPETITION', 'In Competition'), ('ALL', 'All'), ]

    participants_filter = models.CharField(max_length=20, choices=choices, default='ALL', null=False, blank=True)

    @property
    def revisions(self):
        return self._revisions

    def __str__(self):
        return self.name

    def generate_latex(self, full_latex_file):
        html_file = Path('competition_report.html')
        latex_file = Path('competition_report.tex')

        try:
            participants = self.participants_relationships.filter(status__in=['R', 'Q', 'E', 'F', 'S', 'T', 'W'])
            series = self.series

            report_html = render_to_string('contest_report.html',
                                           {'competition': self, 'participants': participants, 'series': series, })

            report_html = unescape(report_html)

            with html_file.open('w') as f:
                f.write(report_html)

            pandoc_latex_command = ['pandoc', '-f', 'html+tex_math_dollars+tex_math_single_backslash+raw_tex', '-t',
                                    'latex', '--wrap=none', '-o', str(latex_file), str(html_file)]
            subprocess.run(pandoc_latex_command, stdout=subprocess.PIPE, check=True)

            latex_content = render_to_string('contest_report.tex', {'body': latex_file.read_text(),
                                                                    'date': datetime.datetime.now().strftime(
                                                                        "%Y-%m-%d %H:%M:%S"), 'name': self.name, })

            latex_content = unescape(latex_content)

            with open(full_latex_file, 'w') as f:
                f.write(latex_content)

        finally:
            html_file.unlink(missing_ok=True)
            latex_file.unlink(missing_ok=True)

    def generate_latex_pdf_report(self):
        try:
            latex_path = Path(f'competition_{self.pk}_report.tex')
            pdf_path = Path(f'competition_{self.pk}_report.pdf')
            log_path = Path(f'competition_{self.pk}_report.log')
            aux_path = Path(f'competition_{self.pk}_report.aux')

            self.generate_latex(latex_path)

            pdf_command = f"pdflatex -jobname={pdf_path.stem} {latex_path}"
            subprocess.run(pdf_command, shell=True)

            with open(pdf_path, 'rb') as pdf_file:
                response = HttpResponse(pdf_file.read(), content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename="{pdf_path.name}"'

            latex_path.unlink(missing_ok=True)
            pdf_path.unlink(missing_ok=True)
            log_path.unlink(missing_ok=True)
            aux_path.unlink(missing_ok=True)

            return response

        except Exception as e:
            print(e)
            return HttpResponse("Error generating LaTeX report", status=500)

    def generate_latex_tex_report(self):
        try:
            latex_path = Path(f'competition_{self.pk}_report.tex')
            self.generate_latex(latex_path)

            with open(latex_path, 'rb') as tex_file:
                response = HttpResponse(tex_file.read(), content_type='application/tex')
                response['Content-Disposition'] = f'attachment; filename="{latex_path.name}"'

            latex_path.unlink(missing_ok=True)

            return response

        except Exception as e:
            print(e)
            return HttpResponse("Error generating LaTeX report", status=500)

    def generate_bracket(self):
        participants = self.participants_relationships.filter(
            status__in=['QUALIFIED', 'EIGHTH_FINALIST', 'QUARTER_FINALIST', 'SEMIFINALIST', 'FINALIST', 'SECOND_PLACE',
                        'WINNER'])
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

            initial_round.matches.create(player1=player1, player2=player2, sort_order=i // 2, )

            player1_rel = self.participants_relationships.get(user=player1, competition=self)
            player2_rel = self.participants_relationships.get(user=player2, competition=self)
            player1_rel.status = 'EIGHTH_FINALIST'
            player2_rel.status = 'EIGHTH_FINALIST'
            player1_rel.save()
            player2_rel.save()

        match_counts = {'Quarterfinals': 4, 'Semifinals': 2, 'Finals': 1, }

        for round_name, num_matches in match_counts.items():
            round_instance = rounds[round_name]
            for i in range(num_matches):
                round_instance.matches.create(player1=None, player2=None, sort_order=i, )

        self.save()

    def generate_participants_csv(self):
        participants = self.participants_relationships.all()
        csv_content = ("First Name,Last Name,Email,Status,Phone Number,Emergency Phone Number,"
                       "Program of Study,Additional Info\n")

        for participant in participants:
            csv_content += (f"{participant.user.first_name},{participant.user.last_name},{participant.user.email},"
                            f"{participant.status},{participant.phone_number},{participant.emergency_phone_number},"
                            f"{participant.program_of_study}{participant.additional_info}\n")

        response = HttpResponse(csv_content, content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="participants_{self.pk}.csv"'

        return response

    def gen_brackets(self):
        return format_html(f'<a href="/api/v2/contestBracket/{self.id}/generate">Generate Brackets</a>')

    gen_brackets.short_description = "Generate Brackets"

    def download_report(self):
        return format_html(f'<a href="/api/v2/contestReport/{self.id}/download_pdf">Download Report PDF</a><br>'
                           f'<a href="/api/v2/contestReport/{self.id}/download_tex">Download Report TEX</a><br>'
                           f'<a href="/api/v2/participantsReport/{self.id}/download_csv">Download Participants CSV</a>')

    download_report.short_description = "Download"

    def update_user_elo(self, match=None):
        """
        Update ELO ratings using the proprietary IntegrationBee algorithm.
        Called after every match to update ELO for that specific match.
        Decay is only applied when Finals match is completed (competition finished).
        """
        from .elo_utils import calculate_k_factor, calculate_elo_change, apply_decay_to_rating
        from .elo_config import DECAY_INTERVAL
        
        # Update ELO for the specific match that was just completed
        if match and match.winner and match.player1 and match.player2:
            winner = match.winner
            loser = match.player1 if match.player2 == winner else match.player2
            
            # Skip rating update if either player is a placeholder
            player1_name = f"{match.player1.first_name} {match.player1.last_name}".lower()
            player2_name = f"{match.player2.first_name} {match.player2.last_name}".lower()
            
            if "placeholder" in player1_name or "placeholder" in player2_name:
                # Skip ELO update for matches involving placeholder players
                pass
            else:
                # Get current ratings
                winner_rating = winner.ranking_elo
                loser_rating = loser.ranking_elo
                
                try:
                    # Calculate K factor for this round
                    k_factor = calculate_k_factor(match.round.name)
                except ValueError:
                    # Skip if invalid round name
                    return
                
                # Calculate ELO changes using proprietary algorithm
                winner_change, loser_change = calculate_elo_change(
                    winner_rating, loser_rating, k_factor
                )
                
                # Apply changes
                winner.ranking_elo += winner_change
                loser.ranking_elo += loser_change
                
                # Save updated ratings
                winner.save()
                loser.save()
        
        # Check if we need to apply decay ONLY when Finals is completed
        if match and match.round.name == 'Finals' and not self.decay_applied:
            # Count completed competitions (those with Finals winner set and decay already applied)
            completed_competitions = Competition.objects.filter(
                rounds__name='Finals',
                rounds__matches__winner__isnull=False,
                decay_applied=True
            ).distinct().count()
            
            # Include this competition in the count
            total_completed = completed_competitions + 1
            
            # Check if this is a multiple of DECAY_INTERVAL competitions
            if total_completed % DECAY_INTERVAL == 0:
                self._apply_decay_to_all_users()
                self.decay_applied = True
                self.save()

    def _apply_decay_to_all_users(self):
        """
        Apply decay formula to all users' ratings.
        Called every 5th competition completion.
        Excludes placeholder users from decay.
        """
        from .elo_utils import apply_decay_to_rating
        from django.db.models import Q
        
        # Apply decay to all users except placeholders
        users = User.objects.exclude(
            Q(first_name__icontains='placeholder') | 
            Q(last_name__icontains='placeholder')
        )
        
        for user in users:
            user.ranking_elo = apply_decay_to_rating(user.ranking_elo)
            user.save()


class Round(ClusterableModel):
    ROUND_PROGRESSION = {'1/8 Finals': 'Quarterfinals', 'Quarterfinals': 'Semifinals', 'Semifinals': 'Finals', }

    competition = ParentalKey('Competition', on_delete=models.CASCADE, related_name='rounds')
    name = models.CharField(max_length=20)
    propagate_winner = models.BooleanField(default=True, null=False, blank=False)

    panels = [FieldPanel("name"), FieldPanel("propagate_winner"), InlinePanel('matches', classname="collapsed"), ]

    def __str__(self):
        return f"{self.name} - {self.competition.name}"


class Match(ClusterableModel):
    WINNER_CHOICES = [('player1', 'Player 1'), ('player2', 'Player 2'), ]

    round = ParentalKey('Round', on_delete=models.CASCADE, related_name='matches')
    player1 = models.ForeignKey(User, related_name='+', on_delete=models.CASCADE, null=True, blank=True)
    player2 = models.ForeignKey(User, related_name='+', on_delete=models.CASCADE, null=True, blank=True)
    match_winner = models.CharField(max_length=7, choices=WINNER_CHOICES, null=True, blank=True)
    sort_order = models.IntegerField(default=0, null=False, blank=False)

    panels = [FieldPanel('player1'), FieldPanel('player2'), FieldPanel('match_winner'), FieldPanel('sort_order'), ]

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
                second_player_relationship = UserToCompetitionRelationship.objects.get(user=second_player,
                                                                                       competition=self.round.competition)
                second_player_relationship.status = 'SECOND_PLACE'
                second_player_relationship.save()
            
            # Call update_user_elo for this specific match
            self.round.competition.update_user_elo(match=self)

        super().save(**kwargs)
    
    def update_participant_status(self):
        try:
            relationship = UserToCompetitionRelationship.objects.get(user=self.winner,
                                                                     competition=self.round.competition)
            status_map = {'1/8 Finals': 'QUARTER_FINALIST', 'Quarterfinals': 'SEMIFINALIST', 'Semifinals': 'FINALIST',
                          'Finals': 'WINNER', }
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


class PasswordResetToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)


class DailyIntegral(RevisionMixin, ClusterableModel):
    integral = StreamField([('integral', MathBlock(required=True, default=r'$$\int_{0}^{1} x^2 \, dx$$')), ], null=True,
                           blank=True, block_counts={'integral': {'min_num': 1, 'max_num': 1}, }, )

    integral_answer = models.CharField(max_length=255, null=True, blank=True, help_text="Add answer")

    original_author = models.CharField(max_length=255, null=True, blank=True, help_text="Add author")

    difficulty_level = models.IntegerField(default=5, help_text="Difficulty level (1-10)", null=True, blank=True)

    date = models.DateField(null=True, blank=True, help_text="Which date this integral is for")

    panels = [FieldPanel('integral'),
              FieldPanel('integral_answer'),
              FieldPanel('original_author'),
              FieldPanel('difficulty_level'),
              FieldPanel('date'),
              MultiFieldPanel(
                  [InlinePanel('user_relationships', label="User Relationships", classname="collapsed",
                         panels=[FieldPanel('user', read_only=True),
                                 FieldPanel('attempts', read_only=True),
                                 FieldPanel('solved', read_only=True)])],
                  heading="Users", classname="collapsed"),
              ]

    class Meta:
        verbose_name = "Daily Integral"
        verbose_name_plural = "Daily Integrals"
        ordering = ["-date"]

    def __str__(self):
        return f"Integral for {self.date} (Lvl {self.difficulty_level})"


class DailyIntegralToUserRelationship(Orderable):
    integral = ParentalKey(DailyIntegral, on_delete=models.CASCADE, related_name='user_relationships')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    attempts = models.IntegerField(default=0)
    solved = models.BooleanField(default=False)

    panels = [FieldPanel('user'), FieldPanel('attempts'), FieldPanel('solved'), ]

    class Meta:
        unique_together = ('user', 'integral')

    def __str__(self):
        return f"{self.user.email} - {self.integral.date} - solved={self.solved}"
