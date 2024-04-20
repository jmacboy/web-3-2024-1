from django.contrib.auth.models import User
from django.db import models


class Chofer(models.Model):
    ciudad = models.CharField(max_length=100)
    telefono = models.CharField(max_length=100)

    user = models.OneToOneField(User, on_delete=models.CASCADE)
