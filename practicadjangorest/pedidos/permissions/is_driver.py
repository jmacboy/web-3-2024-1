from rest_framework.permissions import BasePermission

from pedidos.models import Chofer


class IsDriver(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        is_driver_group = user and user.groups.filter(name='driver').exists()
        has_driver_model = Chofer.objects.filter(user=user).exists()
        return is_driver_group and has_driver_model
