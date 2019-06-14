from rest_framework import serializers
from Eventify_app.models import User, Location

# User Serializer

class LocationSerializer(serializers.ModelSerializer):
    events = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
        
        
    )
    user = serializers.PrimaryKeyRelatedField(
        queryset = UserProfile.objects.all()
    ) 
    
    class Meta:
        model = Location
        fields=('id', '__all__', 'events', 'user')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'