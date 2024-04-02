from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import render, redirect

from universidad.forms import LoginForm, RegisterForm


def auth_login(request):
    if 'user_id' in request.session:
        return redirect("materia_list")
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
                request.session['username'] = authenticated_user.username
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


def auth_logout(request):
    del request.session['username']
    return redirect("auth_login")


def auth_register(request):
    if 'username' in request.session:
        return redirect("materia_list")
    form = RegisterForm()
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            User.objects.create_user(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password'],
                first_name=form.cleaned_data['first_name'],
                last_name=form.cleaned_data['last_name'],
                email=form.cleaned_data['email']
            )
            return redirect("auth_login")
        return render(
            request,
            'universidad/auth/register.html',
            {'form': form}
        )
    return render(request, 'universidad/auth/register.html', {'form': form})
