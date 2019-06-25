from django.db import models

# Create your models here.

class User(models.Model):
    firstname = models.CharField(default = '', max_length = 100)
    lastname = models.CharField(default = '', max_length = 100)
    picture = models.CharField(default = '', max_length = 1000000)
    phonenumber = models.CharField(default = '', max_length = 100)
    email = models.EmailField(default = '', max_length = 100, unique=True)
    created_at = models.DateTimeField(auto_now_add = True)
    

    def __str__(self):
        return self.firstname


class Location(models.Model):
    address = models.CharField(default = '', max_length = 100)
    picture = models.CharField(default = '', max_length = 1000000)
    guestsize = models.IntegerField()
    email = models.EmailField(default = '', max_length = 100, unique=True)
    
    def __str__(self):
        return self.address

class Event(models.Model):
    eventname = models.CharField(default = '', max_length = 100)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='events')
    guest = models.IntegerField()
    picture = models.CharField(default = '', max_length = 1000000)
    def __str__(self):
        return self.eventname