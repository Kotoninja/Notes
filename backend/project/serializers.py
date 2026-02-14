from rest_framework import serializers
from project.models import Project
from note.serializers import NoteDetailOutputSerializer


class ProjectOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "color", "created"]


class ProjectDetailOutputSerializer(serializers.ModelSerializer):
    notes = NoteDetailOutputSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        exclude = ["user"]


class ProjectInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        exclude = ["user"]
        read_only_fields = ["id", "created"]

    def create(self, validated_data):
        new_project = Project.objects.create(**validated_data)
        return new_project

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.color = validated_data.get("color", instance.color)
        instance.save()
        return instance
