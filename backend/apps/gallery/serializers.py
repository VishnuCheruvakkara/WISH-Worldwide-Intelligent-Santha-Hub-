from rest_framework import serializers
from .models import GalleryItem

class GalleryItemSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    caption = serializers.CharField(max_length=200, required=True)

    class Meta:
        model = GalleryItem
        fields = ['id', 'user', 'username', 'image_url', 'caption', 'created_at']
        read_only_fields = ['user', 'created_at']

    def validate_caption(self, value):
        if len(value) > 200:
            raise serializers.ValidationError("Caption must be under 200 characters.")
        return value
