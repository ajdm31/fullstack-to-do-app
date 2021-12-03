from django.db import models

# Create your models here.
class Todo(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    is_complete = models.BooleanField(default=False)
    folder = models.IntegerField(null=True)

    def __str__(self):
        return self.body[0:50]

class Folder(models.Model):
    name = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name[0:50]