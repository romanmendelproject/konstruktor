from django.shortcuts import render
from .forms import *
from .models import *

def landing(request):

    return render(request, 'landing/landing.html', locals())

def home(request):
    name = "CodingMedved"
    current_day = "03.01.2017"
    formN = nametestForm(request.POST or None)
    formQ = QuestionsForm(request.POST or None)

    if request.method == "POST" and formN.is_valid():
        print (request.POST)
        print (formN.cleaned_data)
        data  = formN.cleaned_data
        new_formN = formN.save()
        test_id = new_formN.id


    return render(request, 'landing/index.html', locals())
