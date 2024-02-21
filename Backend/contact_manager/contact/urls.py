from django.urls import path
from .views import ContactList, ContactDetail, UserRegistrationView

urlpatterns = [
    path('contacts/', ContactList.as_view(), name='contact-list'),
    path('contacts/<int:pk>/', ContactDetail.as_view(), name='contact-detail'),
    path('user/register/', UserRegistrationView.as_view(), name='user-registration'),
]
