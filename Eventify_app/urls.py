# tunr_app/urls.py
from django.urls import path, include
from .views import EventViewSet, LocationViewSet, UserViewSet
from rest_framework import routers


router = routers.SimpleRouter()

router.register('events', EventViewSet)
router.register('locations', LocationViewSet)
router.register('users', UserViewSet)

urlpatterns = router.urls