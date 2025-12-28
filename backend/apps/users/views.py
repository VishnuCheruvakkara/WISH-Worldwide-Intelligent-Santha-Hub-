from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAdminUser
from django.contrib.auth import get_user_model
from .serializers import SignUpSerializer, LoginSerializer,CustomTokenRefreshSerializer
from .utils import (
    generate_tokens_for_user,
    set_refresh_token_cookie,
    remove_refresh_token_cookie,
)
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.pagination import PageNumberPagination
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import requests

User = get_user_model()

class SignUp(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)

        if serializer.is_valid():
            try:
                user = User.objects.create_user(
                    username=serializer.validated_data["username"],
                    email=serializer.validated_data["email"],
                    password=serializer.validated_data["password"],
                )

                tokens = generate_tokens_for_user(user)

                response = Response(
                    {
                        "status": "success",
                        "message": "User created successfully!",
                        "data": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                            "access": tokens["access"],
                            "is_admin": user.is_staff,
                        },
                    },
                    status=status.HTTP_201_CREATED,
                )

                set_refresh_token_cookie(response, tokens["refresh"])

                return response

            except Exception as e:
                return Response(
                    {
                        "status": "error",
                        "message": "Something went wrong while creating the user.",
                    },
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        return Response(
            {
                "status": "error",
                "message": "Validation failed",
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class SignIn(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            try:
                user_obj = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response(
                    {"status": "error", "message": "Invalid credentials."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            
            if not user_obj.is_active:
                return Response(
                    {
                        "status": "blocked",
                        "message": "Your account is blocked. Contact support.",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )
            user = authenticate(request, email=email, password=password)

            if user is None:
                return Response(
                    {"status": "error", "message": "Invalid credentials."},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            tokens = generate_tokens_for_user(user)

            response = Response(
                {
                    "status": "success",
                    "message": "Login successful",
                    "data": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "access": tokens["access"],
                        "is_admin": user.is_staff,
                    },
                },
                status=status.HTTP_200_OK,
            )

            set_refresh_token_cookie(response, tokens["refresh"])

            return response

        return Response(
            {
                "status": "error",
                "message": "Validation failed",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class Logout(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        response = Response(
            {"status": "success", "message": "Logged out"}, status=status.HTTP_200_OK
        )
        remove_refresh_token_cookie(request, response)
        return response


class CustomTokenRefresh(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])

        if refresh_token is None:
            return Response(
                {"status": "error", "message": "Refresh token missing", "data": None},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            # Call the  Inherited class ( Adding refresh token in request )

            request.data["refresh"] = refresh_token
            response = super().post(request, *args, **kwargs)

            new_access = response.data.get("access")
            new_refresh = response.data.get("refresh")

            if not new_access:
                raise InvalidToken("Token refresh failed")

            token_obj = RefreshToken(new_refresh)
            user_id = token_obj["user_id"]
            user = User.objects.get(id=user_id)

            if not user.is_active:
                return Response(
                    {
                        "status": "blocked",
                        "message": "Your account is blocked. Contact support.",
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

            res = Response(
                {
                    "status": "success",
                    "message": "Token refreshed",
                    "data": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "access": new_access,
                        "is_admin": user.is_staff,
                    },
                },
                status=status.HTTP_200_OK,
            )

            set_refresh_token_cookie(res, new_refresh)
            return res

        except InvalidToken:
            return Response(
                {"status": "error", "message": "Invalid refresh token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


# Check user is authenticated or not
class GetUserData(APIView):

    def get(self, request):

        return Response(
            {
                "status": "success",
            },
            status=status.HTTP_200_OK,
        )


# Generate csrf before app start
@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return Response({"message": "CSRF cookie set"})


class AdminSignIn(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            user = authenticate(request, email=email, password=password)

            if user is None or not user.is_staff:
                return Response(
                    {"status": "error", "message": "Invalid admin credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            tokens = generate_tokens_for_user(user)

            response = Response(
                {
                    "status": "success",
                    "message": "Admin login successful",
                    "data": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "access": tokens["access"],
                        "is_admin": True,
                    },
                },
                status=status.HTTP_200_OK,
            )

            set_refresh_token_cookie(response, tokens["refresh"])
            return response

        return Response(
            {"status": "error", "message": "Validation failed"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# Google authentication views 
class GoogleCallbackAPI(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        access_token = request.data.get("access_token")
        if not access_token:
            return Response({"error": "Access token not provided"}, status=400)

        try:
            # Fetch user info from Google
            user_info_response = requests.get(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                headers={"Authorization": f"Bearer {access_token}"}
            )
            if user_info_response.status_code != 200:
                return Response({"error": "Failed to fetch user info from Google"}, status=400)

            user_info = user_info_response.json()
            email = user_info.get("email")
            name = user_info.get("name") or email.split("@")[0]

            if not email:
                return Response({"error": "No email found in Google profile"}, status=400)

            
            user, _ = User.objects.get_or_create(email=email, defaults={"username": name})

            if not user.is_active:
                return Response({
                    "status": "blocked",
                    "message": "Your account is blocked. Contact support.",
                }, status=403) 
            
            tokens = generate_tokens_for_user(user)

            response = Response({
                "status": "success",
                "message": "Login successful",
                "data": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "access": tokens["access"],
                    "is_admin": user.is_staff,
                }
            }, status=200)

            set_refresh_token_cookie(response, tokens["refresh"])

            return response

        except Exception as e:
            return Response({"error": "Authentication failed", "details": str(e)}, status=500)