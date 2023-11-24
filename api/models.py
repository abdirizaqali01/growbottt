from django.db import models



# Create your models here.
class users(models.Model):
   username = models.CharField(max_length=12, default="",unique=True, null=False)
   email = models.EmailField(max_length = 254, null=False)
   created_at = models.DateTimeField( auto_now_add=True)
