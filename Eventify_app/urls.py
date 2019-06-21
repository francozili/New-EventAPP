# tunr_app/urls.py
from django.urls import path, include
# from .views import EventViewSet, LocationViewSet, UserViewSet
from rest_framework import routers 
from . import views


router = routers.SimpleRouter()

router.register('events', views.EventViewSet)
router.register('locations', views.LocationViewSet)
router.register('users', views.UserViewSet)

# urlpatterns = [
#     path('',include(router.urls)),
#     path('markets/<int:zip_code>/', views.MarketView, name="markets")
# ]

# urlpatterns = [
#     path('events', EventViewSet.as_view()),
#     path('<pk>', EventDetailViewSet.as_view()),
#     path('locations', LocationViewSet.as_view()),
#     path('<pk>', LocationDetailViewSet.as_view()),
#     path('users', UserViewSet.as_view()),
#     path('<pk>', UserDetailViewSet.as_view()),
# ]

# router = routers.DefaultRouter()

# router.register('events', EventViewSet)
# router.register('locations', LocationViewSet)
# router.register('users', UserViewSet)
# router.register('events', EventDetailViewSet)
# router.register('locations', LocationDetailViewSet)
# router.register('users', UserDetailViewSet)

urlpatterns = router.urls