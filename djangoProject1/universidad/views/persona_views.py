from django.shortcuts import render, redirect

from universidad.models import Persona


def persona_list(request):
    personas = Persona.objects.all()
    return render(
        request,
        "universidad/personas/list.html",
        {"personas": personas}
    )


def persona_create(request):
    if request.method == 'GET':
        return render(request, "universidad/personas/form.html")

    persona = Persona()
    persona.nombres = request.POST.get("nombres")
    persona.apellidos = request.POST.get("apellidos")
    persona.edad = request.POST.get("edad")
    persona.fecha_nacimiento = request.POST.get("fecha_nacimiento")
    persona.ciudad = request.POST.get("ciudad")
    persona.genero = request.POST.get("genero")
    persona.save()
    return redirect("persona_list")


def persona_edit(request, id):
    persona = Persona.objects.get(id=id)
    if request.method == 'GET':
        return render(
            request,
            "universidad/personas/form.html",
            {"persona": persona}
        )
    persona.nombres = request.POST.get("nombres")
    persona.apellidos = request.POST.get("apellidos")
    persona.edad = request.POST.get("edad")
    persona.fecha_nacimiento = request.POST.get("fecha_nacimiento")
    persona.ciudad = request.POST.get("ciudad")
    persona.genero = request.POST.get("genero")
    persona.save()
    return redirect("persona_list")


def persona_delete(request, id):
    if request.method == 'GET':
        return redirect("persona_list")
    persona = Persona.objects.get(id=id)
    persona.delete()
    return redirect("persona_list")
