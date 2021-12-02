from django.db import models

# Create your models here.
class Todo(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    is_complete = models.BooleanField(default=False)

    def __str__(self):
        return self.body[0:50]