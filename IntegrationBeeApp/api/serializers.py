from rest_framework.serializers import Serializer, ModelSerializer

from .models import User, Competition



class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "school", "profile_picture", "date_joined"]

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            school=validated_data["school"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class CompetitionSerializer(ModelSerializer):
    participants = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Competition
        fields = ('id', 'name', 'participants')
