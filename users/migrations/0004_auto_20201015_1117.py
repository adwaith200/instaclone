# Generated by Django 3.1.1 on 2020-10-15 05:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_followers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='followers',
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('followeeid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followee', to='users.user')),
                ('followerid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follower', to='users.user')),
            ],
            options={
                'unique_together': {('followerid', 'followeeid')},
            },
        ),
    ]