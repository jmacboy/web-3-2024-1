# Generated by Django 5.0.4 on 2024-05-31 18:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0009_alter_pedido_estado'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='chofer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='pedidos.chofer'),
        ),
    ]
