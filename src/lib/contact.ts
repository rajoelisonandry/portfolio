/** Converts a display phone number ("+261 34 39 244 86") to a dialable `tel:` URI. */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function toMailtoHref(email: string): string {
  return `mailto:${email}`;
}
