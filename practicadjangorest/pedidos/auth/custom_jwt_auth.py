from rest_framework import authentication
from rest_framework_simplejwt.authentication import JWTAuthentication

from pedidos.auth import CustomAuthUser


class CustomJWTAuth(authentication.BaseAuthentication):
    def authenticate(self, request):
        jwt_auth = JWTAuthentication()
        bearer_token = request.headers.get('Authorization').split()
        if len(bearer_token) <= 1:
            return None
        token = jwt_auth.get_validated_token(bearer_token[1])
        print(token)
        user_id = token["user_id"]
        custom_user = CustomAuthUser()
        custom_user.pk = user_id
        # aumentar roles aquí
        custom_user.is_authenticated = True
        return custom_user, None
