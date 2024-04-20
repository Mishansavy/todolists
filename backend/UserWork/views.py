from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate,login, logout
# from rest_framework import authentication
from rest_framework.permissions import  AllowAny
# from .renderers import UserRenderer
from rest_framework.exceptions import PermissionDenied
from .serializers import UserRegistrationSerializer
from .models import CustomUser
from rest_framework.decorators import permission_classes

User = get_user_model()

class CustomResponse():
    def successResponseToken(self,code,refresh, access, msg, data=dict()):
        context = {
            "status_code": code,
            "message": msg,
            "data": data,
            "error": []
        }
        return context
    
    def successResponse(self, code, msg,navigation=dict()):
        context = {
            "status_code": code,
            "message": msg,
            "navigation":navigation,
            "error": []
        }
        return context
    
    def successResponseData(self, code, msg,data=dict()):
        context = {
            "status_code": code,
            "message": msg,
            "data":data,
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

@permission_classes([AllowAny])
class UserCreate(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        print("Users: ", request.user)
        response=CustomResponse()
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
    # permission_classes = [IsAuthenticated]

    def get_object(self, id):
        try:
            user = CustomUser.objects.get(id=id)
            return user
        except:
            CustomUser.DoesNotExist
            return None
        
    def get(self, request, id):
        response = CustomResponse()
        instance = self.get_object(id)
        if not instance:
            return Response(response.errorResponse(404, "Nothing Found"), status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserRegistrationSerializer(instance)
        return Response(response.successResponse(200, "User List", serializer.data), status=status.HTTP_200_OK)

            
    def put (self, request, id):
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
        return Response(response.errorResponse(400, "Bad Request"), status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        user = request.user
        if not user.is_superuser:
            return Response(response.errorResponse(401, "You are not authorized for this action"), status=status.HTTP_401_UNAUTHORIZED)
        response = CustomResponse()
        instance = self.get_object(id)
        if not instance:
            return Response(response.errorResponse(404, "Nothing Found"), status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        return Response(response.successResponse(200, "User Deleted Successfully"),status=status.HTTP_200_OK)

@permission_classes([AllowAny])
class UserLogin(APIView):
    # authentication_classes = ['JWTAuthentication']
    print("is UserLogin class is also calling for login?")

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
            return Response({"result": "logged in", "user_data":data}, status=status.HTTP_200_OK)
        else:
            return Response(response.errorResponse(400, "Username or Password is incorrect"), status=status.HTTP_400_BAD_REQUEST)
        # user = CustomUser.objects.filter(username=username).first()  
        
        # if not user:
        #     return Response(response.errorResponse(404, "User not Found"), status=status.HTTP_404_NOT_FOUND)

        # if check_password(password, user.password):
        #     token,_  = Token.objects.get_or_create(user=user)
        #     return Response(response.successResponse(200, "Logged in Successfully", {"token": token.key}), status=status.HTTP_200_OK)
        # else:
        #     return Response(response.errorResponse(400, "Username or Password is incorrect"), status=status.HTTP_400_BAD_REQUEST)
         
@permission_classes([AllowAny])
class LogOut(APIView):
    def get(self, request):
        print("user: ", request.user)
        response = CustomResponse()
        user = request
        
        logout(user)
        return Response(response.successResponseData(200, "You have successfully Logged Out"), status=status.HTTP_200_OK)