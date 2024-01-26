# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include('backend.urls')),
#     path('accounts/', include('authentication.urls')),

# ]
# from chatgpt 
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

# from .views import *

# Create a router and register the TodoItemViewSet with a basename
router = DefaultRouter()
# router.register(r'todoitems', TodoItem, basename='todoitem')

urlpatterns = [
    # Include the router's URL patterns
    path('admin/', admin.site.urls),
    path('api/', include('backend.urls')),
    path('accounts/', include('authentication.urls')),
      
]
