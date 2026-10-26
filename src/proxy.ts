import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, locales } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiate";

/**
 * Sends visitors without a language prefix (e.g. `/`) to `/fr` or `/en`,
 * based on their saved choice, then their browser language.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocalePrefix) return;

  const locale = negotiateLocale({
    cookie: request.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get("accept-language"),
  });
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip the API, Next.js internals and any file with an extension
  // (icons, sitemap.xml, robots.txt, favicon.ico…).
  matcher: ["/((?!api|_next|.*\..*).*)"],
};
