# Generated by Django 4.2.7 on 2023-12-01 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_remove_todoitem_activity'),
    ]

    operations = [
        migrations.AddField(
            model_name='todoitem',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
