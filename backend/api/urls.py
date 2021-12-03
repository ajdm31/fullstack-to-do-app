from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'todo', views.TodoViewSet)
router.register(r'folder', views.FolderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework')),
    path("folder/<int:id>", views.FolderViewSet, name="folder"),
    path("todo/<int:id>", views.TodoViewSet, name="todo")
 
]



