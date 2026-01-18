from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


@api_view(["GET"])
def check(request):
    return Response(data={"status": "ok"}, status=status.HTTP_200_OK)
