from django.contrib.auth.models import User
from rest_framework import serializers

from pedidos.models import Cliente, Producto


class SimpleClienteSerializer(serializers.ModelSerializer):
    nombres = serializers.CharField(source='user.first_name', read_only=True)
    apellidos = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = Cliente
        fields = ('id', 'nombres', 'apellidos', 'telefono')


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class SimpleProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ('id', 'nombre', 'precio')
