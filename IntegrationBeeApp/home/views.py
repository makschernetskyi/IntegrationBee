# api/views.py
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin

from .models import NewsPost, CompetitionPost
from .serializers import NewsPostSerializer, CompetitionPostSerializer
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from wagtail.api.v2.views import PagesAPIViewSet
from .models import NewsPost
from .serializers import NewsPostSerializer


class NewsPostPagination(PageNumberPagination):
    page_size = 10


class NewsPostAPIViewSet(ListModelMixin, GenericViewSet):
    queryset = NewsPost.objects.all()
    serializer_class = NewsPostSerializer
    pagination_class = NewsPostPagination


class CompetitionPagination(PageNumberPagination):
    page_size = 3


class CompetitionAPIViewSet(ListModelMixin, GenericViewSet):
    queryset = CompetitionPost.objects.all()
    serializer_class = CompetitionPostSerializer
    pagination_class = CompetitionPagination

