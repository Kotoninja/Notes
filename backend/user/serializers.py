from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import ParseError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": True}}

    def create(self, validated_data):
        if not User.objects.filter(email=validated_data["email"]).exists():
            user = User(
                username=validated_data["username"], email=validated_data["email"]
            )
            user.set_password(validated_data["password"])
            user.save()
            return user
        else:
            raise ParseError(
                detail={"email": "An account with this email exists."}, code=400
            )
