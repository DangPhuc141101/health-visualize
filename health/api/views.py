from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pandas as pd
# Create your views here.

def say_hello(request):
    return HttpResponse('Hello world')

@api_view(['POST'])
def test(request):
    print("-------------------------------")
    
    if 'file' in request.FILES:
        # Handling csv file before save
        myfile = request.FILES['file'].file
        print(request.GET.get('row'))
        skip_row = int(request.GET.get('row'))
        health = pd.read_csv(myfile, skiprows=skip_row)
        print(health)
        health = health.fillna('')
        return Response(health) 