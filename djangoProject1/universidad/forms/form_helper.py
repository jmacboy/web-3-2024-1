from django import forms

text_form_control = forms.TextInput(
    attrs={
        'class': 'form-control'
    }
)
number_form_control = forms.NumberInput(
    attrs={
        'class': 'form-control'
    }
)
password_form_control = forms.PasswordInput(
    attrs={
        'class': 'form-control'
    }
)
email_form_control = forms.EmailInput(
    attrs={
        'class': 'form-control'
    }
)
select_form_control = forms.Select(
    attrs={
        'class': 'form-select'
    }
)
