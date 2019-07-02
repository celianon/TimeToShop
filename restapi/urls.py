from django.urls import path

from .views import *


urlpatterns = [
  # API
  path('api/category/', CategoryCreateList.as_view()),
  path('api/category/<str:title>', CategoryDetail.as_view()),
  path('api/item/', ItemCreateList.as_view()),
  path('api/item/<str:slug>', ItemDetail.as_view()),
  path('api/review/', ReviewCreateList.as_view()),
  path('api/review/<str:slug>', ReviewDetail.as_view()),
  # render
  path('', CategoryList.as_view()),
  path('category/<str:title>/', CategoryList.as_view()),
  path('categories/', CategoryList.as_view()),
  path('item/<str:slug>/', CategoryList.as_view()),
  path('about/', CategoryList.as_view())
]