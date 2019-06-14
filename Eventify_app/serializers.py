from rest_framework import serializers
from Eventify_app.models import User, Location, Event

# User Serializer

class LocationSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True,
    )
    queryset = Event.objects.all()

    user = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.all()
    ) 
    
    class Meta:
        model = Location
        fields=('id', 'address', 'picture', 'guestsize', 'event', 'user')


class EventSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.all()
    )
    location = serializers.PrimaryKeyRelatedField(
        queryset = Location.objects.all()
    )
    class Meta:
        model = Event
        fields=('id', 'eventname', 'firstname', 'location', 'guestname')



class UserSerializer(serializers.ModelSerializer):
    location = LocationSerializer(many=True, required=False, read_only=True )

    event = EventSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = User
        fields=('id', 'firstname', 'location', 'eventname', 'lastname', 'address', 'picture' )
