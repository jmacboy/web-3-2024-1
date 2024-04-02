from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from universidad.forms.form_helper import text_form_control, password_form_control, email_form_control


class RegisterForm(forms.Form):
    username = forms.CharField(
        max_length=100, widget=text_form_control, label='Nombre de usuario', )
    password = forms.CharField(max_length=100, widget=password_form_control, label='Contraseña')
    first_name = forms.CharField(max_length=100, widget=text_form_control, label='Nombre')
    last_name = forms.CharField(max_length=100, widget=text_form_control, label='Apellido')
    email = forms.EmailField(widget=email_form_control, label='Email')

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise ValidationError("El Email ya existe")
        return email

    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username=username).exists():
            raise ValidationError("El usuario ya existe")
        return username
