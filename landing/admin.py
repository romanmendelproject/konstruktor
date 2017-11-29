from django.contrib import admin
from .models import *


class ProductInOrderInline(admin.TabularInline):
    model = Question
    extra = 0

class nametestAdmin (admin.ModelAdmin):
    # list_display = ["name", "email"]
    list_display = [field.name for field in nametest._meta.fields]
#    list_filter = ['name',]
#    search_fields = ['name', 'email']
    inlines = [ProductInOrderInline]
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
