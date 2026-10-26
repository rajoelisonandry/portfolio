/**
 * Supported languages. Every page lives under `/[lang]` (e.g. `/fr`, `/en`).
 */
export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

/** Cookie remembering the visitor's explicit language choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};

/** Open Graph locale codes. */
export const ogLocales: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export function hasLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}
