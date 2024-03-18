from django.shortcuts import render, get_object_or_404
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from .serializers import UserSerializer, CompetitionSerializer
from .models import Competition, User




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

            return Response({
                'email': user_serializer.data.get('email'),
                'first_name': user_serializer.data.get('first_name'),
                'second_name': user_serializer.data.get('second_name'),
                'school': user_serializer.data.get('school'),
                'profile_picture': user_serializer.data.get('profile_picture'),
                'date_joined': user_serializer.data.get('date_joined'),
                'competitions': competition_serializer.data
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
            return Response({"success": f"User {action}ed successfully from competition"}, status=status.HTTP_200_OK)
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

class CompetitionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            competitions = Competition.objects.all()
            serializer = CompetitionSerializer(competitions, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

