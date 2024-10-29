# api/serializers.py
from pprint import pprint

from rest_framework import serializers

from api.serializers import CompetitionSerializer, CompetitionListSerializer
from .models import NewsPost, CompetitionPost

from rest_framework import serializers
from wagtail.images import get_image_model_string
from .models import NewsPost  # Ensure you import your NewsPost model


class NewsPostSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    class Meta:
        model = NewsPost
        fields = ['id', 'title', 'text', 'picture']

    @staticmethod
    def get_picture(obj):
        if obj.picture:
            return obj.picture.get_rendition('width-600').full_url
        return None


class CompetitionPostSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    competition = CompetitionListSerializer()

    class Meta:
        model = CompetitionPost
        fields = ['id', 'title', 'edition', 'short_description', 'place',
                  'picture', 'competition']

    @staticmethod
    def get_picture(obj):
        if obj.picture:
            return obj.picture.get_rendition('width-600').full_url
        return None
