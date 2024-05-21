from django.db import models


class Avion(models.Model):
    modelo = models.CharField(max_length=100)
    capacidad = models.IntegerField()

    def __str__(self):
        return self.modelo
