# Generated by Django 4.2.7 on 2023-11-27 11:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todoitem',
            name='description',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='todoitem',
            name='activity',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
