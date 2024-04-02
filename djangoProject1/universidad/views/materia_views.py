from django.shortcuts import render, redirect

from universidad.forms import MateriaForm
from universidad.models import Materia


def materia_list(request):
    materias = Materia.objects.all()
    return render(
        request,
        "universidad/materias/list.html",
        {"materias": materias}
    )


def materia_create(request):
    if request.method == 'POST':
        form = MateriaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("materia_list")
    else:
        form = MateriaForm()
    return render(request, "universidad/materias/form.html", {"form": form})


def materia_edit(request, id):
    materia = Materia.objects.get(id=id)
    if materia is None:
        return redirect("materia_list")

    if request.method == 'POST':
        form = MateriaForm(request.POST, request.FILES, instance=materia)
        if form.is_valid():
            form.save()
            return redirect("materia_list")
    else:
        form = MateriaForm(instance=materia)

    return render(request, "universidad/materias/form.html", {"form": form})


def materia_delete(request, id):
    if request.method == 'GET':
        return redirect("materia_list")
    materia = Materia.objects.get(id=id)
    materia.delete()
    return redirect("materia_list")
