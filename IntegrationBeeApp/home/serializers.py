# api/serializers.py
from pprint import pprint

from rest_framework import serializers
from .models import NewsPost, CompetitionPost

from rest_framework import serializers
from wagtail.images import get_image_model_string
from .models import NewsPost  # Ensure you import your NewsPost model


class NewsPostSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta:
        model = NewsPost
        fields = ['id', 'header', 'text', 'picture']

    @staticmethod
    def get_picture(obj):
        if obj.picture:
            return obj.picture.get_rendition('width-600').full_url
        return None


class CompetitionSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta:
        model = CompetitionPost
        fields = ['id', 'header', 'short_description', 'description', 'event_date', 'place',
                  'place_maps_url', 'picture', 'competition',
                  'rules']

    @staticmethod
    def get_picture(obj):
        if obj.picture:
            return obj.picture.get_rendition('width-600').full_url
        return None
