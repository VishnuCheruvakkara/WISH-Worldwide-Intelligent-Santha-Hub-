from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import GalleryItem
from .serializers import GalleryItemSerializer
from .utils import upload_to_cloudinary

class GalleryItemViewSet(viewsets.ModelViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        image_file = request.FILES.get('image')
        caption = request.data.get('caption')

        if not image_file:
            return Response({"error": "Image is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Validation: File size (Max 5MB)
        if image_file.size > 5 * 1024 * 1024:
            return Response({"error": "Image size exceeds 5MB limit"}, status=status.HTTP_400_BAD_REQUEST)

        # Validation: File extension
        ext = image_file.name.split('.')[-1].lower()
        if ext not in ['jpg', 'jpeg', 'png', 'webp']:
            return Response({"error": "Only JPG, JPEG, PNG, and WEBP images are allowed"}, status=status.HTTP_400_BAD_REQUEST)

        # Validation: Caption length
        if caption and len(caption) > 200:
            return Response({"error": "Caption/Quote must be under 200 characters"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            image_url = upload_to_cloudinary(image_file, folder="wish_gallery")
            gallery_item = GalleryItem.objects.create(
                user=request.user,
                image_url=image_url,
                caption=caption
            )
            serializer = self.get_serializer(gallery_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
