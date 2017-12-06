from .forms import *
from django.http import JsonResponse
from django.shortcuts import render


def landing(request):

    return render(request, 'landing/landing.html', locals())

def home(request):
    formN = nametestForm(request.POST or None)

    if request.method == "POST" and formN.is_valid():
        data  = formN.cleaned_data
        new_formN = formN.save()
        test_id = new_formN.id

    return render(request, 'landing/index.html', locals())


def question_adding(request):
    return_dict = dict()
    data = request.POST
    print (request.POST)
    test_id = data.get("test_id")
    title = data.get("Q_title")
    number = data.get("Q_number")
    check = bool(data.get("Q_check"))
    test_id = nametest.objects.only('id').get(id=test_id)
    new_question = Question.objects.create(title=title, summa=number, tip=check, test_id=test_id)
    question_id = new_question.id
    return_dict["question_id"] = question_id
    return JsonResponse(return_dict)