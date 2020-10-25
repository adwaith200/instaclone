# from rest_framework import serializers
# from .models import Tag

# class TagSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Tag 
#         fields='__all__'

from rest_framework import serializers

from .models import Tag
from posts.models import Post

# Used for adding posts for a particular tag
class PostTagSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=['id','photo','location','caption','user']

from posts.models import Post

 

# Used for adding posts for a particular tag

class PostTagSerializer(serializers.ModelSerializer):

    class Meta:

        model=Post

        fields=['id','photo','location','caption','user']

 

class TagSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    posts=PostTagSerializer(many=True,read_only=True)
=======

    posts=PostTagSerializer(many=True,read_only=True)

>>>>>>> 47f6af80c8d15cc5d8efb3ff7c52fe66eded8680
    class Meta:

        model=Tag 

        fields='__all__'

        