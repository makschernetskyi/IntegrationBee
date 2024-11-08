import DOMPurify from 'dompurify';

function linkify(text: string): string {
  // Regex for emails
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g;
  // Regex for phone numbers (international format)
  const phoneRegex = /(\+?\d[\d\s\-\(\)]{7,}\d)/g;
  // Regex for URLs
  const urlRegex = /(https?:\/\/[^\s<]+)/g;

  // Replace emails with mailto links
  let linkedText = text.replace(emailRegex, '<a href="mailto:$1">$1</a>');

  // Replace phone numbers with tel links
  linkedText = linkedText.replace(phoneRegex, '<a href="tel:$1">$1</a>');

  // Replace URLs with clickable links
  linkedText = linkedText.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

  return linkedText;
}

export function sanitizeHtml(rawHtml: string): string {
  // Sanitize the raw HTML to remove dangerous elements
  const cleanHtml = DOMPurify.sanitize(rawHtml.replace(`\\`, ''), {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li',
      'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
    FORBID_TAGS: ['script', 'style', 'iframe'],
    FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
  });

  // Process the text content to linkify emails, phone numbers, and URLs
  const linkedHtml = linkify(cleanHtml);

  return linkedHtml;
}
