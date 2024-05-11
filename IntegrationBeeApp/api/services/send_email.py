from django.core.mail import EmailMessage, get_connection
from django.conf import settings
from typing import List


def send_email(recipient_list: List[str], message:str, subject: str = '', email_from: str = "info@integrationbee.at", is_html:bool = False):
    """
    function sends an email via smtp
    args: recipient_list: List[str], message:str, subject: str = '',
     email_from: str = "integrationbee.at", is_html:bool = False
    """
    with get_connection(
            host=settings.EMAIL_HOST,
            port=settings.EMAIL_PORT,
            username=settings.EMAIL_HOST_USER,
            password=settings.EMAIL_HOST_PASSWORD,
            use_tls=settings.EMAIL_USE_TLS
    ) as connection:
        msg = EmailMessage(subject, message, email_from, recipient_list, connection=connection)
        if is_html:
            msg.content_subtype = "html"
        msg.send()

