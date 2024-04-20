from django.urls import path, include
from rest_framework import routers

from pedidos.api import ClienteViewSet, PedidoViewSet, ProductoViewSet

router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'productos', ProductoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
