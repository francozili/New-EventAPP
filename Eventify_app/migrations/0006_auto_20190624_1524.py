# Generated by Django 2.2.2 on 2019-06-24 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Eventify_app', '0005_auto_20190624_1519'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='picture',
            field=models.CharField(default='', max_length=1000000),
        ),
        migrations.AlterField(
            model_name='location',
            name='picture',
            field=models.CharField(default='', max_length=1000000),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.CharField(default='', max_length=1000000),
        ),
    ]