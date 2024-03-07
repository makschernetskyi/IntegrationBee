from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator

from .serializers import UserSerializer




class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):



        return Response({
            'email': request.user.email,
            'first_name': request.user.first_name,
            'second_name': request.user.second_name,
            'school': request.user.school,
            'profile_picture': request.user.profile_picture or None,
            'date_joined': request.user.date_joined
        })
