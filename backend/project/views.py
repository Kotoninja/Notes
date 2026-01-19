from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from project.models import Project
from rest_framework.permissions import IsAuthenticated

class ProjectAPI(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated,]

    
    
    def list(self, request):
        