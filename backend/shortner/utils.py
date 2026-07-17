import random
import string

from .models import ShortURL


def generate_short_code(length=6):
    """
    Generate a unique short code.
    """

    characters = string.ascii_letters + string.digits

    while True:
        short_code = "".join(random.choices(characters, k=length))

        if not ShortURL.objects.filter(short_code=short_code).exists():
            return short_code