from rest_framework import serializers

from .models import ShortURL
from .utils import generate_short_code


class ShortURLSerializer(serializers.ModelSerializer):

    short_url = serializers.SerializerMethodField()

    class Meta:
        model = ShortURL
        fields = [
            "id",
            "original_url",
            "short_url",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "short_url",
            "created_at",
        ]

    def create(self, validated_data):
        validated_data["short_code"] = generate_short_code()
        return ShortURL.objects.create(**validated_data)

    def get_short_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(f"/{obj.short_code}")