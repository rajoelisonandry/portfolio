"use client";

import Link from "next/link";
import {
  LOCALE_COOKIE,
  locales,
  localeNames,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/cn";

const ONE_YEAR_S = 60 * 60 * 24 * 365;

/** Remembers the explicit choice so `/` redirects to it on the next visit. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR_S}; samesite=lax`;
}

interface LanguageSwitcherProps {
  current: Locale;
  label: string;
}

export function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  return (
    <ul
      aria-label={label}
      className="flex items-center rounded-full border border-line/70 p-0.5 text-xs font-bold"
    >
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <li key={locale}>
            <Link
              href={`/${locale}`}
              hrefLang={locale}
              lang={locale}
              title={localeNames[locale]}
              aria-current={active ? "page" : undefined}
              onClick={() => rememberLocale(locale)}
              className={cn(
                "block rounded-full px-2.5 py-1 uppercase transition-colors",
                active ? "bg-accent text-bg" : "text-muted hover:text-accent",
              )}
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
