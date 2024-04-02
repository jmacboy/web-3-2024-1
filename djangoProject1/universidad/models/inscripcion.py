from django.db import models

from universidad.models import Persona, Semestre, Materia


class Inscripcion(models.Model):
    # Foreign Keys
    alumno = models.ForeignKey(
        Persona,
        related_name="inscripciones",
        on_delete=models.CASCADE
    )
    semestre = models.ForeignKey(
        Semestre,
        related_name="inscripciones",
        on_delete=models.CASCADE
    )
    materias_inscritas = models.ManyToManyField(
        Materia
    )
