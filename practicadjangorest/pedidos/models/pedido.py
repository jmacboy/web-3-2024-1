from django.db import models

from pedidos.models import Cliente, Producto


class Pedido(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

    productos = models.ManyToManyField(Producto)

    def __str__(self):
        return f"{self.fecha} - {self.cliente}"
