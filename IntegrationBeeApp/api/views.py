from django.db import transaction, IntegrityError
from django.shortcuts import render, get_object_or_404
from django.template.loader import render_to_string
from django.shortcuts import redirect
from rest_framework import status
from uuid import uuid4

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from .permissions import IsAdminUser
from .serializers import UserSerializer, CompetitionSerializer, EmailVerificationTokenSerializer, \
    IntegralSeriesSerializer, IntegralSerializer, IntegralSolutionSerializer
from api.models import Competition, User, EmailVerificationToken, IntegralsSeries, IntegralSolution, Integral

from home.models import Competition as CompetitionPage
from api.services.send_email import send_email

# idk why is needed
from django.views.decorators.csrf import csrf_exempt




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
            # Using select_related to fetch related user data in the same query for efficiency
            token = EmailVerificationToken.objects.select_related('User').get(token=request_verification_token)
        except EmailVerificationToken.DoesNotExist:
            return Response({"error": "Invalid token."}, status=status.HTTP_404_NOT_FOUND)

        # Activate the user in a transaction to ensure data integrity
        try:
            with transaction.atomic():
                user = token.User
                if not user.is_active:
                    user.is_active = True
                    user.save()
                    token.delete()
                else:
                    return Response({"error": "User is already active."}, status=status.HTTP_409_CONFLICT)
        except IntegrityError:
            # Handle specific database errors related to the integrity of the database
            return Response({"error": "Database integrity error during user activation."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        redirect_url = 'https://integrationbee.at/#/signIn?emailVerified=true'
        return redirect(redirect_url)


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request):
        try:
            user_serializer = UserSerializer(request.user)
            competition_serializer = CompetitionSerializer(request.user.competitions.all(), many=True)

            competitions_data = competition_serializer.data

            for competition_data in competitions_data:
                # Get the competition ID from the serialized data
                competition_id = competition_data.get('id')

                # Query the CompetitionPage model to get the page_id associated with the competition
                competition_page = CompetitionPage.objects.filter(related_competition_id=competition_id).first()

                # Add the page_id field to the competition data
                competition_data['page_id'] = competition_page.page_ptr_id if competition_page else None
                competition_data['public_name'] = competition_page.competition.header if competition_page else None
                competition_data['date'] = competition_page.event_date if competition_page else None


            roles = {
                1: "ADMIN",
                2: "MODERATOR",
                3: "EDITOR",
                4: "USER"
            }


            return Response({
                'email': user_serializer.data.get('email'),
                'first_name': user_serializer.data.get('first_name'),
                'second_name': user_serializer.data.get('second_name'),
                'school': user_serializer.data.get('school'),
                'profile_picture': user_serializer.data.get('profile_picture'),
                'date_joined': user_serializer.data.get('date_joined'),
                'is_admin': user_serializer.data.get('is_admin'),
                'competitions': competitions_data,
                'role': roles[user_serializer.data.get('role')]
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if not request.user.is_admin:
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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        id = request.query_params.get('id')
        if id is None:
            return Response({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        competition = get_object_or_404(Competition, id=id)

        serializer = CompetitionSerializer(competition, many=False)
        return Response(serializer.data)


    def patch(self, request):
        competition_id = request.data.get('id')
        if competition_id is None:
            return Response({"error": "Competition ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        action = request.data.get('action')
        if action not in ("add", "remove"):
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        competition = get_object_or_404(Competition, id=competition_id)
        user = request.user

        # todo: or because idk if it's object or a dictionary and it's 1am, so it needs to be fixed
        if (hasattr(competition, 'max_participants') or 'max_participants' in competition) and competition.max_participants and competition.participants.count()>=competition.max_participants:
            return Response({"error": "Maximum number of participants reached."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if action == "add":
                competition.participants.add(user)
            elif action == "remove":
                competition.participants.remove(user)
            return Response({"success": f"User {action}ed successfully {'from' if action=='remove' else 'to'} competition"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def delete(self, request):

        if not request.user.is_admin:
            return Response({"error": "Only admin users are authorized to delete competitions"},
                            status=status.HTTP_401_UNAUTHORIZED)

        try:
            id = request.query_params.get('id')
            if id is None:
                return Response({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

            competition = get_object_or_404(Competition, id=id)
            competition.delete()
            return Response({"message": "Competition deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        # Check if the user is an admin
        if not request.user.is_admin:
            return Response({"error": "Only admin users are authorized to create competitions"},
                            status=status.HTTP_401_UNAUTHORIZED)

        serializer = CompetitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CompetitionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.is_admin:
            return Response({"error": "Only admin users are authorized to see all competitions"},
                            status=status.HTTP_401_UNAUTHORIZED)

        try:
            competitions = Competition.objects.all()
            serializer = CompetitionSerializer(competitions, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AllIntegralSeriesView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        series = IntegralsSeries.objects.all().values('pk', 'name')
        return Response(series)



class IntegralSeriesView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, pk=None):
        if pk:
            try:
                series = IntegralsSeries.objects.get(pk=pk)
                serializer = IntegralSeriesSerializer(series)
                return Response(serializer.data)
            except IntegralsSeries.DoesNotExist:
                return Response({'error': 'Integral series not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            series = IntegralsSeries.objects.all()
            serializer = IntegralSeriesSerializer(series, many=True)
            return Response(serializer.data)


    def post(self, request):
        serializer = IntegralSeriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, pk):
        series = IntegralsSeries.objects.get(pk=pk)
        serializer = IntegralSeriesSerializer(series, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        series = IntegralsSeries.objects.get(pk=pk)
        series.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IntegralView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk=None):
        if pk:
            integral = Integral.objects.get(pk=pk)
            serializer = IntegralSerializer(integral)
        else:
            integrals = Integral.objects.all()
            serializer = IntegralSerializer(integrals, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = IntegralSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, pk):
        integral = Integral.objects.get(pk=pk)
        serializer = IntegralSerializer(integral, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        integral = Integral.objects.get(pk=pk)
        integral.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class IntegralSolutionView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk=None):
        if pk:
            solution = IntegralSolution.objects.get(pk=pk)
            serializer = IntegralSolutionSerializer(solution)
        else:
            solutions = IntegralSolution.objects.all()
            serializer = IntegralSolutionSerializer(solutions, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = IntegralSolutionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, pk):
        solution = IntegralSolution.objects.get(pk=pk)
        serializer = IntegralSolutionSerializer(solution, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        solution = IntegralSolution.objects.get(pk=pk)
        solution.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
