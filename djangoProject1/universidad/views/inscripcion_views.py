from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

from universidad.forms import InscripcionForm
from universidad.models import Inscripcion


class InscripcionListView(ListView):
    model = Inscripcion
    template_name = 'universidad/inscripciones/inscripcion_list.html'

    def get_queryset(self):
        return Inscripcion.objects.all()


class InscripcionCreateView(CreateView):
    model = Inscripcion
    template_name = 'universidad/inscripciones/inscripcion_form.html'
    form_class = InscripcionForm
    success_url = reverse_lazy('inscripcion_list')


class InscripcionUpdateView(UpdateView):
    model = Inscripcion
    template_name = 'universidad/inscripciones/inscripcion_form.html'
    form_class = InscripcionForm
    success_url = reverse_lazy('inscripcion_list')


class InscripcionDeleteView(DeleteView):
    model = Inscripcion
    success_url = reverse_lazy('inscripcion_list')
