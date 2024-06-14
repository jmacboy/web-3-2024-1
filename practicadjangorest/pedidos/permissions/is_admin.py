from rest_framework.permissions import BasePermission

from pedidos.models import Chofer


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return  user and user.groups.filter(name='admin').exists()
