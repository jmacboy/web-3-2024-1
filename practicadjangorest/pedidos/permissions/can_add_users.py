from rest_framework.permissions import BasePermission


class CanAddUsers(BasePermission):
    def has_permission(self, request, view):
        # jwt_payload = request.auth.payload
        # print(jwt_payload)
        return request.user and request.user.has_perm('add_user')
