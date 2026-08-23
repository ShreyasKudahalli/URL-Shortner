import re

from rest_framework import serializers

from .models import ShortURL
from .utils import generate_short_code





class ShortURLSerializer(serializers.ModelSerializer):

    short_url = serializers.SerializerMethodField()


    RESERVED_ALIASES = [
        "api",
        "admin",
        "dashboard",
        "shorten",
    ]

    class Meta:
        model = ShortURL
        fields = [
            "id",
            "original_url",
            "short_code",
            "short_url",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "short_url",
            "created_at",
        ]

    def validate_short_code(self, value):

        if len(value) < 3:
            raise serializers.ValidationError(
                "Alias must be at least 3 characters long."
            )

        if len(value) > 30:
            raise serializers.ValidationError(
                "Alias cannot be more than 30 characters long."
            )

        if value.lower() in RESERVED_ALIASES:
            raise serializers.ValidationError(
                "This alias is reserved."
            )

        if not re.fullmatch(r"[A-Za-z0-9_-]+", value):
            raise serializers.ValidationError(
                "Alias can only contain letters, numbers, hyphens, and underscores."
            )

        if ShortURL.objects.filter(short_code=value).exists():
            raise serializers.ValidationError(
                "This alias is already taken."
            )

        return value

    def create(self, validated_data):
        short_code = validated_data.get("short_code")

        if not short_code:
            short_code = generate_short_code()

        validated_data["short_code"] = short_code

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
    

class DashboardSerializer(serializers.ModelSerializer):

    short_url = serializers.SerializerMethodField()
    total_clicks = serializers.SerializerMethodField()

    class Meta:
        model = ShortURL
        fields = [
            "id",
            "original_url",
            "short_code", 
            "short_url",
            "created_at",
            "total_clicks",
        ]

    def get_short_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(f"/{obj.short_code}")

    def get_total_clicks(self, obj):
        return obj.clicks.count()