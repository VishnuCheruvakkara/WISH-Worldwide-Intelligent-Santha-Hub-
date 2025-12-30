from rest_framework import serializers
from .models import GalleryItem

class GalleryItemSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = GalleryItem
        fields = ['id', 'user', 'username', 'image_url', 'caption', 'created_at']
        read_only_fields = ['user', 'created_at']
