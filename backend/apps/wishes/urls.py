from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WishViewSet, AdminUserWishViewSet

router = DefaultRouter()
router.register(r'admin-user-wishes', AdminUserWishViewSet, basename='admin-user-wishes')
router.register(r'', WishViewSet, basename='wish')

urlpatterns = [
    path('', include(router.urls)),
]
