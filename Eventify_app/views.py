from rest_framework import viewsets
from django.shortcuts import render
from .serializers import UserSerializer, EventSerializer, LocationSerializer
from .models import Event, User, Location
import requests
from django.http import JsonResponse, HttpResponse

# Create your views here.

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
