import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = 'k@w1h-n8r*i!67sj)+osn=t0m^b8vqsd5s#kf1f6c2wtt44m(z'

DEBUG = False

ALLOWED_HOSTS = ['timetoshop.pythonanywhere.com', 'timetoshop.herokuapp.com', '127.0.0.1']

CORS_ORIGIN_ALLOW_ALL = True

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, '/app/static/')
# ]

STATIC_ROOT = os.path.join(BASE_DIR, '/app/static/')

os.makedirs(STATIC_ROOT, exist_ok=True)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'test.sqlite3'),
    }
}
WHITENOISE_STATIC_PREFIX = '/'