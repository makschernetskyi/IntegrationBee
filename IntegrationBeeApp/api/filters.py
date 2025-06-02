# filters.py
import django_filters
from .models import User


class UserEloFilter(django_filters.FilterSet):
    region = django_filters.CharFilter(field_name='region', lookup_expr='icontains')
    institution = django_filters.CharFilter(field_name='institution', lookup_expr='icontains')

    class Meta:
        model = User
        fields = ['region', 'institution']
