from django.contrib import admin
from .models import Category, Product

from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'quantity')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at')
    readonly_fields = ('created_at',)
    inlines = [OrderItemInline]
admin.site.register(Category)
admin.site.register(Product)

# Register your models here.
