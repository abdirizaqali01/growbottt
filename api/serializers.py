from rest_framework import serializers
from .models import users
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('id', 'username', 'email', 'created_at')
