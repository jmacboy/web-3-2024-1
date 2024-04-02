from django import forms

from universidad.forms.form_helper import text_form_control, password_form_control


class LoginForm(forms.Form):
    username = forms.CharField(
        label='Usuario',
        max_length=100,
        widget=text_form_control
    )
    password = forms.CharField(
        label='Contraseña',
        widget=password_form_control
    )
