
from django.urls import path

from universidad import views


urlpatterns = [
    path("",views.index, name="index")
]