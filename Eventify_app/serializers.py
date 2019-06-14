from rest_framework import serializers
from Eventify_app.models import User, Location, Event

# User Serializer

class LocationSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(
        queryset = Event.objects.all()
        many=True,
        read_only=True
        
        
    )
    user = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.all()
    ) 
    
    class Meta:
        model = Location
        fields=('id', '__all__', 'event', 'user')


class EventSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.all()
    )
    location = serializers.PrimaryKeyRelatedField(
        queryset = Location.objects.all()
    )
    class Meta:
        model = Event
        fields=('id', '__all__', 'user', 'location')



class UserSerializer(serializers.ModelSerializer):
    location = LocationSerializer(many=True, required=False, read_only=True )

    event = EventSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = User
        fields=('id', '__all__', 'location', 'event')
