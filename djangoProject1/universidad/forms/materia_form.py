from django import forms

from universidad.forms.form_helper import text_form_control, number_form_control, select_form_control
from universidad.models import Materia, Persona


class MateriaForm(forms.ModelForm):
    nombre = forms.CharField(max_length=50, widget=text_form_control)
    creditos = forms.IntegerField(min_value=1, max_value=10, widget=number_form_control)
    horario = forms.CharField(max_length=100, widget=text_form_control)
    docente = forms.ModelChoiceField(
        widget=select_form_control,
        queryset=Persona.objects.all(),
        empty_label="Seleccione un docente"
    )

    class Meta:
        model = Materia
        fields = ("nombre", "creditos", "horario", "docente")
