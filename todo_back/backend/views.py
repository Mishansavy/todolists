from django.shortcuts import render

# Create your views here.
# todolist/views.py
from rest_framework import viewsets
from .models import TodoItem
from .serializers import TodoItemSerializer

class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
