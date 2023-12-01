from django.db import models

# Create your models here.
# todolist/models.py

class TodoItem(models.Model):
    description = models.CharField(max_length=255, null=True, blank= True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True  )

    def __str__(self):
        return self.description