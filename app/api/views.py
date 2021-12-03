from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework import viewsets

from .serializers import TodoSerializer, FolderSerializer, TodoSerializarFinal
from .models import Todo, Folder

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


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    
    def retrieve(self, request, pk=None):
        instance = self.get_object().id
        queryset = Todo.objects.filter(folder=instance)
        resp = []
        for element in queryset :
            resp.append(TodoSerializarFinal(element).data)

        return Response(resp)

    def destroy(self, request, pk=None): 
        try:   
            instance = self.get_object()        
            Todo.objects.filter(folder=instance.id).delete()        
            self.perform_destroy(instance)
            return JsonResponse({'success': True, 'msg':'delete successful' })  
        except:
            return JsonResponse({'success': False, 'msg':'error, something went wrong' })          
