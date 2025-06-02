import json
from pprint import pprint

from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import Serializer, ModelSerializer

from .models import User, Competition, EmailVerificationToken, ForgotPasswordToken, UserToCompetitionRelationship, \
    Round, Match, DailyIntegral, DailyIntegralToUserRelationship
from rest_framework import serializers
from .models import User


from wagtail.users.models import UserProfile as WagtailUserProfile


class CompetitionUserSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    page_id = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        fields = [
            'id',
            'name',
            'event_date_start',
            'event_date_end',
            'status',
            'page_id',
            # Include any other fields needed
        ]

    def get_status(self, obj):
        user = self.context.get('user')
        if user:
            try:
                relationship = UserToCompetitionRelationship.objects.get(user=user, competition=obj)
                return relationship.get_status_display()
            except UserToCompetitionRelationship.DoesNotExist:
                return None
        return None

    def get_page_id(self, obj):
        return obj.competition_page.id if hasattr(obj, 'competition_page') else None


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False, allow_null=True)
    competitions = serializers.SerializerMethodField()
    role = serializers.JSONField(read_only=True)

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
            "role",  # Added 'role' to the fields
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'is_verified': {'read_only': True},
            'is_superuser': {'read_only': True},
        }

    def get_competitions(self, obj):
        relationships = UserToCompetitionRelationship.objects.filter(user=obj)
        competitions_data = []
        for relationship in relationships:
            competition = relationship.competition
            competitions_data.append({
                'id': competition.id,
                'name': competition.name,
                'event_date_start': competition.event_date_start,
                'event_date_end': competition.event_date_end,
                'status': relationship.get_status_display(),
                # Include other necessary fields if needed
            })
        return competitions_data

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

        # 'competitions' field is already populated via get_competitions
        return ret

    # The rest of the methods remain unchanged
    def create(self, validated_data):
        profile_picture = validated_data.pop('profile_picture', None)
        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            institution=validated_data.get("institution", ""),
            phone_number=validated_data.get("phone_number", ""),
            program_of_study=validated_data.get("program_of_study", ""),
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

        if profile_picture is not None:
            profile, created = WagtailUserProfile.objects.get_or_create(user=instance)
            profile.avatar = profile_picture
            profile.save()
        return instance


class UserToCompetitionRelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToCompetitionRelationship
        fields = [
            'emergency_phone_number', 'name_pronunciation', 'additional_info',
            'phone_number', 'program_of_study'
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
    rounds = RoundSerializer(many=True, read_only=True)
    users_count = SerializerMethodField()

    class Meta:
        model = Competition
        fields = [
            'id',
            'name',
            'max_participants',
            'event_date_start',
            'rounds',
            'event_date_end',
            'close_registration',
            'series',
            'users_count',
            # Include any other fields needed
        ]

    def get_users_count(self, obj):
        return obj.participants_relationships.count()

    def get_series(self, obj):
        series_list = []
        for series_block in obj.series:
            series_data = {
                'id': str(series_block.id),
                'series_name': series_block.value.get('series_name', ''),
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
        fields = ['id', 'name', 'series', 'event_date_start', 'event_date_end', 'close_registration']

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


class UserEloSerializer(serializers.ModelSerializer):
    elo_rating = serializers.SerializerMethodField()  # Use skewed rating for display

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'elo_rating',  # Changed from ranking_elo to elo_rating
            'institution',
            'region',
        ]
    
    def get_elo_rating(self, obj):
        """Return the display rating using the skew function"""
        from api.elo_utils import get_display_rating
        return get_display_rating(obj.ranking_elo)


class UserGymRankingSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'first_name',
            'last_name',
            'ranking_gym',
            'institution',
            'region',
        ]


class DailyIntegralSerializer(serializers.ModelSerializer):
    user_solved = serializers.SerializerMethodField()
    user_attempts = serializers.SerializerMethodField()
    
    class Meta:
        model = DailyIntegral
        fields = ['id', 'integral', 'date', 'difficulty_level', 'original_author', 'user_solved', 'user_attempts']
    
    def get_user_solved(self, obj):
        user = self.context['request'].user
        try:
            rel = DailyIntegralToUserRelationship.objects.get(user=user, integral=obj)
            return rel.solved
        except DailyIntegralToUserRelationship.DoesNotExist:
            return False
    
    def get_user_attempts(self, obj):
        user = self.context['request'].user
        try:
            rel = DailyIntegralToUserRelationship.objects.get(user=user, integral=obj)
            return rel.attempts
        except DailyIntegralToUserRelationship.DoesNotExist:
            return 0

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        integral_data = json.loads(representation['integral'])
        if integral_data and isinstance(integral_data, list):
            representation['integral'] = integral_data[0].get('value', '') if 'value' in integral_data[0] else ''
        return representation


class DailyIntegralSolveSerializer(serializers.Serializer):
    user_answer = serializers.CharField()