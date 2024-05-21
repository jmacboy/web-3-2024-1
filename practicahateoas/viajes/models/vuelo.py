from django.db import models

from viajes.models import Avion, Ruta


class Vuelo(models.Model):
    fecha = models.DateField()
    hora = models.TimeField()

    # Foreign Keys
    ruta = models.ForeignKey(Ruta, on_delete=models.CASCADE, related_name='vuelos')
    avion = models.ForeignKey(Avion, on_delete=models.CASCADE, related_name='vuelos')
