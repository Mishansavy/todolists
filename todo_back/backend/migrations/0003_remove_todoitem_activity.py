# Generated by Django 4.2.7 on 2023-11-27 11:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_todoitem_description_alter_todoitem_activity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todoitem',
            name='activity',
        ),
    ]
