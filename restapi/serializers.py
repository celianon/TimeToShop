from rest_framework import serializers, pagination
from rest_framework.settings import api_settings

from .models import Review, Item, Category
from .pagination import CustomPagination

class CategoryNameSer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ('title', )


class ReviewSerializer(serializers.ModelSerializer):
  class Meta:
    model = Review
    fields = ('id', 'nickname', 'stars', 'body', 'item')


class ItemSerializer(serializers.ModelSerializer):
  image_url = serializers.SerializerMethodField()
  category = CategoryNameSer(read_only=True)
  reviews = ReviewSerializer(many=True, read_only=True)

  class Meta:
    model = Item
    fields = ('id', 'title', 'reviews', 'types', 'img', 'image_url', 'slug', 'category', 'props', 'description', 'stars', 'prise')


  def get_image_url(self, obj):
    return obj.img.url


class CategorySerializer(serializers.ModelSerializer):
  image_url = serializers.SerializerMethodField()
  item = serializers.SerializerMethodField('paginated_item')

  class Meta:
    model = Category
    fields = ('title', 'img', 'image_url', 'item', 'filters', 'properties')

  def paginated_item(self, obj):
    print(f'self: \n{self},\n context: {self.context},')
    item = Item.objects.filter(category=obj)
    paginator = pagination.PageNumberPagination()
    page = paginator.paginate_queryset(item, self.context.get("request"))
    serializer = ItemSerializer(page, many=True, context={'request': self.context.get("request")})
    return serializer.data

  def get_image_url(self, obj):
    return obj.img.url
