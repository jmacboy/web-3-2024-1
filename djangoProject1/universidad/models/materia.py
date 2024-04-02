from django.db import models

from universidad.models import Persona


class Materia(models.Model):
    nombre = models.CharField(max_length=50)
    creditos = models.IntegerField()
    horario = models.CharField(max_length=100)
    foto_perfil = models.ImageField(upload_to="static/images/materias", null=True, blank=True)

    # Foreign keys
    docente = models.ForeignKey(
        Persona,
        related_name="materias",
        on_delete=models.CASCADE
    )


    def __str__(self):
        return self.nombre
