from django import forms

from universidad.forms.form_helper import select_form_control
from universidad.models import Inscripcion, Persona, Semestre


class InscripcionForm(forms.ModelForm):
    alumno = forms.ModelChoiceField(
        widget=select_form_control,
        queryset=Persona.objects.all(),
        empty_label="Seleccione un alumno"
    )
    semestre = forms.ModelChoiceField(
        widget=select_form_control,
        queryset=Semestre.objects.all(),
        empty_label="Seleccione un semestre"
    )

    class Meta:
        model = Inscripcion
        fields = ("alumno", "semestre", "materias_inscritas")
        widgets = {
            'materias_inscritas': forms.CheckboxSelectMultiple()
        }
