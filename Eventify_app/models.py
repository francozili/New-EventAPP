from django.db import models

# Create your models here.

class User(models.Model):
    firstname = models.CharField(default = '', max_length = 100)
    lastname = models.CharField(default = '', max_length = 100)
    picture = models.CharField(default = '', max_length = 100)
    phonenumber = models.IntegerField()
    email = models.EmailField(default = '', max_length = 100, unique=True)
    created_at = models.DateTimeField(auto_now_add = True)
    

    def __str__(self):
        return self.firstname



