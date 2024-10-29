
from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (RegisterView, UserDataView, CompetitionView, VerifyEmailView, download_latex_pdf_report_view,
                    download_latex_tex_report_view, generate_bracket_view, UpdateUserView)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name="sign_up"),
    path('userData/', UserDataView.as_view(), name="user_data"),
    path('competition/<int:pk>/', CompetitionView.as_view(), name='competition_detail'),
    path('verifyemail/', VerifyEmailView.as_view(), name="verify_email"),
    path('contestReport/<int:pk>/download_pdf/', download_latex_pdf_report_view, name='download_pdf'),
    path('contestReport/<int:pk>/download_tex/', download_latex_tex_report_view, name='download_tex'),
    path('contestBracket/<int:pk>/generate/', generate_bracket_view, name='generate_bracket'),
    path('updateUser/', UpdateUserView.as_view(), name="update_user"),
]
