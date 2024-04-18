# todolist/views.py
from django.contrib.auth.models import User
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import BasePermission, AllowAny, IsAuthenticated
# from .renderers import UserRenderer
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import permission_classes

from UserWork.serializers import *
from django.http import JsonResponse
User = get_user_model()
# backend/views.py
from rest_framework import viewsets
from .serializers import TodoItemSerializer
from .models import TodoItem

# class TodoItemViewSet(viewsets.ModelViewSet):
#     queryset = TodoItem.objects.all()
#     serializer_class = TodoItemSerializer
@permission_classes([AllowAny])
class TodoItems(APIView) :
    def get_object(self, id):
        try:
            user = CustomUser.objects.get(id=id)
            return user
        except CustomUser.DoesNotExist:
            return None
        
    def get(self, request, id):
        response = CustomResponse()
        instance = self.get_object(id)
        if not instance:
            return Response(response.errorResponse(404, "Nothing Found"), status=status.HTTP_404_NOT_FOUND)
        todo_list = TodoItem.objects.filter(created_by=instance)
        serializer = TodoItemSerializer(todo_list,many=True)
        return Response(response.successResponse(200, "User List", serializer.data), status=status.HTTP_200_OK)

    def post(self, request):
        response = CustomResponse()
        
        data = {
            "created_by":request.data.get("created_by"),
            "description":request.data.get("description")
        }
        serializer = TodoItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(response.successResponse(200, "Todo has been created Succesfully!", serializer.data), status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(response.errorResponse(400, "Something went wrong", serializer.errors), status=status.HTTP_400_BAD_REQUEST)
    

    
class todoitemsDelete(APIView):
    def get_object(self, id):
        try:
            user = TodoItem.objects.get(id=id)
            return user
        except TodoItem.DoesNotExist:
            return None
        
    def get(self, request):
        response = CustomResponse()
        # instance = self.get_object(id)
        # if not instance:
        #     return Response(response.errorResponse(404, "Nothing Found"), status=status.HTTP_404_NOT_FOUND)
        todo_list = TodoItem.objects.all()
        serializer = TodoItemSerializer(todo_list,many=True)
        return Response(response.successResponse(200, "User List", serializer.data), status=status.HTTP_200_OK)

    def delete(self, request, id):
        # print("I am here")
        response = CustomResponse()
        instance = self.get_object(id)
        if not instance:
            return Response(response.errorResponse(404,"Todo Item not found"), status=status.HTTP_404_NOT_FOUND)
        
        instance.delete()
        return Response(response.successResponse(200, "Todo has been deleted successufully"), status=status.HTTP_200_OK)
    
class todoitemsUpdate(APIView):
    def get_object(self, id):
        try:
            todo_item = TodoItem.objects.get(id=id)
            return todo_item
        except TodoItem.DoesNotExist:
            return None
        
    def patch (self, request, id):
        response = CustomResponse()
        instance = self.get_object(id=id)
        if not instance:
            return Response(response.errorResponse(404, "Todo Item not found"), status=status.HTTP_404_NOT_FOUND)
        data = {
            "created_by_id": request.user.id,
            "description": request.data.get("description")
        }
        serializer = TodoItemSerializerUpdate(instance=instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(response.successResponse(200, "Todo has  been updated succesfully", serializer.data), status=status.HTTP_200_OK)
        
        return JsonResponse(response.errorResponse(400, "Something went wrong", serializer.errors), status=status.HTTP_400_BAD_REQUEST)

class CustomResponse():
    def successResponseToken(self, code, refresh, access, msg, data=dict()):
        context = {
            "status_code": code,
            "message": msg,
            "data": data,
            "error": []
        }
        return context
    
    def successResponse(self, code, msg, description=dict()):
        context = {
            "status_code": code,
            "message": msg,
            "description": description,
            "error": []
        }
        return context
    
    def successResponseData(self, code, msg, data=dict()):
        context = {
            "status_code": code,
            "message": msg,
            "data": data,
            "error": []
        }
        return context
    
    def errorResponse(self, status_code, msg, errors=dict()):
        res = {
            "status_code": status_code,
            "message": msg,
            "data": [],
            "error": errors
        }
        return res

class UserCreate(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [TokenAuthentication]  # You can add custom permission classes here if needed
    def get(self, request):
        print("Users: ", request.user)
        response = CustomResponse()
        user = CustomUser.objects.all()
        if not user:
            return Response(response.errorResponse(404, "No User found"), status=status.HTTP_404_NOT_FOUND)
        serializer = UserRegistrationSerializer(user, many=True)
        return Response(response.successResponse(200, "User Lists", serializer.data), status=status.HTTP_200_OK)

    def post(self, request):
        response = CustomResponse()
        user = request.user
       
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response(response.successResponse(200, "User has been created Succesfully!", serializer.data), status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(response.errorResponse(400, "Something went wrong", serializer.errors), status=status.HTTP_400_BAD_REQUEST)

class UserAPIIDView(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [TokenAuthentication]  # You can add custom permission classes here if needed
    def get_object(self, id):
        try:
            user = CustomUser.objects.get(id=id)
            return user
        except CustomUser.DoesNotExist:
            return None
        
    def get(self, request, id):
        response = CustomResponse()
        instance = self.get_object(id)
        if not instance:
            return Response(response.errorResponse(404, "Nothing Found"), status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserRegistrationSerializer(instance)
        return Response(response.successResponse(200, "User List", serializer.data), status=status.HTTP_200_OK)

    def put(self, request, id):
        user = request.user
        if not user.is_superuser:
            return Response(response.errorResponse(401, "You are not authorized for this action"), status=status.HTTP_401_UNAUTHORIZED)
        response = CustomResponse()
        instance = self.get_object(id)
        if not instance:
            return Response(response.errorResponse(404, "Nothing Found"), status=status.HTTP_404_NOT_FOUND)
        serializer = UserRegistrationSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(response.successResponse(200, "User Details Updated Successfully", serializer.data), status=status.HTTP_200_OK)
        # Provide more detailed error messages
        error_details = serializer.errors
        return Response(response.errorResponse(400, "Bad Request", errors=error_details), status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user = request.user
        if not user.is_superuser:
            return Response(response.errorResponse(401, "You are not authorized for this action"), status=status.HTTP_401_UNAUTHORIZED)
        response = CustomResponse()
        instance = self.get_object(id)
        if not instance:
            return Response(response.errorResponse(404, "Nothing Found"), status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        return Response(response.successResponse(200, "User Deleted Successfully"), status=status.HTTP_200_OK)

class UserLogin(APIView):
    def post(self, request):
        response = CustomResponse()
        username = request.data.get('username')
        password = request.data.get('password')

        users = authenticate(request, username=username, password=password)
        if users:
            login(request, users)
            
            data = {
                "user_id" : request.user.id,
                "user_name" : request.user.username,
            }
            print(data)
            
            return Response({"result": "logged in", "user_data": data}, status=status.HTTP_200_OK)
        else:
            return Response(response.errorResponse(400, "Username or Password is incorrect"), status=status.HTTP_400_BAD_REQUEST)

class LogOut(APIView):
    def get(self, request):
        print("user: ", request.user)
        response = CustomResponse()
        user = request
        
        logout(user)
        return Response(response.successResponseData(200, "You have successfully Logged Out"), status=status.HTTP_200_OK)
