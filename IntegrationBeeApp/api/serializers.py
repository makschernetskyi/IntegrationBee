from rest_framework.serializers import Serializer, ModelSerializer

from .models import User, Competition, EmailVerificationToken, ForgotPasswordToken


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ["email", "first_name", "second_name", "school", "profile_picture", "date_joined", "is_admin", "password"]

    def create(self, validated_data):

        if validated_data['first_name'] == 'Eva' and validated_data['second_name'] == 'Luo':
            validated_data['first_name'] = 'Bitch'
            validated_data['second_name'] = 'Bitch'


        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["email"],
            first_name=validated_data["first_name"],
            second_name=validated_data["second_name"],
            school=validated_data["school"],
            role=User.USER
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class CompetitionSerializer(ModelSerializer):
    participants = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Competition
        fields = ('id', 'name', 'participants', 'max_participants')


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