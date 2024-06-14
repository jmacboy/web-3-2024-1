# Generated by Django 5.0.4 on 2024-06-14 17:44

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('pedidos', '0013_pedido_razon_cancelacion'),
    ]

    def insertData(apps, schema_editor):
        Group = apps.get_model('auth', 'Group')
        Permission = apps.get_model('auth', 'Permission')
        User = apps.get_model('auth', 'User')

        admin_group = Group(name='admin')
        admin_group.save()

        client_group = Group(name='client')
        client_group.save()

        add_user = Permission.objects.get(codename='add_user')
        change_user = Permission.objects.get(codename='change_user')
        delete_user = Permission.objects.get(codename='delete_user')
        view_user = Permission.objects.get(codename='view_user')
        add_cliente = Permission.objects.get(codename='add_cliente')
        change_cliente = Permission.objects.get(codename='change_cliente')
        delete_cliente = Permission.objects.get(codename='delete_cliente')
        view_cliente = Permission.objects.get(codename='view_cliente')
        admin_permissions = [
            add_user,
            change_user,
            delete_user,
            view_user,
            add_cliente,
            change_cliente,
            delete_cliente,
            view_cliente
        ]
        client_permissions = [
            view_user,
            change_cliente,
            view_cliente
        ]
        admin_group.permissions.set(admin_permissions)
        client_group.permissions.set(client_permissions)

        admin_user = User.objects.get(username='admin')
        admin_user.groups.add(admin_group)

    operations = [
        migrations.RunPython(insertData),
    ]
