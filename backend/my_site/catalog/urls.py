from django.urls import path
from .views import ProductListView
from .views import CreateOrderView
urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('orders/create/', CreateOrderView.as_view(), name='create-order'),
]