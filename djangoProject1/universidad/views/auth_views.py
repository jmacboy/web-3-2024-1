from django.contrib.auth import authenticate
from django.shortcuts import render, redirect

from universidad.forms.login_form import LoginForm


def auth_login(request):
    form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            authenticated_user = authenticate(
                username=username,
                password=password
            )
            if authenticated_user is not None:
                return redirect("materia_list")
        return render(
            request,
            'universidad/auth/login.html',
            {'form': form}
        )
    return render(
        request,
        'universidad/auth/login.html',
        {'form': form}
    )
