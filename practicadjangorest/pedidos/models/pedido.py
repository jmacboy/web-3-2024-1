from django.db import models
from django.utils.translation import gettext_lazy as _

from pedidos.models import Cliente, Producto, Chofer


class PedidoEstado(models.TextChoices):
    CREADO = 'CREADO', _('Creado')
    APROBADO_RESTAURANTE = 'APROBADO_RESTAURANTE', _('Aprobado por el restaurante')
    EN_PREPARACION = 'EN_PREPARACION', _('En preparación')
    CHOFER_ASIGNADO = 'CHOFER_ASIGNADO', _('Chofer asignado')
    CHOFER_ESPERANDO_PEDIDO = 'CHOFER_ESPERANDO_PEDIDO', _('Chofer esperando pedido')
    EN_CAMINO = 'EN_CAMINO', _('En camino')
    ENTREGADO = 'ENTREGADO', _('Entregado')
    CANCELADO_CLIENTE = 'CANCELADO_CLIENTE', _('Cancelado por el cliente')
    CANCELADO_RESTAURANTE = 'CANCELADO_RESTAURANTE', _('Cancelado por el restaurante')
    ANULAR = 'ANULAR', _('Anulado')


class Pedido(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='pedidos')
    productos = models.ManyToManyField(Producto)
    estado = models.CharField(
        max_length=50,
        choices=PedidoEstado.choices,
        default=PedidoEstado.CREADO
    )
    chofer = models.ForeignKey(
        Chofer,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    pagado = models.BooleanField(default=False)
    razon_cancelacion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.fecha} - {self.cliente}"
