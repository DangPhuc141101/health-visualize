from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pandas as pd
import json
# Create your views here.

def say_hello(request):
    return HttpResponse('Hello world')

def change_header(columns):
    for i,column in enumerate(columns):
        if "Unnamed: " in column:           
            columns[i] = column.replace("Unnamed: ", 'col')
    return columns

@api_view(['POST'])
def test(request):
    print("-------------------------------")
    if 'file' in request.FILES:
        # Handling csv file before save
        myfile = request.FILES['file'].file
        # print(request.GET.get('row'))
        skip_row = int(request.GET.get('row'))
        health = pd.read_csv(myfile, skiprows=skip_row)
        # print(health)         
        health = health.fillna('')
        health.columns = change_header(health.columns.values)
        health_types = dict()

        for col in health.columns:
            health_types[col] = str(health.dtypes[col])
        # res = json.dumps(health_types)
        #print(health_types)
        health_types = json.dumps(health_types)

        return Response({'health' : health, 'dtypes' : health_types})
    return Response({'err' : 'becareful'})