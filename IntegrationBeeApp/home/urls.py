
from django.urls import path
from .views import NewsPostAPIViewSet, CompetitionAPIViewSet

urlpatterns = [
    path('news-post/', NewsPostAPIViewSet.as_view({'get': 'list'}), name='news-post-list'),
    path('competition-post/', CompetitionAPIViewSet.as_view({'get': 'list'}), name='competition-post-list'),
]
