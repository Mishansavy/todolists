"""
WSGI config for todo_back project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_back.todo_back.settings')

application = get_wsgi_application()
# D:\Personal Project\todolists\todo_back\todo_back\wsgi.py