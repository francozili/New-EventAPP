from django.db import models

# Create your models here.

class User(models.Model):
    firstname = models.CharField(default = '', max_length = 100)
    lastname = models.CharField(default = '', max_length = 100)
    picture = models.CharField(default = '', max_length = 100)
    phonenumber = models.CharField(default = '', max_length = 100)
    email = models.EmailField(default = '', max_length = 100, unique=True)
    created_at = models.DateTimeField(auto_now_add = True)
    

    def __str__(self):
        return self.picture


class Event(models.Model):
    eventname = models.CharField(default = '', max_length = 100)
    location = models.CharField(default = '', max_length = 100)
    guest = models.IntegerField()
    
    def __str__(self):
        return self.eventname

class Location(models.Model):
    address = models.CharField(default = '', max_length = 100)
    picture = models.CharField(default = '', max_length = 100)
    guestsize = models.IntegerField()
    email = models.EmailField(default = '', max_length = 100, unique=True)
    
    def __str__(self):
        return self.address