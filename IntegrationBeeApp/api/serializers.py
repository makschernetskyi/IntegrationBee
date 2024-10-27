from rest_framework.serializers import Serializer, ModelSerializer

from .models import User, Competition, EmailVerificationToken, ForgotPasswordToken, IntegralsSeries, Integral, IntegralSolution


from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "email", "first_name", "last_name", "institution", "profile_picture",
            "date_joined", "is_admin", "is_verified", "is_superuser",
            "phone_number", "emergency_phone_number", "name_pronunciation",
            "program_of_study", "date_of_birth", "additional_info", "password"
        ]

    def create(self, validated_data):

        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            institution=validated_data.get("institution", ""),
            phone_number=validated_data.get("phone_number", ""),
            emergency_phone_number=validated_data.get("emergency_phone_number", ""),
            name_pronunciation=validated_data.get("name_pronunciation", ""),
            program_of_study=validated_data.get("program_of_study", ""),
            date_of_birth=validated_data.get("date_of_birth", None),
            additional_info=validated_data.get("additional_info", "")
        )
        print(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, user, validated_data):
        user.institution = validated_data.get("institution", user.institution)
        user.phone_number = validated_data.get("phone_number", user.phone_number)
        user.emergency_phone_number = validated_data.get("emergency_phone_number", user.emergency_phone_number)
        user.name_pronunciation = validated_data.get("name_pronunciation", user.name_pronunciation)
        user.program_of_study = validated_data.get("program_of_study", user.program_of_study)
        user.date_of_birth = validated_data.get("date_of_birth", user.date_of_birth)
        user.additional_info = validated_data.get("additional_info", user.additional_info)

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





class IntegralSolutionSerializer(ModelSerializer):
    class Meta:
        model = IntegralSolution
        fields = '__all__'


class IntegralSerializer(ModelSerializer):
    solution = IntegralSolutionSerializer(read_only=True)

    class Meta:
        model = Integral
        fields = '__all__'

    def create(self, validated_data):
        solution_data = validated_data.pop('solution', None)
        integral = Integral.objects.create(**validated_data)
        if solution_data:
            solution = IntegralSolution.objects.create(**solution_data)
            integral.solution = solution
            integral.save()
        return integral


class IntegralSeriesSerializer(ModelSerializer):
    integrals = IntegralSerializer(many=True, read_only=True)

    class Meta:
        model = IntegralsSeries
        fields = '__all__'

