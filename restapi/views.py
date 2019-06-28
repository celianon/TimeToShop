from django.shortcuts import render
from django.views import View
from django.db.models import Q
from rest_framework import generics

from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from django_filters import Filter

from .serializers import CategorySerializer, ItemSerializer, ReviewSerializer
from .models import Category, Item, Review


# API
class CategoryCreateList(generics.ListCreateAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  pagination_class = None

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  lookup_field = 'title'


class ListFilter(Filter):
  def filter(self, qs, value):
    if value:
      value_list = value.split(u',')
      query = Q()
      for val in value_list:
        query |= Q(types__icontains=val)

      return qs.filter(query)
    return qs

class ItemFilter(filters.FilterSet):
  min_prise = filters.NumberFilter(field_name="prise", lookup_expr='gte')
  max_prise = filters.NumberFilter(field_name="prise", lookup_expr='lte')
  types = ListFilter(field_name='types',)

  # TODO many values like types=1,2,3
  class Meta:
    model = Item
    fields = ['types', 'min_prise', 'max_prise']


class ItemCreateList(generics.ListCreateAPIView):
  serializer_class = ItemSerializer
  filter_backends = (SearchFilter, filters.DjangoFilterBackend)
  search_fields = ('title', 'description', 'props', 'prise')
  filterset_class = ItemFilter

  def get_queryset(self):
    queryset = Item.objects.all()
    category = self.request.query_params.get('category', None)

    if category != None:
      queryset = Item.objects.filter(category__title=category)
    return queryset


class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = ItemSerializer
  queryset = Item.objects.all()

  lookup_field = 'slug'


class ReviewCreateList(generics.ListCreateAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer


# render
class CategoryList(View):
  def get(self, request, title=None, slug=None):
    return render(request, 'restapi/categoty_list.html')
