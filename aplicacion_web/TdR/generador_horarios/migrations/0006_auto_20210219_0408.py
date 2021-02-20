# Generated by Django 3.1.5 on 2021-02-19 07:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('generador_horarios', '0005_auto_20210219_0351'),
    ]

    operations = [
        migrations.AddField(
            model_name='alumno',
            name='agno_malla',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='malla_curricular',
            name='to_user',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='avance_academico',
            name='json_avance',
            field=models.JSONField(default=dict),
        ),
    ]
