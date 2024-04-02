from django.db import models


class Semestre(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
