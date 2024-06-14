from django.contrib.auth.models import User
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from pedidos.permissions.can_add_users import CanAddUsers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(
        detail=False,
        methods=['post'],
        url_path='add-user',
        url_name='add-user',
        permission_classes=[CanAddUsers]
    )
    def add_user(self, request):
        user = User.objects.create_user(
            username=request.data.get('username'),
            password=request.data.get('password'),
            first_name=request.data.get('first_name'),
            last_name=request.data.get('last_name'),
            email=request.data.get('email')
        )
        user.save()
        return Response({'detail': 'User created'}, status=201)

    @action(detail=False, methods=['get'], url_path='me', url_name='me')
    def get_user_info(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)
