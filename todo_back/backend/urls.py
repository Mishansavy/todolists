# todolist/urls.py
from rest_framework import routers
from .views import *
from django.urls import path
router = routers.DefaultRouter()
# router.register(r'todoitems', TodoItemViewSet)
# router.register(r'todouserview', TodoUserView)


urlpatterns = [
    # path('login/', UserLogin.as_view()),
    # path('logout/', UserLogout.as_view()),
    path('todoitems/', TodoItems.as_view()),
    path('todoitems/<int:id>/', TodoItems.as_view()),
    path('delete/<int:id>/', todoitemsDelete.as_view()), 
    path('delete/', todoitemsDelete.as_view()),
]


urlpatterns += router.urls
