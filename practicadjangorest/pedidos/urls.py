from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from pedidos.api import ClienteViewSet, PedidoViewSet, ProductoViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'usuarios', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # opcional
    path('api-token-auth/', views.obtain_auth_token)
]
