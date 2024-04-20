from rest_framework import serializers
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, required=False)
    class Meta:
        model = CustomUser
        fields = ("id",
                  "first_name", 
                  "middle_name", 
                  "last_name", 
                  'username',
                  "password", 
                  "email"
                  )

    def create(self, validated_data):
        
        user = CustomUser.objects.create_user(
                                              
                                              first_name = validated_data.get('first_name'),
                                              middle_name = validated_data.get('middle_name'),
                                              last_name = validated_data.get('last_name'),
                                              username = validated_data.get('username'),
                                              email=validated_data.get('email'),
                                              password = validated_data.get('password')
                                              ) 
        return user
    
