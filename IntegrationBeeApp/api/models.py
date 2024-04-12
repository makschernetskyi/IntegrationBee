from django.db import models

from django.contrib.auth.models import AbstractUser, BaseUserManager



class UserManager(BaseUserManager):

    use_in_migration = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is Required')

        if extra_fields['first_name'] == 'Eva' and extra_fields['second_name'] == 'Luo':
            extra_fields['first_name'] = 'Bitch'
            extra_fields['second_name'] = 'Bitch'

        user = self.model(email=self.normalize_email(email), username=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(email, password, **extra_fields)



class User(AbstractUser):
    email = models.EmailField(unique=True, null=False, blank=False)
    first_name = models.CharField(max_length=50, null=False, blank=False)
    second_name = models.CharField(max_length=50, null=False, blank=False)
    school = models.CharField(max_length=100, null=True, blank=True)


    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    profile_picture = models.ImageField(upload_to="user_pictures/profile_pictures/", blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'second_name']

    def __str__(self):
        return f"{self.email} - {self.first_name} {self.second_name}"


class Competition(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    max_participants = models.IntegerField(null=True, blank=True)
    participants = models.ManyToManyField(User, through="UserToCompetitionRelationship", related_name='competitions')

    def __str__(self):
        return self.name


class UserToCompetitionRelationship(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    registration_date = models.DateField()
    status = models.TextField(null=True, blank=True)  # winner semifinalist finalist or competitor


