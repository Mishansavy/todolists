# todolist/serializers.py
from rest_framework import serializers
from .models import TodoItem


class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = ['id',  'description', 'created_by', 'created_at']



    