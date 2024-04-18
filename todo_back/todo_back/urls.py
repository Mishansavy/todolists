from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
#will know the static files location
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# from .views import *

# Create a router and register the TodoItemViewSet with a basename
router = DefaultRouter()
# router.register(r'todoitems', TodoItem, basename='todoitem')

urlpatterns = [
    # Include the router's URL patterns
    path('admin/', admin.site.urls),
    path('api/', include('todo_back.Description.urls')),
    path('accounts/', include('todo_back.UserWork.urls')),
      
]

urlpatterns += staticfiles_urlpatterns()