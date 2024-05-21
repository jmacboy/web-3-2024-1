from rest_framework import serializers

from practicahateoas.hateoas import HateoasModelViewSet, create_link
from viajes.api import AvionSerializer
from viajes.models import Vuelo, Avion


class VueloSerializer(serializers.ModelSerializer):
    avion = AvionSerializer(read_only=True, many=False)
    avion_id = serializers.PrimaryKeyRelatedField(queryset=Avion.objects.all(), write_only=True, source='avion')

    class Meta:
        model = Vuelo
        fields = '__all__'


class VueloViewSet(HateoasModelViewSet):
    queryset = Vuelo.objects.all()
    serializer_class = VueloSerializer

    def get_retrieve_links(self, request, instance):
        self_link = request.build_absolute_uri(request.path)
        delete_link = request.build_absolute_uri(request.path)
        return [
            create_link('self', self_link),
            create_link('delete self', delete_link, 'DELETE'),
            create_link('update self', self_link, 'PUT|PATCH'),
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
            create_link("crear vuelo", crear_link, 'POST')
        ]
