from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Contact
from django.contrib.auth.models import User
from .serializers import ContactSerializer, UserRegistrationSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import BasePermission


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()


class IsRegisteredUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.has_usable_password()
    

class ContactList(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsRegisteredUser]


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsRegisteredUser]

