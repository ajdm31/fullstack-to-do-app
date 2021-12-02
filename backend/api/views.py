from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, DestroyAPIView, RetrieveDestroyAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import viewsets

from .serializers import TodoSerializer
from .models import Todo

# Create your views here.

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def destroy(self, request, pk=None):      
        try:  
            instance = self.get_object()
            self.perform_destroy(instance)
            return JsonResponse({'success': True, 'msg':'delete successful' })
            
        except:
            return JsonResponse({'success': False, 'msg':'error, something went wrong' })

    

