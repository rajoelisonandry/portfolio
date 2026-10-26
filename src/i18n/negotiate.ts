import { defaultLocale, hasLocale, locales, type Locale } from "./config";

/**
 * Parses an `Accept-Language` header into language codes, by preference.
 * "en-US,en;q=0.9,fr;q=0.8" → ["en", "en", "fr"]
 */
export function parseAcceptLanguage(header: string | null): string[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((param) => param.trim().startsWith("q="));
      return {
        language: tag.trim().toLowerCase().split("-")[0],
        quality: q ? Number(q.trim().slice(2)) : 1,
      };
    })
    .filter(({ language, quality }) => language && quality > 0)
    .sort((a, b) => b.quality - a.quality)
    .map(({ language }) => language);
}

/**
 * Picks the visitor's locale: explicit choice (cookie) first, then the
 * browser's preferences, then the default locale.
 */
export function negotiateLocale({
  cookie,
  acceptLanguage,
}: {
  cookie?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  if (hasLocale(cookie)) return cookie;
  const preferred = parseAcceptLanguage(acceptLanguage ?? null).find(
    (language) => locales.includes(language as Locale),
  );
  return hasLocale(preferred) ? preferred : defaultLocale;
}
