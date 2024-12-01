from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import RegisterView, UserDataView, CompetitionView, VerifyEmailView, DownloadLatexPdfReportView, \
    DownloadLatexTexReportView, DownloadParticipantsCsvView, GenerateBracketView, UpdateUserView, \
    PasswordResetConfirmView, RequestPasswordResetView, CompetitionListView, CompetitionSeriesDetailView, CompetitionTieBreakersView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name="sign_up"),
    path('request-password-reset/', RequestPasswordResetView.as_view(), name='request_password_reset'),
    path('reset-password-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('userData/', UserDataView.as_view(), name="user_data"),
    path('competition/<int:pk>/', CompetitionView.as_view(), name='competition_detail'),
    path('verifyemail/', VerifyEmailView.as_view(), name="verify_email"),
    path('contestReport/<int:pk>/download_pdf/', DownloadLatexPdfReportView.as_view(), name='download_pdf'),
    path('contestReport/<int:pk>/download_tex/', DownloadLatexTexReportView.as_view(), name='download_tex'),
    path('participantsReport/<int:pk>/download_csv/', DownloadParticipantsCsvView.as_view(), name='download_csv'),
    path('contestBracket/<int:pk>/generate/', GenerateBracketView.as_view(), name='generate_bracket'),
    path('updateUser/', UpdateUserView.as_view(), name="update_user"),
    path('competitions/', CompetitionListView.as_view(), name='competition_list'),
    path('competitions/<int:competition_id>/series/<str:series_id>/', CompetitionSeriesDetailView.as_view(), name='competition_series_detail'),
    path('competitions/<int:competition_id>/tie-breakers/', CompetitionTieBreakersView.as_view(), name='competition_tie_breakers'),
]
