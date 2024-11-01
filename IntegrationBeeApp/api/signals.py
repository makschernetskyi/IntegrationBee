from django.db.models.signals import pre_save
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

    if old_status != new_status and new_status in ['REQUEST_ACCEPTED', 'NOT_QUALIFIED', 'QUALIFIED']:
        send_status_update_email(instance)


def send_status_update_email(instance):

    user = instance.user
    competition = instance.competition
    status_display = instance.get_status_display()

    email_subject = f"Status Update: {competition.name} Integration Bee Competition"
    email_body = f"Dear {user.first_name},\n\n"
    email_body += f"Your status for the competition '{competition.name}' has been updated to: {status_display}.\n\n"

    if instance.status == 'REQUEST_ACCEPTED':
        email_body += (
            "Congratulations! Your request has been accepted. "
            "Please follow the information on our website and Instagram to not miss the mandatory preliminary round."
        )

    elif instance.status == 'NOT_QUALIFIED':
        email_body += (
            "Unfortunately, you did not qualify for the competition in the preliminary round. "
            "We wish you better luck next time."
        )

    elif instance.status == 'QUALIFIED':
        email_body += (
            "Great news! You have qualified for the competition after successfully passing the preliminary round. "
            "Please prepare for the next round; further details will be provided soon by mail."
        )

    email_body += "\n\nBest regards,\nIntegrationBee Team"

    send_mail(
        email_subject,
        email_body,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )

