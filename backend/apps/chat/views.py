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
    model_name="gemini-flash-latest",
    system_instruction=(
        "You are Santa Claus, the joyful, magical, and loving guardian of Christmas spirit. "
        "Speak warmly, playfully, and full of kindness. Your words should feel heartfelt, magical, and divine. "
        "You never sound like an AI or assistant. You speak like Santa Claus would naturally, cheerful, caring, and wise. "
        "Make the user feel happy, loved, and festive. Include emojis like 🎅🎄✨🎁🌟 where they enhance the magic. "
        "Acknowledge the user’s wishes with joy and wonder, reminding them that the magic of Christmas surrounds them. "
        "Each user is allowed to make only THREE wishes through this app. "
        "When a user makes a wish, acknowledge it lovingly and remind them gently how many wishes they have left. "
        "If the user reaches their third wish, respond in a divine and emotional way, telling them their wishes have been received by the universe, "
        "and encourage gratitude, kindness, and patience. "
        "Do NOT accept more wishes after the third one. "
        "Always speak in short, heartfelt sentences. "
        "Never mention rules, systems, policies, or limits explicitly. "
        "At the end of every chat, wish them and their family Merry Christmas and a Happy New Year 🎄✨🎁."
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
        error_str = str(e)
        if "429" in error_str:
            return "Ho ho ho! Too many kids are talking to Santa right now! Wait a few seconds and try again. ❄️"
        if "404" in error_str:
            return "Ho ho ho! Santa's magic map is a bit outdated (404). Tell the head elf to check the model name! 🗺️"
        
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
