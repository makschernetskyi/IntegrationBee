

export const validSurnamePattern = /^[\u0020-\u007E\u00A0-\u00FF\u0100-\u024F\u0400-\u04FF\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\u0370-\u03FF\u0400-\u052F\u0531-\u058F\u1E00-\u1EFF\u0400-\u04FF\u1C80-\u1C8F\u0400-\u052F\u1C80-\u1C8F\u0100-\u024F\u1E00-\u1EFF\u0150-\u0170\u00C0-\u00FF\u0150-\u0170\u0152-\u0153\u00C0-\u00FF\- ]+$/;
export const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>|<script\b[^<]*\/>/gi