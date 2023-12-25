from django.shortcuts import render
from rest_framework.response import Response
# Create your views here.
# todolist/views.py
#login
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.authtoken.models import Token
# from django.contrib.auth import authenticate, login
# *************
from rest_framework import viewsets
from .models import TodoItem
from .serializers import TodoItemSerializer

class TodoItemViewSet(viewsets.ModelViewSet):
    # user=request.user
    # queryset = TodoItem.objects.filter(
    #     id= user.id
    # )
    # order_by('-created_at')
    serializer_class = TodoItemSerializer
