# Generated by Django 5.0.4 on 2024-06-14 18:15

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('pedidos', '0015_fix_clients'),
    ]

    def insertData(apps, schema_editor):
        Group = apps.get_model('auth', 'Group')
        Permission = apps.get_model('auth', 'Permission')

        admin_group = Group.objects.get(name='admin')

        driver_group = Group(name='driver')
        driver_group.save()

        add_chofer = Permission.objects.get(codename='add_chofer')
        change_chofer = Permission.objects.get(codename='change_chofer')
        delete_chofer = Permission.objects.get(codename='delete_chofer')
        view_chofer = Permission.objects.get(codename='view_chofer')
        add_user = Permission.objects.get(codename='add_user')
        change_user = Permission.objects.get(codename='change_user')
        delete_user = Permission.objects.get(codename='delete_user')
        view_user = Permission.objects.get(codename='view_user')
        add_cliente = Permission.objects.get(codename='add_cliente')
        change_cliente = Permission.objects.get(codename='change_cliente')
        delete_cliente = Permission.objects.get(codename='delete_cliente')
        view_cliente = Permission.objects.get(codename='view_cliente')
        driver_permissions = [
            view_chofer,
            change_chofer
        ]
        driver_group.permissions.set(driver_permissions)
        admin_permissions = [
            add_chofer,
            change_chofer,
            delete_chofer,
            view_chofer,
            add_user,
            change_user,
            delete_user,
            view_user,
            add_cliente,
            change_cliente,
            delete_cliente,
            view_cliente
        ]
        admin_group.permissions.set(admin_permissions)

    operations = [
        migrations.RunPython(insertData),
    ]
