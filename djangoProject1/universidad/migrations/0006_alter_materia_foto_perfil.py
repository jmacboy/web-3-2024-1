# Generated by Django 4.2.11 on 2024-04-02 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('universidad', '0005_materia_foto_perfil'),
    ]

    operations = [
        migrations.AlterField(
            model_name='materia',
            name='foto_perfil',
            field=models.ImageField(blank=True, null=True, upload_to='materias'),
        ),
    ]