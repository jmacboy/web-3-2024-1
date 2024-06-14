from django.contrib.auth.models import User
from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from pedidos.api import SimpleUserSerializer
from pedidos.models import Chofer
from pedidos.permissions import PermissionPolicyMixin
from pedidos.permissions.is_admin import IsAdmin
from pedidos.permissions.is_driver import IsDriver


class ChoferSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)

    class Meta:
        model = Chofer
        fields = '__all__'


class ChoferViewSet(PermissionPolicyMixin, viewsets.ModelViewSet):
    queryset = Chofer.objects.all()
    serializer_class = ChoferSerializer
    permission_classes = [IsAuthenticated]
    permission_classes_per_method = {
        'create': [IsAuthenticated, IsAdmin],
        'update': [IsAuthenticated, IsDriver],
        'partial_update': [IsAuthenticated, IsDriver],
        'destroy': [IsAuthenticated, IsAdmin],
        'list': [],
        'retrieve': []
    }

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = request.data.get('username')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')

        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        serializer.save(user=user)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        user = instance.user
        if 'username' in request.data:
            username = request.data.get('username')
            user.username = username
        if 'first_name' in request.data:
            first_name = request.data.get('first_name')
            user.first_name = first_name
        if 'last_name' in request.data:
            last_name = request.data.get('last_name')
            user.last_name = last_name

        user.save()

        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
