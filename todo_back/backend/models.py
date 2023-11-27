from django.db import models

# Create your models here.
# todolist/models.py

class TodoItem(models.Model):
    activity = models.CharField(max_length=255)
