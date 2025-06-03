import base64
from uuid import uuid4

from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
from django.db import IntegrityError
from django.db import transaction
from django.db.models import Window, F
from django.db.models.functions import Rank
from django.http import HttpResponseForbidden
from django.shortcuts import get_object_or_404
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from sympy import sympify, simplify
from sympy.parsing.latex import parse_latex
from wagtail.snippets.views.snippets import RevisionsCompareView
from django.conf import settings

from api.services.send_email import send_email
from .filters import UserEloFilter
from .models import PasswordResetToken, EmailVerificationToken, \
    UserToCompetitionRelationship, Competition, User, DailyIntegral, \
    DailyIntegralToUserRelationship  # Ensure you have PasswordResetToken model

from .serializers import UserSerializer, UserToCompetitionRelationshipSerializer, CompetitionSerializer, \
    CompetitionListSerializer, UserEloSerializer, DailyIntegralSerializer, \
    DailyIntegralSolveSerializer, UserGymRankingSerializer
from .permissions import HasCompetitionPermission, HasIntegralEditorPermission

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from datetime import timedelta
from .models import PasswordResetToken

from wagtail.users.models import UserProfile as WagtailUserProfile

from .templatetags.custom_filters import register

from .latex_utils import normalize_basic


class PasswordResetConfirmView(APIView):

    def post(self, request):
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        if not token or not new_password:
            return Response({"error": "Token and new password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            reset_token = PasswordResetToken.objects.get(token=token)

            if reset_token.created_at < timezone.now() - timedelta(hours=24):
                reset_token.delete()
                return Response({"error": "Token has expired."}, status=status.HTTP_400_BAD_REQUEST)

            reset_token.user.password = make_password(new_password)
            reset_token.user.save()

            reset_token.delete()
            return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)

        except PasswordResetToken.DoesNotExist:
            return Response({"error": "Invalid token."}, status=status.HTTP_404_NOT_FOUND)


class RequestPasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            reset_token = str(uuid4())

            PasswordResetToken.objects.create(user=user, token=reset_token)

            reset_link = f"{settings.WAGTAILADMIN_BASE_URL}/reset_password?token={reset_token}"
            send_email(
                [email],
                message=render_to_string(
                    template_name='passwordResetEmail.html',
                    context={"reset_link": reset_link}
                ),
                subject="(NO REPLY) Password Reset Request",
                is_html=True
            )

            return Response({"message": "Password reset link sent."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "No user with this email."}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            if email and User.objects.filter(email=email).exists():
                raise ValidationError("User with this email already exists.")

            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            WagtailUserProfile.objects.create(user=user)

            verification_token = str(uuid4())

            EmailVerificationToken.objects.create(
                User=user,
                token=verification_token
            )

            verification_link = "https://www.integrationbee.at/api/v2/verifyemail/" + f"?token={verification_token}"
            send_email(
                [email],
                message=render_to_string(
                    template_name='verificationEmail.html',
                    context={
                        "verification_link": verification_link
                    }
                ),
                subject="(NO REPLY) Verify your email address.",
                is_html=True
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    def get(self, request):
        request_verification_token = request.query_params.get('token')
        if not request_verification_token:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = EmailVerificationToken.objects.select_related('User').get(token=request_verification_token)
        except EmailVerificationToken.DoesNotExist:
            return Response({"error": "Invalid token."}, status=status.HTTP_404_NOT_FOUND)

        try:
            with transaction.atomic():
                user = token.User
                if not user.is_verified:
                    user.is_verified = True
                    user.save()
                    token.delete()
                else:
                    return Response({"error": "User is already active."}, status=status.HTTP_409_CONFLICT)
        except IntegrityError:

            return Response({"error": "Database integrity error during user activation."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        redirect_url = 'https://integrationbee.at/sign_in?emailVerified=true'
        return redirect(redirect_url)


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)


class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        if 'phone_number' in data:
            user.phone_number = data['phone_number']
        if 'program_of_study' in data:
            user.program_of_study = data['program_of_study']
        if 'institution' in data:
            user.institution = data['institution']

        if 'profile_picture' in data and data['profile_picture']:
            try:
                format_str, imgstr = data['profile_picture'].split(';base64,')

                image_data = base64.b64decode(imgstr)
                wagtail_profile, created = WagtailUserProfile.objects.get_or_create(user=user)
                # Directly save to wagtail_profile.avatar
                wagtail_profile.avatar.save(
                    "profile_picture.png",
                    ContentFile(image_data),
                    save=False
                )
                wagtail_profile.save()

            except Exception as e:
                print(e)
                return Response({"error": "Invalid image data"}, status=status.HTTP_400_BAD_REQUEST)

        user.save()
        return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)


class CompetitionView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        action = request.data.get('action', 'register')  # Default action is 'register'
        competition = get_object_or_404(Competition, pk=pk)
        user = request.user

        if action == 'register':
            if competition.max_participants and competition.participants_relationships.count() >= competition.max_participants:
                return Response({"error": "Maximum number of participants reached."},
                                status=status.HTTP_400_BAD_REQUEST)

            if competition.close_registration:
                return Response({"error": "Registration is closed for this competition."},
                                status=status.HTTP_400_BAD_REQUEST)

            user_serializer = UserSerializer(user, data=request.data, partial=True)
            if user_serializer.is_valid():
                user_serializer.save()
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            relationship_serializer = UserToCompetitionRelationshipSerializer(
                data=request.data,
                context={'user': user, 'competition': competition}
            )

            if relationship_serializer.is_valid():
                try:
                    relationship_serializer.save()
                    return Response({"success": "User registered for competition, waiting for admin approval"},
                                    status=status.HTTP_200_OK)
                except ValidationError as e:
                    return Response({"error": str(e.detail)}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(relationship_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif action == 'unregister':

            relationship = UserToCompetitionRelationship.objects.filter(user=user, competition=competition).first()
            if relationship:
                relationship.delete()
                return Response({"success": "User unregistered from competition"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User is not registered for this competition"},
                                status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"error": "Invalid action specified"}, status=status.HTTP_400_BAD_REQUEST)


class CompetitionListView(ListAPIView):
    queryset = Competition.objects.all()
    serializer_class = CompetitionListSerializer


class CompetitionSeriesDetailView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [HasIntegralEditorPermission]

    def get(self, request, competition_id, series_id):
        competition = get_object_or_404(Competition, id=competition_id)
        for series_block in competition.series:
            if str(series_block.id) == series_id:
                integrals_list = []
                for integral_block in series_block.value['integrals']:
                    integral_data = {
                        'id': str(integral_block.id),
                        'integral': integral_block.value.get('integral', ''),
                        'integral_answer': integral_block.value.get('integral_answer', ''),
                        'original_author': integral_block.value.get('original_author', ''),
                    }
                    integrals_list.append(integral_data)
                series_data = {
                    'id': str(series_block.id),
                    'series_name': series_block.value.get('series_name', ''),
                    'integrals': integrals_list,
                }
                return Response(series_data, status=status.HTTP_200_OK)
        return Response({"error": "Series not found"}, status=status.HTTP_404_NOT_FOUND)


class CompetitionTieBreakersView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [HasIntegralEditorPermission]

    def get(self, request, competition_id):
        competition = get_object_or_404(Competition, id=competition_id)
        for series_block in competition.series:
            if series_block.value.get('series_name') == 'tie-breakers':
                integrals_list = []
                for integral_block in series_block.value['integrals']:
                    integral_data = {
                        'id': str(integral_block.id),
                        'integral': integral_block.value.get('integral', ''),
                        'integral_answer': integral_block.value.get('integral_answer', ''),
                        'original_author': integral_block.value.get('original_author', ''),
                    }
                    integrals_list.append(integral_data)
                series_data = {
                    'id': str(series_block.id),
                    'series_name': series_block.value.get('series_name', ''),
                    'integrals': integrals_list,
                }
                return Response(series_data, status=status.HTTP_200_OK)
        return Response({"error": "Tie-breakers series not found"}, status=status.HTTP_404_NOT_FOUND)


class DownloadLatexPdfReportView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        competition = get_object_or_404(Competition, pk=pk)
        try:
            return competition.generate_latex_pdf_report()
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class DownloadLatexTexReportView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        competition = get_object_or_404(Competition, pk=pk)
        try:
            return competition.generate_latex_tex_report()
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class GenerateBracketView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated, HasCompetitionPermission]

    def get(self, request, pk):
        competition = get_object_or_404(Competition, pk=pk)

        try:
            competition.generate_bracket()
            return Response({"success": "Bracket generated successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class DownloadParticipantsCsvView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [HasCompetitionPermission]

    def get(self, request, pk):
        competition = get_object_or_404(Competition, pk=pk)
        try:
            return competition.generate_participants_csv()
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class CustomRevisionsCompareView(RevisionsCompareView):
    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return HttpResponseForbidden()
        return super().dispatch(request, *args, **kwargs)


class UserEloListView(ListAPIView):

    serializer_class = UserEloSerializer
    permission_classes = []  # Allow public access to rankings

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
    ]
    filterset_class = UserEloFilter

    search_fields = ['first_name', 'last_name']

    def get_queryset(self):
        """
        Return all users - ordering will be handled by list() method
        """
        qualified_user_ids = (
            UserToCompetitionRelationship.objects
            .filter(status='QUALIFIED')
            .values_list('user_id', flat=True)
            .distinct()
        )
        return User.objects.filter(id__in=qualified_user_ids)
    
    def list(self, request, *args, **kwargs):
        """
        Override list method to apply proper ordering by display ratings
        """
        from api.elo_utils import get_display_rating
        
        queryset = self.filter_queryset(self.get_queryset())
        
        # Convert to list and sort by display rating
        users_list = list(queryset)
        users_list.sort(key=lambda user: get_display_rating(user.ranking_elo), reverse=True)
        
        page = self.paginate_queryset(users_list)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(users_list, many=True)
        return Response(serializer.data)


class UserGymRankingListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserGymRankingSerializer
    permission_classes = []  # Allow public access to rankings

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    filterset_class = UserEloFilter

    search_fields = ['first_name', 'last_name']

    ordering_fields = ['ranking_gym']
    ordering = ['-ranking_gym']


class DailyIntegralTodayView(generics.RetrieveAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = DailyIntegralSerializer

    def get_object(self):
        today = timezone.localdate()
        integral = DailyIntegral.objects.filter(date=today).first()

        if not integral:
            integral = DailyIntegral.objects.filter(date=None).first()
            if integral:
                integral.date = today
                integral.save()
        return integral

    def get(self, request, *args, **kwargs):
        integral = self.get_object()
        if not integral:
            return Response({"detail": "No integral for today."}, status=404)
        serializer = self.serializer_class(integral, context={'request': request})
        return Response(serializer.data)


class CheckDailyIntegralAnswerView(generics.GenericAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = DailyIntegralSolveSerializer

    def post(self, request, *args, **kwargs):
        integral_id = kwargs.get('integral_id') or request.data.get('integral_id')
        if not integral_id:
            return Response({"detail": "Missing integral_id."}, status=400)

        try:
            integral = DailyIntegral.objects.get(id=integral_id)
        except DailyIntegral.DoesNotExist:
            return Response({"detail": "Integral not found."}, status=404)

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_answer_str = serializer.validated_data['user_answer']

        rel, created = DailyIntegralToUserRelationship.objects.get_or_create(
            user=request.user,
            integral=integral
        )

        rel.attempts += 1

        try:
            correct_answer_expr = parse_latex(normalize_basic(integral.integral_answer))
            user_answer_expr = parse_latex(normalize_basic(user_answer_str))

            difference = simplify(correct_answer_expr - user_answer_expr)
            if difference == 0:

                rel.solved = True
                self.update_user_streak(request.user, integral)
                request.user.ranking_gym += 1
                request.user.save()
                rel.save()
                return Response({"correct": True, "message": "Correct answer!"})
            else:
                rel.save()
                return Response({"correct": False, "message": "Incorrect answer."})

        except Exception as e:
            rel.save()
            return Response({"correct": False, "message": f"Error parsing answer: {str(e)}"}, status=400)

    def update_user_streak(self, user, integral):
        today = timezone.localdate()
        if integral.date == today:
            yesterday = today - timedelta(days=1)
            if user.gym_last_completed == yesterday:
                user.gym_daily_streak += 1
            else:
                user.gym_daily_streak = 1

            if user.gym_daily_streak > user.gym_daily_streak_max:
                user.gym_daily_streak_max = user.gym_daily_streak

            user.gym_last_completed = today
            user.save()


class UserGymStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user
        return Response({
            "daily_streak": user.get_gym_daily_streak,
            "daily_streak_max": user.get_gym_daily_streak_max,
            "success_rate": user.get_gym_success_rate,
            "gym_ranking": user.ranking_gym
        })