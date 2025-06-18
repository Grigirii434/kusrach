from rest_framework import serializers
from .models import Product, Category
from .models import Order, OrderItem, Product
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'image', 'category', 'category_id']

class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    class Meta:
        model = OrderItem
        fields = ['product_id', 'quantity']


class OrderCreateSerializer(serializers.Serializer):
    items = OrderItemSerializer(many=True)

    def create(self, validated_data):
        items_data = validated_data['items']
        order = Order.objects.create()
        for item in items_data:
            product = Product.objects.get(pk=item['product_id'])
            OrderItem.objects.create(order=order, product=product, quantity=item['quantity'])
        return order