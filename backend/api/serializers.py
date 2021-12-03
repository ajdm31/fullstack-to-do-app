from rest_framework import serializers
from .models import Todo, Folder

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'body', 'created', 'updated', 'is_complete','folder')


class FolderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Folder
        fields = ('id', 'name', 'created', 'updated')

class TodoSerializarFinal(serializers.Serializer):
    id = serializers.IntegerField()
    body = serializers.CharField()
    is_complete = serializers.BooleanField()