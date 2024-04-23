from rest_framework import serializers, viewsets
from rest_framework.decorators import action

from pedidos.api import SimpleClienteSerializer, SimpleProductoSerializer
from pedidos.api_key.organization_api_key import OrganizationAPIKeyAuthentication
from pedidos.models import Pedido, Cliente, Producto


class PedidoSerializer(serializers.ModelSerializer):
    cliente = SimpleClienteSerializer(read_only=True)
    cliente_id = serializers.PrimaryKeyRelatedField(
        queryset=Cliente.objects.all(), source='cliente', write_only=True
    )
    productos = SimpleProductoSerializer(many=True, read_only=True)
    productos_ids = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='productos', write_only=True, many=True
    )

    class Meta:
        model = Pedido
        fields = '__all__'


class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    authentication_classes = (OrganizationAPIKeyAuthentication,)

