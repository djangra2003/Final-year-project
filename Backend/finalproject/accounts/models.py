from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add other custom fields if needed

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Change the related_name here
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions_set',  # Change the related_name here
        blank=True
    )
