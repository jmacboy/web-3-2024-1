from django.urls import path, include
from rest_framework import routers

from pedidos.api import ClienteViewSet

router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
