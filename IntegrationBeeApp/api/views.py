from xxlimited_35 import error

from django.db import transaction, IntegrityError
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from django.shortcuts import redirect
from rest_framework import status
from uuid import uuid4

from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .permissions import IsAdminUser
from .serializers import UserSerializer, CompetitionSerializer, EmailVerificationTokenSerializer
from api.models import Competition, User, EmailVerificationToken

from home.models import CompetitionPost as CompetitionPage
from api.services.send_email import send_email


class RegisterView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            if email and User.objects.filter(email=email).exists():
                raise ValidationError("User with this email already exists.")

            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

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
                if not user.is_confirmed:
                    user.is_confirmed = True
                    user.save()
                    token.delete()
                else:
                    return Response({"error": "User is already active."}, status=status.HTTP_409_CONFLICT)
        except IntegrityError:

            return Response({"error": "Database integrity error during user activation."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        redirect_url = 'https://integrationbee.at/#/signIn?emailVerified=true'
        return redirect(redirect_url)


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user  # Access the User instance directly

            competitions = user.competitions.all()
            competition_serializer = CompetitionSerializer(competitions, many=True)
            competitions_data = competition_serializer.data

            for competition_data in competitions_data:
                competition_id = competition_data.get('id')
                competition_page = CompetitionPage.objects.filter(related_competition_id=competition_id).first()

                competition_data['page_id'] = competition_page.page_ptr_id if competition_page else None
                competition_data['public_name'] = competition_page.competition.header if competition_page else None
                competition_data['date'] = competition_page.event_date if competition_page else None

            return Response({
                'email': user.email,
                'first_name': user.first_name,
                'second_name': user.last_name,
                'institution': user.institution,
                'phone_number': user.phone_number,
                'emergency_phone_number': user.emergency_phone_number,
                'program_of_study': user.program_of_study,
                'date_of_birth': user.date_of_birth,
                'name_pronunciation': user.name_pronunciation,
                'additional_info': user.additional_info,
                'profile_picture': user.profile_picture.url if user.profile_picture else None,
                'registration_date': user.registration_date,
                'last_login_date': user.last_login_date,
                'is_verified': user.is_verified,
                'role': user.get_role(),  # Get the user's role
                'competitions': competitions_data
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if not request.user.is_admin():
                return Response({"error": "Only admin users are authorized to view users."},
                                status=status.HTTP_401_UNAUTHORIZED)

            users = User.objects.all()
            users_serializer = UserSerializer(users, many=True)
            users_data = users_serializer.data

            for user in users_data:
                user.pop('password')

            for userDB, user in zip(users, users_data):
                user['competitions'] = list(map(lambda competition: competition.get('id'), CompetitionSerializer(userDB.competitions, many=True).data))

            return Response(users_data)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PublicCompetitionView(APIView):
    def get(self, request):
        id = request.query_params.get('id')
        if id is None:
            return Response({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        competition = get_object_or_404(Competition, id=id)

        serializer = CompetitionSerializer(competition, many=False)
        publicData = {
            'max_participants':  serializer.data['max_participants'] if 'max_participants' in serializer.data else None,
            'participants_count': len(serializer.data['participants'])
        }
        return Response(publicData)


class CompetitionView(APIView):
    # permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request):
        id = request.query_params.get('id')
        if id is None:
            return Response({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        competition = get_object_or_404(Competition, id=id)

        serializer = CompetitionSerializer(competition, many=False)
        return Response(serializer.data)

    @staticmethod
    def patch(request):
        competition_id = request.data.get('id')
        if competition_id is None:
            return Response({"error": "CompetitionPost ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        action = request.data.get('action')
        if action not in ("add", "remove"):
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        competition = get_object_or_404(Competition, id=competition_id)
        user = request.user

        if competition.max_participants and competition.participants_relationships.count() >= competition.max_participants:
            return Response({"error": "Maximum number of participants reached."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if action == "add":
                competition.participants_relationships.add(user)
                UserSerializer(user, request.data)

            elif action == "remove":
                competition.participants_relationships.remove(user)

            return Response({"success": f"User {action}ed successfully {'from' if action=='remove' else 'to'} competition"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def delete(request):

        if not request.user.is_admin():
            return Response({"error": "Only admin users are authorized to delete competitions"},
                            status=status.HTTP_401_UNAUTHORIZED)

        try:
            id = request.query_params.get('id')
            if id is None:
                return Response({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

            competition = get_object_or_404(Competition, id=id)
            competition.delete()
            return Response({"message": "CompetitionPost deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def post(request):

        if not request.user.is_admin():
            return Response({"error": "Only admin users are authorized to create competitions"},
                            status=status.HTTP_401_UNAUTHORIZED)

        serializer = CompetitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompetitionsView(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request):

        if not request.user.is_admin():
            return Response({"error": "Only admin users are authorized to see all competitions"},
                            status=status.HTTP_401_UNAUTHORIZED)

        try:
            competitions = Competition.objects.all()
            serializer = CompetitionSerializer(competitions, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def download_latex_pdf_report_view(request, pk):
    competition = get_object_or_404(Competition, pk=pk)
    return competition.generate_latex_pdf_report()


def download_latex_tex_report_view(request, pk):
    competition = get_object_or_404(Competition, pk=pk)
    return competition.generate_latex_tex_report()


def generate_bracket_view(request, pk):
    competition = get_object_or_404(Competition, pk=pk)

    try:
        competition.generate_bracket()

    except Exception as e:
        error_message = str(e)
        print(error_message)
        return HttpResponse(f"error: {error_message}", status=500)

    return redirect(request.META.get('HTTP_REFERER', '/'))
