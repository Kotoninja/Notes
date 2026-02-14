from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        exclude = ["user"]

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.end_date = validated_data.get("end_date", instance.end_date)
        instance.completed = validated_data.get("completed", instance.completed)
        instance.save()
        return instance


class NoteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["title", "description", "project"]

    def create(self, validated_data):
        note = Note.objects.create(
            **{**validated_data, "completed": False},
        )
        return note


class NoteUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["title", "description", "completed", "end_date"]

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.end_date = validated_data.get("end_date", instance.end_date)
        instance.completed = validated_data.get("completed", instance.completed)
        instance.save()
        return instance


class NoteDetailOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        exclude = ["user", "project"]
