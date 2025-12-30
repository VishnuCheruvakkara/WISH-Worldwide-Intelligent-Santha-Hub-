from rest_framework import serializers
from django.contrib.auth import get_user_model
from .validators import validate_password, validate_username, validate_email
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, min_length=6, max_length=20, validators=[validate_password]
    )
    username = serializers.CharField(
        min_length=3, max_length=20, validators=[validate_username]
    )
    email = serializers.EmailField(required=True, validators=[validate_email])

    class Meta:
        model = User
        fields = ["email", "username", "password"]


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "date_joined",
            "is_active",
        ]


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        """
        Override default validation to REMOVE SimpleJWT's automatic
        inactive user blocking.
        """
        refresh = RefreshToken(attrs["refresh"])

        data = {
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }

        return data
