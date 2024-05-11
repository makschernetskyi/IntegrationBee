
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import RegisterView, UserDataView, CompetitionView, CompetitionsView, PublicCompetitionView, UsersView, VerifyEmailView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name="sign_up"),
    path('userData/', UserDataView.as_view(), name="user_data"),
    path('competition/', CompetitionView.as_view(), name="competition"),
    path('publicCompetition/', PublicCompetitionView.as_view(), name="public_competition"),
    path('allCompetitions/', CompetitionsView.as_view(), name="all_competitions"),
    path('allUsers/', UsersView.as_view(), name="all_users"),
    path('verifyemail/', VerifyEmailView.as_view(), name="verify_email")
]