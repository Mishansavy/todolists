from django.contrib import admin
from .models import TodoItem
from authentication.models import *
# Register your models here.
admin.site.register(TodoItem)
admin.site.register(CustomUser)