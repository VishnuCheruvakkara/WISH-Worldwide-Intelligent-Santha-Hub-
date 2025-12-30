from rest_framework import serializers
from .models import Wish

from django.contrib.auth import get_user_model

User = get_user_model()

class WishSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    status = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Wish
        fields = ['id', 'user_username', 'content', 'is_granted', 'status', 'created_at']
        read_only_fields = ['id', 'created_at', 'user_username']

    def validate(self, attrs):
        user = self.context['request'].user
        if Wish.objects.filter(user=user).count() >= 3:
            raise serializers.ValidationError("You can only make 3 wishes.")
        return attrs

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def get_status(self, obj):
        # Map boolean field to a human-friendly status string.
        return 'Granted' if obj.is_granted else 'Pending'

class UserWishesSerializer(serializers.ModelSerializer):
    wishes = WishSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'wishes']
