from django.contrib import admin
from .models import *
from django.contrib import admin
from nested_inline.admin import NestedStackedInline, NestedModelAdmin




class AnswerInline(NestedStackedInline):
    model = Answer
    extra = 0

class QuestionInline(NestedStackedInline):
    model = Question
    extra = 0
    list_display = [field.name for field in Question._meta.fields]
    inlines = [AnswerInline]

class nametestAdmin (NestedModelAdmin):
    # list_display = ["name", "email"]
    list_display = [field.name for field in nametest._meta.fields]
#    list_filter = ['name',]
#    search_fields = ['name', 'email']
    inlines = [QuestionInline]
   # fields = ["name"]

    # exclude = ["email"]
	# inlines = [FieldMappingInline]
	# fields = []
    # #exclude = ["type"]
	# #list_filter = ('report_data',)
	# search_fields = ['category', 'subCategory', 'suggestKeyword']

    class Meta:
        model = nametest

admin.site.register(nametest, nametestAdmin)
