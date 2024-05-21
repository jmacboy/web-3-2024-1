from django.urls import reverse
from rest_framework import serializers
from rest_framework.decorators import action
from rest_framework.response import Response

from practicahateoas.hateoas import HateoasModelViewSet, create_link
from viajes.api import CiudadSerializer
from viajes.models import Pais


class PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = '__all__'


class PaisViewSet(HateoasModelViewSet):
    queryset = Pais.objects.all()
    serializer_class = PaisSerializer

    def get_retrieve_links(self, request, data):
        self_link = request.build_absolute_uri(request.path)
        ciudades_link = request.build_absolute_uri(reverse('pais-ciudades-by-pais', args=(data.pk,)))
        delete_link = request.build_absolute_uri(request.path)
        if request.user.is_authenticated:
            return [
                create_link('self', self_link),
                create_link('delete self', delete_link, 'DELETE'),
                create_link('update self', self_link, 'PUT|PATCH'),
                create_link("ciudades", ciudades_link),
            ]
        else:
            return [
                create_link('self', self_link),
                create_link("ciudades", ciudades_link),
            ]

    def get_destroy_links(self, request, instance):
        list_link = request.build_absolute_uri(reverse('pais-list'))
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
        if request.user.is_authenticated:
            return [
                create_link('list', list_link),
                create_link("crear pais", crear_link, 'POST')
            ]
        else:
            return [
                create_link('list', list_link),
            ]

    @action(detail=True, methods=['get'], url_path='ciudades', name='Ciudades por pais')
    def ciudades_by_pais(self, request, pk=None):
        ciudades = Pais.objects.get(pk=pk).ciudades.all()
        serializer = CiudadSerializer(ciudades, many=True)
        return Response(serializer.data)
