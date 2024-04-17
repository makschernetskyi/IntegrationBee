


export const formatLinksInText = (text) =>{
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

  // Replace each found email with a link
  return text.replace(emailRegex, function(email) {
    return `<a href="mailto:${email}" aria-label="email to: ${email}">${email}</a>`;
  });
}