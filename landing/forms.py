from django import forms
from .models import *


class nametestForm(forms.ModelForm):

    class Meta:
        model = nametest
        exclude = [""]

