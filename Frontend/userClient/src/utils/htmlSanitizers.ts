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
  // DOMPurify handles UTF-8 encoding correctly by default
  const cleanHtml = DOMPurify.sanitize(rawHtml.replace(`\\`, ''), {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li',
      'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
    FORBID_TAGS: ['script', 'style', 'iframe'],
    FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
    USE_PROFILES: { html: true },
    // Preserve UTF-8 encoding
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });

  // Ensure all images have alt attributes for accessibility
  const tempDiv = document.createElement('div');
  // Set charset to ensure UTF-8 is preserved
  tempDiv.setAttribute('data-charset', 'utf-8');
  tempDiv.innerHTML = cleanHtml;
  const images = tempDiv.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.getAttribute('alt') || img.getAttribute('alt') === '') {
      // Extract filename from src as fallback alt text
      const src = img.getAttribute('src') || '';
      const filename = src.split('/').pop()?.split('.')[0] || 'News image';
      img.setAttribute('alt', filename);
    }
  });

  // Process the text content to linkify emails, phone numbers, and URLs
  // const linkedHtml = linkify(tempDiv.innerHTML);

  // return linkedHtml;
  return tempDiv.innerHTML;
}
