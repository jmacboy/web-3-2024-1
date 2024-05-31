# Generated by Django 5.0.4 on 2024-05-31 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0007_alter_pedido_cliente'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='estado',
            field=models.CharField(choices=[('CREADO', 'Creado'), ('APROBADO_RESTAURANTE', 'Aprobado por el restaurante'), ('EN_PREPARACION', 'En preparación'), ('CHOFER_ESPERANDO_PEDIDO', 'Chofer esperando pedido'), ('EN_CAMINO', 'En camino'), ('ENTREGADO', 'Entregado'), ('CANCELADO_CLIENTE', 'Cancelado por el cliente'), ('CANCELADO_RESTAURANTE', 'Cancelado por el restaurante')], default='CREADO', max_length=50),
        ),
    ]
