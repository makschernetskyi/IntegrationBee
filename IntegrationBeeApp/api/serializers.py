from rest_framework.serializers import Serializer, ModelSerializer

from .models import User, Competition, EmailVerificationToken, ForgotPasswordToken, UserToCompetitionRelationship, \
    Round, Match

from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = [
            "email", "first_name", "last_name", "institution", "phone_number",
            "is_verified", "is_superuser", "password", 'program_of_study'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            institution=validated_data.get("institution", ""),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, user, validated_data):
        user.institution = validated_data.get("institution", user.institution)
        user.phone_number = validated_data.get("phone_number", user.phone_number)
        user.program_of_study = validated_data.get("program_of_study", user.program_of_study)
        user.save()
        return user


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


class CompetitionSerializer(ModelSerializer):
    rounds = RoundSerializer(many=True, read_only=True)

    class Meta:
        model = Competition
        fields = ['id', 'name', 'max_participants', 'event_date', 'rounds']


class CompetitionListSerializer(ModelSerializer):
    class Meta:
        model = Competition
        fields = ['event_date', 'close_registration']


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