# todolist/urls.py
from rest_framework import routers
from .views import TodoItems,todoitemsDelete,todoitemsUpdate
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
    path('update/<int:id>/', todoitemsUpdate.as_view()),
    path('update/',todoitemsUpdate.as_view()),
]


urlpatterns += router.urls
