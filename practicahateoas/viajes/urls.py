from django.urls import path, include
from rest_framework import routers

from viajes.api import CiudadViewSet, PaisViewSet, RutaViewSet, VueloViewSet, AvionViewSet

router = routers.DefaultRouter()
router.register(r'paises', PaisViewSet)
router.register(r'ciudades', CiudadViewSet)
router.register("rutas", RutaViewSet)
router.register("vuelos", VueloViewSet)
router.register("aviones", AvionViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
