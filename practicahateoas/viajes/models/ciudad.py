from django.db import models

from viajes.models import Pais


class Ciudad(models.Model):
    nombre = models.CharField(max_length=100)

    # Foreign Keys
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE, related_name='ciudades')

    def __str__(self):
        return self.nombre
