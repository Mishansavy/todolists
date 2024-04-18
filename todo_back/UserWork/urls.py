from django.urls import path
from views import *
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path('register/user/', UserCreate.as_view(), name='create-user'),
    path('login/', UserLogin.as_view(), name="login"),
    path('logout/', LogOut.as_view(), name="logout"),
    #register/user/id/ individual user ko data herna
    path('register/user/<int:id>/', UserAPIIDView.as_view(), name='userid'),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]