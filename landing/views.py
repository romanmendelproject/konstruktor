from django.shortcuts import render
from .forms import nametestForm
from .models import *

def landing(request):
    name = "CodingMedved"
    current_day = "03.01.2017"
    formN = nametestForm(request.POST or None)

    if request.method == "POST" and formN.is_valid():
        print (request.POST)
        print (formN.cleaned_data)
        data  = formN.cleaned_data
        print (data["name"])

        new_form = formN.save()

    return render(request, 'landing/landing.html', locals())

def home(request):

    return render(request, 'landing/index.html', locals())
