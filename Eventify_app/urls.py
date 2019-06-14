# tunr_app/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
]
from .views import ItemViewSet, PantryViewSet, UserProfileViewSet
from rest_framework import routers


router = routers.SimpleRouter()

router.register('items', ItemViewSet)
router.register('pantries', PantryViewSet)
router.register('userprofiles', UserProfileViewSet)

urlpatterns = router.urls