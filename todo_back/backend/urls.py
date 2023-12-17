# todolist/urls.py
from rest_framework import routers
from .views import *
from django.urls import path
router = routers.DefaultRouter()
router.register(r'todoitems', TodoItemViewSet)
# router.register(r'todouserview', TodoUserView)


urlpatterns = [
    # path('login/', UserLogin.as_view()),
    # path('logout/', UserLogout.as_view()),
]


urlpatterns += router.urls
