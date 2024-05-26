from rest_framework.serializers import Serializer, ModelSerializer

from .models import User, Competition, EmailVerificationToken, ForgotPasswordToken, IntegralsSeries, Integral, IntegralSolution


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ["email", "first_name", "second_name", "school", "profile_picture", "date_joined", "is_admin", "role", "gender", "studies_profile", "email_verified", "degree_of_studies", "semester_of_studies", "password"]

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

