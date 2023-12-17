from django.shortcuts import render

# Create your views here.
# todolist/views.py
from rest_framework import viewsets
from .models import TodoItem
from .serializers import TodoItemSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404, HttpResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from django.contrib import auth
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import get_user_model
from authentication.views import *

User = get_user_model()
class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Data saved"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error":"Bad request"}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        user_id=request.user.id
        print("id: ", user_id)
        queryset = TodoItem.objects.filter(created_by=user_id)
        # queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)