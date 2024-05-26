
from django.urls import re_path

from .views import admin_page

urlpatterns = [
    re_path(r'^', admin_page, name='admin_page'),
]
