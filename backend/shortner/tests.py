from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import AppUser


class URLCreationThrottleTests(APITestCase):

    def setUp(self):
        self.user = AppUser.objects.create_user(
            username="throttle_test",
            password="testpassword123"
        )

        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

    def test_url_creation_rate_limit(self):
        url = reverse("shorten-url")

        for i in range(10):
            response = self.client.post(
                url,
                {
                    "original_url": f"https://example{i}.com"
                },
                format="json"
            )


            self.assertEqual(response.status_code, 201)

        response = self.client.post(
            url,
            {
                "original_url": "https://eleventh-example.com"
            },
            format="json"
        )


        self.assertEqual(response.status_code, 429)