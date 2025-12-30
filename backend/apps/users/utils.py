from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.response import Response
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def generate_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {"access": str(refresh.access_token), "refresh": str(refresh)}


def set_refresh_token_cookie(response, refresh_token):
    response.set_cookie(
        key=settings.SIMPLE_JWT["AUTH_COOKIE"],  # cookie name
        value=refresh_token,
        httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],  # JS cannot access
        secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],  # HTTPS only
        samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],  # cross-site requests
        max_age=int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds()),
    )


def remove_refresh_token_cookie(request, response):
    cookie_name = settings.SIMPLE_JWT["AUTH_COOKIE"]
    refresh_token = request.COOKIES.get(cookie_name)

    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            logger.info("Refresh token successfully blacklisted.")
        except TokenError as e:
            logger.warning(f"Failed to blacklist refresh token: {str(e)}")
    else:
        logger.warning("No refresh token found in cookies.")

    response.delete_cookie(cookie_name)
    logger.info("Refresh token cookie removed.")

    return response
