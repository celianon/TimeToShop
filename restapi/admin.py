from django.contrib import admin

from .models import Category, Item, Review

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'filters' )
    list_display_links  = ('title', )
    prepopulated_fields = {'slug': ('title', )}
    search_fields = ('title', 'filters')

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_filter = ('category', )
    list_display = ('title', 'category', 'types', 'props', 'stars', 'prise')
    prepopulated_fields = {'slug': ('title', )}
    search_fields = ('title', 'types', 'stars', 'prise')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    search_fields = ('item', 'nickname', 'body')
    list_display = ('nickname', 'item', 'body', 'stars')
