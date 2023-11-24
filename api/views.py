from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer
from .models import users
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
class userview(generics.ListAPIView):
    queryset = users.objects.all()
    serializer_class = RoomSerializer

#def signup(request):
 #   form = UserCreationForm
  #  context = {}