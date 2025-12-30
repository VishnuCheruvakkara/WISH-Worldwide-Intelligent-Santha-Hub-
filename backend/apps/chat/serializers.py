from rest_framework import serializers
from .models import ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'user', 'username', 'email', 'content', 'is_from_santa', 'timestamp']
        read_only_fields = ['user', 'timestamp']
