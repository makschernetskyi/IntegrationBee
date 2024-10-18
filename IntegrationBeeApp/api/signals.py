from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

from api.models import UserToCompetitionRelationship


@receiver(pre_save, sender=UserToCompetitionRelationship)
def send_status_change_email(sender, instance, **kwargs):
    if instance.pk is None:
        return

    old_status = UserToCompetitionRelationship.objects.get(pk=instance.pk).status
    new_status = instance.status

    if old_status != new_status and new_status == 'R':
        send_status_update_email(instance)

    if old_status != new_status and new_status == 'N':
        send_status_update_email(instance)


def send_status_update_email(instance):
    """
    Sends an email to the user notifying them of their status change.
    """

    user = instance.user
    competition = instance.competition
    status = instance.get_status_display()

    email_subject = f"Status Update: {competition.name} Integration Bee Competition"
    email_body = f"Dear {user.first_name},\n\n"
    email_body += f"Your status for the competition '{competition.name}' has been updated to: {status}.\n"

    if instance.status == 'R':
        email_body += (
            "Congratulations! Your request has been accepted. "
            "Please follow the infos on our website and Instagram to not miss the mandatory preliminary round."
        )

    elif instance.status == 'N':
        email_body += "Unfortunately, you did not qualify for the competition. We wish you better luck next time."

    email_body += "\n\nBest regards,\nIntegrationBee Team"

    send_mail(
        email_subject,
        email_body,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )
