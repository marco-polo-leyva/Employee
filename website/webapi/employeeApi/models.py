from django.db import models
from django.utils import timezone
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Employee(models.Model):
    MALE = 'M'
    FEMALE = 'F'
    ADMINISTRATOR = 'Administrator'
    GUEST = 'Guest'

    GENDER_CHOICE = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    )
    ROLE_CHOICE = (
        (ADMINISTRATOR, 'Administrator'),
        (GUEST, 'Guest'),
    )

    name = models.CharField(max_length=50, blank=False)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICE, default=MALE)
    email = models.CharField(max_length=50, unique=True)
    startDate = models.DateField(default=timezone.now)
    role = models.CharField(max_length=50, choices=ROLE_CHOICE, default=GUEST)

    class Meta:
        ordering = ('name',)
