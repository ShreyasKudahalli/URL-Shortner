from django.db import models

# Create your models here.
class ShortURL(models.Model):

    original_url = models.URLField()
    short_code = models.CharField(max_length=100,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.short_code
    
class Click(models.Model):
    short_url = models.ForeignKey(
        ShortURL,
        on_delete=models.CASCADE,
        related_name="clicks"
    )

    clicked_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField()

    def __str__(self):
        return f"{self.short_url.short_code} - {self.clicked_at}"