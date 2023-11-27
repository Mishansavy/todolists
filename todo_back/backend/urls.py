# todolist/urls.py
from rest_framework import routers
from .views import TodoItemViewSet

router = routers.DefaultRouter()
router.register(r'todoitems', TodoItemViewSet)

urlpatterns = router.urls
