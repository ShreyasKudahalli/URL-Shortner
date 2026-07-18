from rest_framework import serializers

from .models import ShortURL,Click
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
    


class AnalyticsSerializer(serializers.ModelSerializer):

    total_clicks = serializers.SerializerMethodField()
    last_clicked = serializers.SerializerMethodField()
    short_url = serializers.SerializerMethodField()

    class Meta:
        model = ShortURL
        fields = [
            "original_url",
            "short_url",
            "created_at",
            "total_clicks",
            "last_clicked",
        ]

    def get_total_clicks(self, obj):
        return obj.clicks.count()

    def get_last_clicked(self, obj):
        last_click = obj.clicks.order_by("-clicked_at").first()

        if last_click:
            return last_click.clicked_at

        return None

    def get_short_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(f"/{obj.short_code}")