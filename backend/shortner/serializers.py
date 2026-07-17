from rest_framework import serializers

from .models import ShortURL
from .utils import generate_short_code


class ShortURLSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShortURL
        fields = ["id", "original_url", "short_code", "created_at"]
        read_only_fields = ["id", "short_code", "created_at"]

    def create(self, validated_data):
        validated_data["short_code"] = generate_short_code()
        return ShortURL.objects.create(**validated_data)