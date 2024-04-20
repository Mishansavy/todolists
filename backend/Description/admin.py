from django.contrib import admin
from .models import TodoItem
from ..UserWork.models import CustomUser
# Register your models here.
admin.site.register(TodoItem)
admin.site.register(CustomUser)