from django.urls import path
from .views import (
    SignUp,
    SignIn,
    Logout,
    CustomTokenRefresh,
    GetUserData,
    GetCSRFToken,
    AdminSignIn,
    GoogleCallbackAPI
)

urlpatterns = [
    path("sign-up/", SignUp.as_view(), name="sign-up"),
    path("login/", SignIn.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    path("token-refresh/", CustomTokenRefresh.as_view(), name="token-refresh"),
    path("get-user-data/", GetUserData.as_view(), name="get-user-data"),
    path("csrf/", GetCSRFToken.as_view(), name="get-csrf"),
    path("admin-login/", AdminSignIn.as_view(), name="admin-login"),
    path("google/callback/", GoogleCallbackAPI.as_view(), name="google_callback"),

]
