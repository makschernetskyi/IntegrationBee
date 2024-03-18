from django.shortcuts import render, get_object_or_404
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from .serializers import UserSerializer, CompetitionSerializer
from .models import Competition, User

from home.models import Competition as CompetitionPage




class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


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

            return Response({
                'email': user_serializer.data.get('email'),
                'first_name': user_serializer.data.get('first_name'),
                'second_name': user_serializer.data.get('second_name'),
                'school': user_serializer.data.get('school'),
                'profile_picture': user_serializer.data.get('profile_picture'),
                'date_joined': user_serializer.data.get('date_joined'),
                'is_admin': user_serializer.data.get('is_admin'),
                'competitions': competitions_data
            })
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



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
        competitition_id = request.data.get('id')
        if competitition_id is None:
            return Response({"error": "Competition ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        action = request.data.get('action')
        if action not in ("add", "remove"):
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        competition = get_object_or_404(Competition, id=competitition_id)
        user = request.user

        try:
            if action == "add":
                competition.participants.add(user)
            elif action == "remove":
                competition.participants.remove(user)
            return Response({"success": f"User {action}ed successfully {'from' if action=='remove' else 'to'} competition"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def delete(self, request):
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
        try:
            competitions = Competition.objects.all()
            serializer = CompetitionSerializer(competitions, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

