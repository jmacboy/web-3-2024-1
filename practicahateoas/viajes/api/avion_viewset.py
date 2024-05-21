from rest_framework import viewsets, serializers

from viajes.models import Avion


class AvionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avion
        fields = '__all__'


class AvionViewSet(viewsets.ModelViewSet):
    queryset = Avion.objects.all()
    serializer_class = AvionSerializer
