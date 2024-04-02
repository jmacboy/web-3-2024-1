# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render


def holamundo(request):
    return HttpResponse("Hola mundo")


def index(request):
    return render(request, "universidad/index.html")

