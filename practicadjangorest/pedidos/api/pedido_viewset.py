from rest_framework import serializers, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from pedidos.api import SimpleClienteSerializer, SimpleProductoSerializer
from pedidos.flow.pedido_flow import PedidoFlow
from pedidos.models import Pedido, Cliente, Producto, Chofer


class PedidoSerializer(serializers.ModelSerializer):
    cliente = SimpleClienteSerializer(read_only=True)
    cliente_id = serializers.PrimaryKeyRelatedField(
        queryset=Cliente.objects.all(), source='cliente', write_only=True
    )
    productos = SimpleProductoSerializer(many=True, read_only=True)
    productos_ids = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='productos', write_only=True, many=True
    )
    estado = serializers.CharField(read_only=True)
    razon_cancelacion = serializers.CharField(required=False, read_only=True)

    class Meta:
        model = Pedido
        fields = '__all__'


class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    filterset_fields = ['estado', 'pagado']
    search_fields = ['cliente__user__full_name']

    @action(detail=True, methods=['post'], url_path='aprobar', url_name='aprobar')
    def aprobar(self, request, pk=None):
        pedido = self.get_object()
        flow = PedidoFlow(pedido)
        flow.aprobado_restaurante()
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='preparar', url_name='preparar')
    def preparar(self, request, pk=None):
        pedido = self.get_object()
        flow = PedidoFlow(pedido)
        flow.en_preparacion()
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='asignar-chofer', url_name='asignar-chofer')
    def asignar_chofer(self, request, pk=None):
        pedido = self.get_object()
        if not request.data.get('chofer'):
            return Response({'chofer': 'Este campo es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        chofer_id = request.data.get('chofer')
        chofer = Chofer.objects.get(id=chofer_id)
        flow = PedidoFlow(pedido)
        flow.asignar_chofer(chofer)
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='chofer-restaurante', url_name='chofer-restaurante')
    def chofer_llego_restaurante(self, request, pk=None):
        pedido = self.get_object()
        flow = PedidoFlow(pedido)
        flow.chofer_llego_restaurante()
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='chofer-en-camino', url_name='chofer-en-camino')
    def chofer_en_camino(self, request, pk=None):
        pedido = self.get_object()
        flow = PedidoFlow(pedido)
        flow.chofer_lleva_pedido()
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='pagar', url_name='pagar')
    def pagar(self, request, pk=None):
        pedido = self.get_object()
        pedido.pagado = True
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='entregado', url_name='entregado')
    def entregado(self, request, pk=None):
        pedido = self.get_object()
        flow = PedidoFlow(pedido)
        flow.pedido_entregado()
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='cancelar-cliente', url_name='cancelar-cliente')
    def cancelar_cliente(self, request, pk=None):
        pedido = self.get_object()
        if not request.data.get('razon_cancelacion'):
            return Response({'razon_cancelacion': 'Este campo es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        razon_cancelacion = request.data.get('razon_cancelacion')
        flow = PedidoFlow(pedido)
        flow.cancelar_cliente(razon_cancelacion)
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='cancelar-restaurante', url_name='cancelar-restaurante')
    def cancelar_restaurante(self, request, pk=None):
        pedido = self.get_object()
        if not request.data.get('razon_cancelacion'):
            return Response({'razon_cancelacion': 'Este campo es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        razon_cancelacion = request.data.get('razon_cancelacion')

        flow = PedidoFlow(pedido)
        flow.cancelar_restaurante(razon_cancelacion)
        pedido.save()
        return self.retrieve(request, pk)

    @action(detail=True, methods=['post'], url_path='anular', url_name='anular')
    def anular(self, request, pk=None):
        pedido = self.get_object()
        flow = PedidoFlow(pedido)
        flow.anular()
        pedido.save()
        return self.retrieve(request, pk)
