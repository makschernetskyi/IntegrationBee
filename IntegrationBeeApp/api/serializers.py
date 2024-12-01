from pprint import pprint

from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import Serializer, ModelSerializer

from .models import User, Competition, EmailVerificationToken, ForgotPasswordToken, UserToCompetitionRelationship, \
    Round, Match
from rest_framework import serializers
from .models import User


from wagtail.users.models import UserProfile as WagtailUserProfile


class CompetitionUserSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    page_id = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = ['id', 'name', 'event_date_start', 'event_date_end', 'status', 'page_id']

    def get_status(self, obj):
        user = self.context['user']
        try:
            relationship = UserToCompetitionRelationship.objects.get(user=user, competition=obj)
            return relationship.get_status_display()
        except UserToCompetitionRelationship.DoesNotExist:
            return None

    def get_page_id(self, obj):
        return obj.competition_page.id if hasattr(obj, 'competition_page') else None


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False, allow_null=True)
    competitions = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "institution",
            "phone_number",
            "is_verified",
            "is_superuser",
            "password",
            "program_of_study",
            "profile_picture",
            "competitions",
            "role",
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'is_verified': {'read_only': True},
            'is_superuser': {'read_only': True},
        }

    def get_role(self, obj):
        return obj.role

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        try:
            profile = instance.wagtail_userprofile
            if profile.avatar:
                request = self.context.get('request', None)
                avatar_url = profile.avatar.url
                if request is not None:
                    avatar_url = request.build_absolute_uri(avatar_url)
                ret['profile_picture'] = avatar_url
            else:
                ret['profile_picture'] = None
        except WagtailUserProfile.DoesNotExist:
            ret['profile_picture'] = None

        # Add competitions data
        ret['competitions'] = self.get_competitions(instance)

        return ret

    def get_competitions(self, obj):
        relationships = UserToCompetitionRelationship.objects.filter(user=obj)
        competitions = [relationship.competition for relationship in relationships]
        serializer = CompetitionUserSerializer(competitions, many=True, context={'user': obj})
        return serializer.data

    def create(self, validated_data):
        profile_picture = validated_data.pop('profile_picture', None)
        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            institution=validated_data.get("institution", ""),
        )
        user.set_password(validated_data["password"])
        user.save()

        if profile_picture:
            profile, created = WagtailUserProfile.objects.get_or_create(user=user)
            profile.avatar = profile_picture
            profile.save()
        return user

    def update(self, instance, validated_data):
        profile_picture = validated_data.pop('profile_picture', None)

        instance.institution = validated_data.get("institution", instance.institution)
        instance.phone_number = validated_data.get("phone_number", instance.phone_number)
        instance.program_of_study = validated_data.get("program_of_study", instance.program_of_study)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.save()

        profile, created = WagtailUserProfile.objects.get_or_create(user=instance)
        if profile_picture is not None:
            profile.avatar = profile_picture
            profile.save()
        return instance


class UserToCompetitionRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToCompetitionRelationship
        fields = [
            'emergency_phone_number', 'name_pronunciation', 'additional_info'
        ]

    def create(self, validated_data):
        user = self.context['user']
        competition = self.context['competition']
        validated_data['user'] = user
        validated_data['competition'] = competition
        validated_data['status'] = 'PENDING_REQUEST'

        relationship, created = UserToCompetitionRelationship.objects.get_or_create(
            user=user,
            competition=competition,
            defaults=validated_data
        )
        if not created:
            raise serializers.ValidationError('User is already registered for this competition.')
        return relationship


class EmailVerificationTokenSerializer(ModelSerializer):
    User = UserSerializer(read_only=True, many=False)
    class Meta:
        model = EmailVerificationToken
        fields = ("User", "token", "date_created")


class ForgotPasswordTokenSerializer(ModelSerializer):
    User = UserSerializer(read_only=True, many=False)
    class Meta:
        model = ForgotPasswordToken
        fields = ("User", "token", "date_created")


class MatchSerializer(ModelSerializer):
    player1 = serializers.SerializerMethodField()
    player2 = serializers.SerializerMethodField()
    match_winner = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = ['id', 'player1', 'player2', 'match_winner', 'sort_order']

    @staticmethod
    def get_player1(obj):
        if obj.player1:
            return f"{obj.player1.first_name.title()[:1]}. {obj.player1.last_name.title()}."
        return None

    @staticmethod
    def get_player2(obj):
        if obj.player2:
            return f"{obj.player2.first_name.title()[:1]}. {obj.player2.last_name.title()}."
        return None

    def get_match_winner(self, obj):
        if obj.match_winner == "player1":
            return self.get_player1(obj)

        if obj.match_winner == "player2":
            return self.get_player2(obj)

        return None


class RoundSerializer(ModelSerializer):
    matches = serializers.SerializerMethodField()

    class Meta:
        model = Round
        fields = ['id', 'name', 'matches']

    @staticmethod
    def get_matches(obj):
        matches = obj.matches.all().order_by('sort_order')
        return MatchSerializer(matches, many=True).data


class CompetitionSerializer(serializers.ModelSerializer):
    series = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = ['id', 'name', 'series']

    def get_series(self, obj):
        series_list = []
        for series_block in obj.series:
            # Each series_block is a StructValue
            integrals_list = []
            for integral_block in series_block.value['integrals']:
                integral_data = {
                    'id': str(integral_block.id),
                    'integral': integral_block.value.get('integral', ''),
                    'integral_answer': integral_block.value.get('integral_answer', ''),
                    'original_author': integral_block.value.get('original_author', ''),
                }
                integrals_list.append(integral_data)
            series_data = {
                'id': str(series_block.id),
                'series_name': series_block.value.get('series_name', ''),
                'integrals': integrals_list,
            }
            series_list.append(series_data)
        return series_list


class SeriesListSerializer(serializers.Serializer):
    id = serializers.CharField()
    series_name = serializers.CharField()

class CompetitionListSerializer(serializers.ModelSerializer):
    series = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = ['id', 'name', 'series']

    def get_series(self, obj):
        series_list = []
        for series_block in obj.series:
            series_data = {
                'id': str(series_block.id),
                'series_name': series_block.value.get('series_name', ''),
            }
            series_list.append(series_data)
        return series_list

class LocationSerializer(serializers.ModelSerializer):
    # Define fields for latitude and longitude
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()

    class Meta:
        fields = [
            "latitude",
            "longitude",
        ]

    def get_latitude(self, obj):
        # Split the location string by comma and return the latitude part
        try:
            return obj.location.split(",")[0].strip()
        except (AttributeError, IndexError):
            return None

    def get_longitude(self, obj):
        # Split the location string by comma and return the longitude part
        try:
            return obj.location.split(",")[1].strip()
        except (AttributeError, IndexError):
            return None



class IntegralSerializer(serializers.Serializer):
    id = serializers.CharField()
    integral = serializers.CharField(required=False, allow_blank=True)
    integral_answer = serializers.CharField(required=False, allow_blank=True)
    original_author = serializers.CharField(required=False, allow_blank=True)

class SeriesSerializer(serializers.Serializer):
    id = serializers.CharField()
    series_name = serializers.CharField()
    integrals = IntegralSerializer(many=True)
