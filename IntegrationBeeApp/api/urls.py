from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import RegisterView, UserDataView, CompetitionView, VerifyEmailView, DownloadLatexPdfReportView, \
    DownloadLatexTexReportView, DownloadParticipantsCsvView, GenerateBracketView, UpdateUserView, \
    PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name="sign_up"),
    path('resetpassword/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('resetpassword/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('userData/', UserDataView.as_view(), name="user_data"),
    path('competition/<int:pk>/', CompetitionView.as_view(), name='competition_detail'),
    path('verifyemail/', VerifyEmailView.as_view(), name="verify_email"),
    path('contestReport/<int:pk>/download_pdf/', DownloadLatexPdfReportView.as_view(), name='download_pdf'),
    path('contestReport/<int:pk>/download_tex/', DownloadLatexTexReportView.as_view(), name='download_tex'),
    path('participantsReport/<int:pk>/download_csv/', DownloadParticipantsCsvView.as_view(), name='download_csv'),
    path('contestBracket/<int:pk>/generate/', GenerateBracketView.as_view(), name='generate_bracket'),
    path('updateUser/', UpdateUserView.as_view(), name="update_user"),
]
