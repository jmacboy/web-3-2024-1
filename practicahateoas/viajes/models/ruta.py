from django.db import models

from viajes.models import Ciudad


class Ruta(models.Model):
    nro_vuelo = models.CharField(max_length=100)
    # Foreign Keys
    origen = models.ForeignKey(Ciudad, on_delete=models.CASCADE, related_name='vuelos_origen')
    destino = models.ForeignKey(Ciudad, on_delete=models.CASCADE, related_name='vuelos_destino')
