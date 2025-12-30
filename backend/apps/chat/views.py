from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ChatMessage
from .serializers import ChatMessageSerializer
import random

# Mock AI Santa Response for now
# In a real scenario, you'd integrate Gemini API here
def get_santa_ai_response(user_message):
    santa_phrases = [
        "Ho ho ho! That's a wonderful thought, my dear!",
        "The North Pole is very busy, but I always have time for you!",
        "Have you been kind to others today? That's what really matters to Santa.",
        "I'll talk to the elves about that! They love hearing from you.",
        "Remember to leave some cookies out! Ho ho ho!",
        "Your heart is as bright as a Christmas star!",
    ]
    return random.choice(santa_phrases)

class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users only see their own chat
        if self.request.user.is_staff:
            return ChatMessage.objects.all()
        return ChatMessage.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Save user message
        user_msg = serializer.save(user=self.request.user, is_from_santa=False)
        
        # Generate Santa's response
        santa_response_content = get_santa_ai_response(user_msg.content)
        
        # Create Santa's message in DB
        ChatMessage.objects.create(
            user=self.request.user,
            content=santa_response_content,
            is_from_santa=True
        )

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAdminUser])
    def all_users_chats(self, request):
        # Santa (Admin) can see chats grouped by user
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        users_with_chats = User.objects.filter(chat_messages__isnull=False).distinct()
        data = []
        for user in users_with_chats:
            last_message = ChatMessage.objects.filter(user=user).latest('timestamp')
            data.append({
                'user_id': user.id,
                'username': user.username,
                'last_message': last_message.content,
                'last_timestamp': last_message.timestamp
            })
            
        return Response(data)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAdminUser])
    def user_chat_history(self, request, pk=None):
        # Admin can view a specific user's chat history
        messages = ChatMessage.objects.filter(user_id=pk)
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)
