from django.shortcuts import render, HttpResponse

# Create your views here.


def home(request):
    return render(request, 'www/index.html')


def list(request):
    return render(request, 'www/list.html')
