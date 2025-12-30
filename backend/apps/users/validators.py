from rest_framework import serializers
from django.contrib.auth import get_user_model
import re

User = get_user_model()


def validate_password(value):
    if not re.search(r"\d", value):
        raise serializers.ValidationError("Password must contain at least one digit.")

    if not re.search(r"[A-Z]", value):
        raise serializers.ValidationError(
            "Password must contain at least one uppercase letter."
        )

    if not re.search(r"[a-z]", value):
        raise serializers.ValidationError(
            "Password must contain at least one lowercase letter."
        )

    if not re.search(r"[!@#$%^&*]", value):
        raise serializers.ValidationError(
            "Password must contain at least one special charecter."
        )

    return value


def validate_username(value):
    if not re.match(r"^[A-Za-z]", value):
        raise serializers.ValidationError("Username must start with a letter.")

    if not re.match(r"^[A-Za-z0-9_]+$", value):
        raise serializers.ValidationError(
            "Only letters, numbers and underscore allowed."
        )

    if User.objects.filter(username=value).exists():
        raise serializers.ValidationError("This username is already taken.")

    return value


def validate_email(value):
    if User.objects.filter(email=value).exists():
        raise serializers.ValidationError("This email was already taken.")

    return value
