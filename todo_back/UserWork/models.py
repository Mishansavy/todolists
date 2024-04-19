from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from manager import *


class CustomUser(AbstractUser):

    username = models.CharField(max_length = 50, unique = True)
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=50)
    created_date = models.DateField(auto_now_add=True)
    updated_date = models.DateField(auto_now=True)
    
    def __str__(self):
        return self.username
    
    objects = UserManager()
    # USERNAME_FIELD = 'username'
    REQUIRED_FIELDS=[]
    
    