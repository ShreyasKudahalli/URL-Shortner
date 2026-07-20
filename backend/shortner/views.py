
# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, redirect
from . models import ShortURL,Click
from .serializers import ShortURLSerializer, AnalyticsSerializer



class ShortenURLView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ShortURLSerializer(
            data=request.data,
            context={"request": request}
        )

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


def redirect_url(request, short_code):
    short_url = get_object_or_404(
        ShortURL,
        short_code=short_code
    )

    ip_address = request.META.get("REMOTE_ADDR")
    user_agent = request.META.get("HTTP_USER_AGENT", "")

    Click.objects.create(
        short_url=short_url,
        ip_address=ip_address,
        user_agent=user_agent,
    )

    return redirect(short_url.original_url)



class AnalyticsView(APIView):

    def get(self, request, short_code):
        short_url = get_object_or_404(
            ShortURL,
            short_code=short_code
        )

        serializer = AnalyticsSerializer(
            short_url,
            context={"request": request}
        )

        return Response(serializer.data)