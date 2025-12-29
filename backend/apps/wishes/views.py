from rest_framework import viewsets, permissions
from .models import Wish
from .serializers import WishSerializer

class WishViewSet(viewsets.ModelViewSet):
    serializer_class = WishSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return Wish.objects.filter(user=self.request.user).order_by('created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
