from django.db import models
from django.conf import settings

class GalleryItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='gallery_items')
    image_url = models.URLField(max_length=500)
    caption = models.TextField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.caption[:20] if self.caption else 'No Caption'}"

    class Meta:
        ordering = ['-created_at']
