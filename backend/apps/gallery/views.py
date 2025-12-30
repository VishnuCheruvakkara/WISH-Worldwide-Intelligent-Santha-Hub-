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
