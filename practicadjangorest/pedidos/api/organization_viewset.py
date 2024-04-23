from rest_framework import viewsets, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response

from pedidos.models import OrganizationAPIKey, Organization


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"


class OrganizationViewSet(viewsets.ModelViewSet):
    http_method_names = ["post"]
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    @action(methods=["post"], detail=True, url_path="create-api-key")
    def create_api_key(self, request, *args, **kwargs):
        organization = self.get_object()
        _, key = OrganizationAPIKey.objects.create_api_key(
            name="Org Api Key", entity=organization
        )

        return Response({"key": key}, status=status.HTTP_201_CREATED)
