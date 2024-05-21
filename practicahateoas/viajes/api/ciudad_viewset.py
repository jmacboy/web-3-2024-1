from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from practicahateoas.hateoas import create_link, HateoasModelViewSet
from viajes.api import RutaSerializer
from viajes.models import Ciudad, Ruta


class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = '__all__'


class CiudadViewSet(HateoasModelViewSet):
    queryset = Ciudad.objects.all()
    serializer_class = CiudadSerializer

    def get_retrieve_links(self, request, data):
        self_link = request.build_absolute_uri(request.path)
        delete_link = request.build_absolute_uri(request.path)
        origen_link = request.build_absolute_uri(request.path + 'rutas-origen')
        destino_link = request.build_absolute_uri(request.path + 'rutas-destino')
        return [
            create_link('self', self_link),
            create_link('delete self', delete_link, 'DELETE'),
            create_link('update self', self_link, 'PUT|PATCH'),
            create_link('rutas origen', origen_link),
            create_link('rutas destino', destino_link),
        ]

    def get_destroy_links(self, request, instance):
        list_link = request.build_absolute_uri(request.path)
        return [
            create_link('list', list_link)
        ]

    def get_update_links(self, request, instance):
        self_link = request.build_absolute_uri(request.path)
        return [
            create_link('self', self_link),
        ]

    def get_create_links(self, request, data):
        self_link = request.build_absolute_uri(request.path)
        return [
            create_link('self', self_link),
        ]

    def get_list_links(self, request):
        list_link = request.build_absolute_uri(request.path)
        crear_link = request.build_absolute_uri(request.path)
        return [
            create_link('list', list_link),
            create_link("crear ciudad", crear_link, 'POST')
        ]

    @action(detail=True, methods=['get'], url_path='rutas-origen', name='Rutas con origen en esta ciudad')
    def rutas_origen(self, request, pk=None):
        rutas = Ruta.objects.filter(origen_id=pk)
        serializer = RutaSerializer(rutas, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'], url_path='rutas-destino', name='Rutas con destino en esta ciudad')
    def rutas_destino(self, request, pk=None):
        rutas = Ruta.objects.filter(destino_id=pk)
        serializer = RutaSerializer(rutas, many=True)
        return Response(serializer.data)
