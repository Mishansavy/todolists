from django.db import models
from django.contrib.auth.hashers import make_password
from authentication.models import CustomUser
# Create your models here.
# todolist/models.py

class TodoItem(models.Model):
    description = models.CharField(max_length=255, null=True, blank= True)
    created_by = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True  )
    
    def __str__(self):
        return str(self.description)
    

