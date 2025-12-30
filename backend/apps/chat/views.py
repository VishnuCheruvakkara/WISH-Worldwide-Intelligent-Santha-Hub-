import logging
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
import google.generativeai as genai
from .models import ChatMessage
from .serializers import ChatMessageSerializer
logger = logging.getLogger(__name__)

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel(
    model_name="gemini-pro",
    system_instruction=(
        "You are Santa Claus. "
        "You are kind, warm, playful, and encouraging. "
        "Reply like Santa, in short friendly messages. "
        "Use emojis like 🎅🎄🎁✨. Keep it magical!"
    )
)


def get_santa_ai_response(user_message):
    try:

        response = model.generate_content(user_message)

        if response and hasattr(response, "text"):
            return response.text.strip()

        logger.warning("Gemini returned empty response")
        return "Ho ho ho! Santa lost the message in the snow 🎅"

    except Exception as e:
        logger.exception("Gemini AI error")
        return "Ho ho ho! Santa is fixing something at the North Pole 🎄"

class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None  # Disable pagination for chat to load all messages

    def get_queryset(self):
        if self.request.user.is_staff:
            return ChatMessage.objects.all().order_by("timestamp")
        return ChatMessage.objects.filter(
            user=self.request.user
        ).order_by("timestamp")

    def perform_create(self, serializer):
        user_msg = serializer.save(
            user=self.request.user,
            is_from_santa=False
        )

        santa_response_content = get_santa_ai_response(user_msg.content)

        ChatMessage.objects.create(
            user=self.request.user,
            content=santa_response_content,
            is_from_santa=True
        )

    @action(detail=False, methods=["get"], permission_classes=[permissions.IsAdminUser])
    def all_users_chats(self, request):
        from django.contrib.auth import get_user_model
        User = get_user_model()

        users_with_chats = User.objects.filter(
            chat_messages__isnull=False
        ).distinct()

        data = []
        for user in users_with_chats:
            last_message = ChatMessage.objects.filter(
                user=user
            ).latest("timestamp")

            data.append({
                "user_id": user.id,
                "username": user.username,
                "last_message": last_message.content,
                "last_timestamp": last_message.timestamp,
            })

        return Response(data)

    @action(detail=True, methods=["get"], permission_classes=[permissions.IsAdminUser])
    def user_chat_history(self, request, pk=None):
        messages = ChatMessage.objects.filter(
            user_id=pk
        ).order_by("timestamp")

        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)
