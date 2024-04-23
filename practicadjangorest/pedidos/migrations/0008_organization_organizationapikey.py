# Generated by Django 5.0.4 on 2024-04-23 18:29

import django.db.models.deletion
import rest_framework_simple_api_key.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pedidos', '0007_alter_pedido_cliente'),
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='OrganizationAPIKey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, null=True)),
                ('expiry_date', models.DateTimeField(default=rest_framework_simple_api_key.models._expiry_date, help_text='Once API key expires, entities cannot use it anymore.', verbose_name='Expires')),
                ('revoked', models.BooleanField(blank=True, default=False, help_text='If the API key is revoked, entities cannot use it anymore. (This cannot be undone.)')),
                ('created', models.DateTimeField(auto_now=True)),
                ('entity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='api_keys', to='pedidos.organization')),
            ],
            options={
                'verbose_name': 'API key',
                'verbose_name_plural': 'API keys',
                'abstract': False,
            },
        ),
    ]
