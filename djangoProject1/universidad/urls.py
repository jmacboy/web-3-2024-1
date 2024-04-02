from django.urls import path

from universidad import views
from universidad.views import InscripcionListView, InscripcionCreateView, InscripcionUpdateView, InscripcionDeleteView

urlpatterns = [
    path("", views.index, name="index"),
    path("holamundo/", views.holamundo, name="holamundo"),
    path("personas/", views.persona_list, name="persona_list"),
    path("personas/create/", views.persona_create, name="persona_create"),
    path("personas/edit/<int:id>/", views.persona_edit, name="persona_edit"),
    path("personas/delete/<int:id>/", views.persona_delete, name="persona_delete"),
    path("materias/", views.materia_list, name="materia_list"),
    path("materias/create/", views.materia_create, name="materia_create"),
    path("materias/edit/<int:id>/", views.materia_edit, name="materia_edit"),
    path("materias/delete/<int:id>/", views.materia_delete, name="materia_delete"),
    path("inscripciones/", InscripcionListView.as_view(), name="inscripcion_list"),
    path("inscripciones/create/", InscripcionCreateView.as_view(), name="inscripcion_create"),
    path("inscripciones/edit/<int:pk>/", InscripcionUpdateView.as_view(), name="inscripcion_edit"),
    path("inscripciones/delete/<int:pk>/", InscripcionDeleteView.as_view(), name="inscripcion_delete"),
    path("login/", views.auth_login, name="auth_login"),
]
