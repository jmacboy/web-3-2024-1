from rest_framework import serializers
from rest_framework.decorators import action
from rest_framework.response import Response

from practicahateoas.hateoas import HateoasModelViewSet, create_link
from viajes.api import VueloSerializer
from viajes.models import Ruta


class RutaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ruta
        fields = '__all__'


class RutaViewSet(HateoasModelViewSet):
    queryset = Ruta.objects.all()
    serializer_class = RutaSerializer

    def get_retrieve_links(self, request, instance):
        self_link = request.build_absolute_uri(request.path)
        delete_link = request.build_absolute_uri(request.path)
        vuelos_link = request.build_absolute_uri(request.path + 'vuelos')
        return [
            create_link('self', self_link),
            create_link('delete self', delete_link, 'DELETE'),
            create_link('update self', self_link, 'PUT|PATCH'),
            create_link('vuelos', vuelos_link),
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
            create_link("crear ruta", crear_link, 'POST')
        ]

    @action(detail=True, methods=['get'], url_path='vuelos', name='Vuelos para ruta')
    def vuelos(self, request, pk=None):
        vuelos = Ruta.objects.get(pk=pk).vuelos.all()
        serializer = VueloSerializer(vuelos, many=True)
        return Response(serializer.data)
