from rest_framework.throttling import UserRateThrottle


class URLCreationRateThrottle(UserRateThrottle):
    scope = "url_creation"