from django.contrib import admin
from django.urls import path, include
from manager.views import register_user, user_info
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/catalog/', include('catalog.urls')),
    path('api/register/', register_user),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/user-info/', user_info),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)