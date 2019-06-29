import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'k@w1h-n8r*i!67sj)+osn=t0m^b8vqsd5s#kf1f6c2wtt44m(z'

DEBUG = False

ALLOWED_HOSTS = ['timetoshop.pythonanywhere.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
STATIC_ROOT = '/home/TimeToShop/static/'