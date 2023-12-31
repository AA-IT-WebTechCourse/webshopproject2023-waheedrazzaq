"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from myapp.views import items, populate_database , search, signup_view, user_login,add_item,add_to_cart,get_all_users,get_cart,auth_status

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/items', items, name='items'),
    path('api/populate_database', populate_database, name='populate_database'),
    path('api/search', search, name='search'),
    path('api/user_login', user_login, name='user_login'),
    path('api/signup', signup_view, name='signup_view'),
    path('api/add_item', add_item, name='add_item'),
    path('api/cart/add/<int:item_id>', add_to_cart, name='add_to_cart'),
    path('api/get_all_users', get_all_users, name='get_all_users'),
    path('api/cart', get_cart, name='get_cart'),
    path('api/auth-status', auth_status, name='auth_status'),
]
