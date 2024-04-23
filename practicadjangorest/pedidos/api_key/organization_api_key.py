from rest_framework_simple_api_key.backends import APIKeyAuthentication

from pedidos.models import OrganizationAPIKey


class OrganizationAPIKeyAuthentication(APIKeyAuthentication):
    model = OrganizationAPIKey
