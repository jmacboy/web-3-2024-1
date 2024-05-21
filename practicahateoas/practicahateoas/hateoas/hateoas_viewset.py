from rest_framework.viewsets import GenericViewSet

from practicahateoas.hateoas import HateoasRetrieveView, HateoasListView, HateoasCreateView, HateoasUpdateView, \
    HateoasDestroyView


class HateoasModelViewSet(
    HateoasRetrieveView,
    HateoasListView,
    HateoasCreateView,
    HateoasUpdateView,
    HateoasDestroyView,
    GenericViewSet
):
    pass
