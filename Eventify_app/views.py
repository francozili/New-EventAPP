from rest_framework import viewsets
from django.shortcuts import render
from .serializers import UserSerializer, EventSerializer, LocationSerializer
from .models import Event, User, Location
# import requests
from django.http import JsonResponse, HttpResponse



class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
# class EventDetailViewSet(viewsets.ModelViewSet):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer

# class LocationDetailViewSet(viewsets.ModelViewSet):
#     queryset = Location.objects.all()
#     serializer_class = LocationSerializer

# class UserDetailViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class EventViewSet(ListAPIView):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer

# class LocationViewSet(ListAPIView):
#     queryset = Location.objects.all()
#     serializer_class = LocationSerializer

# class UserViewSet(ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class EventDetailViewSet(RetrieveAPIView):
#     queryset = Event.objects.all()
#     serializer_class = EventSerializer

# class LocationDetailViewSet(RetrieveAPIView):
#     queryset = Location.objects.all()
#     serializer_class = LocationSerializer

# class UserDetailViewSet(RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer