from django.db import models
from PIL import Image
from django import forms
from django.utils.text import slugify
import random


class Category(models.Model):
  title = models.CharField(max_length=100, unique=True)
  slug = models.SlugField(max_length=300, blank=True, null=True)
  img = models.ImageField(upload_to='')
  filters = models.TextField(max_length=800, blank=True, help_text='Filters by which you can search, write a comma')
  properties = models.TextField(max_length=800, blank=True, help_text='Possible properties of items in this category, write a comma')
  
  def save(self, *args, **kwargs):
    self.slug = f'{slugify(self.title)}-{random.randint(100, 10000)}'
    self.filters = self.filters.lower()
    super().save(*args, **kwargs)

  def __str__(self):
    return self.title


class Item(models.Model):
  title = models.CharField(max_length=300)
  slug = models.SlugField(max_length=300, unique=True)
  category = models.ForeignKey('Category', related_name='item', on_delete=models.CASCADE)
  description = models.TextField(max_length=3000)
  props = models.TextField(max_length=1000, help_text='Possible properties of item like this - "Color: red", write a comma')
  img = models.ImageField(upload_to='')
  stars = models.FloatField()
  prise = models.FloatField()
  types = models.CharField(max_length=300, blank=True)

  def save(self, *args, **kwargs):
    self.slug = f'{slugify(self.title)}-{random.randint(100, 10000)}'
    self.types = self.types.lower()
    super().save(*args, **kwargs)

  def __str__(self):
    return self.title


class Review(models.Model):
  nickname = models.CharField(max_length=100)
  stars = models.FloatField()
  body = models.TextField(max_length=500)
  item = models.ForeignKey(Item, related_name='reviews', on_delete=models.CASCADE)

  def __str__(self):
    return self.nickname