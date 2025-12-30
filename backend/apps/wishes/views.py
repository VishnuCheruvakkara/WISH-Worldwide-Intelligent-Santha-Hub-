from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Wish
from django.contrib.auth import get_user_model
from django.db.models import Prefetch

User = get_user_model()
from .serializers import WishSerializer, UserWishesSerializer
from .pagination import StandardResultsSetPagination

class AdminUserWishViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserWishesSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'wishes__content']

    def get_queryset(self):
        queryset = User.objects.filter(wishes__isnull=False).distinct().order_by('id')

        status_filter = self.request.query_params.get('status')
        if status_filter == 'granted':
            queryset = queryset.filter(wishes__is_granted=True).distinct()
            queryset = queryset.prefetch_related(
                Prefetch('wishes', queryset=Wish.objects.filter(is_granted=True))
            )
        elif status_filter == 'pending':
            queryset = queryset.filter(wishes__is_granted=False).distinct()
            queryset = queryset.prefetch_related(
                Prefetch('wishes', queryset=Wish.objects.filter(is_granted=False))
            )
        else:
            queryset = queryset.prefetch_related('wishes')

        return queryset

class WishViewSet(viewsets.ModelViewSet):
    serializer_class = WishSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['content', 'user__username']

    def get_queryset(self):
        queryset = Wish.objects.all().order_by('-created_at') if self.request.user.is_staff else Wish.objects.filter(user=self.request.user).order_by('created_at')
        
        status_filter = self.request.query_params.get('status')
        if status_filter == 'granted':
            queryset = queryset.filter(is_granted=True)
        elif status_filter == 'pending':
            queryset = queryset.filter(is_granted=False)
            
        return queryset

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def bulk_grant_all(self, request):
        updated_count = Wish.objects.filter(is_granted=False).update(is_granted=True)
        return Response({'message': f'Successfully granted {updated_count} wishes!'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def bulk_grant_user(self, request):
        user_id = request.data.get('user_id')
        if not user_id:
            username = request.data.get('username')
            if not username:
                return Response({'error': 'User ID or Username required'}, status=status.HTTP_400_BAD_REQUEST)
            updated_count = Wish.objects.filter(user__username=username, is_granted=False).update(is_granted=True)
        else:
            updated_count = Wish.objects.filter(user_id=user_id, is_granted=False).update(is_granted=True)
            
        return Response({'message': f'Successfully granted {updated_count} wishes for user!'}, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
