from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Contact
from django.contrib.auth.models import User
from .serializers import ContactSerializer, UserRegistrationSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import Token
from rest_framework.decorators import api_view, permission_classes


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
    

@api_view(['GET'])
@permission_classes([IsRegisteredUser])
def get_user_info(request):
    user = request.user
    user_data = {
        'id': user.id,
        'username': user.username,
    }
    return Response(user_data)


class ContactList(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsRegisteredUser]

    def get_queryset(self):
        user_id = self.request.query_params.get('owner')
        if user_id.isdigit():
            user_id = int(user_id)
        return Contact.objects.filter(owner=user_id)

    def perform_create(self, serializer):
            # Using the user ID obtained from the get_user_info endpoint
            user_id = self.request.data.get('owner')
            serializer.save(owner=user_id)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsRegisteredUser]

