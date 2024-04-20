from django.contrib.auth.models import User
from django.db import models


class Cliente(models.Model):
    edad = models.IntegerField()
    fecha_nacimiento = models.DateField()
    ciudad = models.CharField(max_length=100)
    telefono = models.CharField(max_length=100)
    GENERO_MASCULINO = 1
    GENERO_FEMENINO = 0
    GENERO_OTRO = -1
    GENERO_CHOICES = (
        (GENERO_MASCULINO, "Masculino"),
        (GENERO_FEMENINO, "Femenino"),
        (GENERO_OTRO, "Otro")
    )
    genero = models.IntegerField(choices=GENERO_CHOICES)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"
