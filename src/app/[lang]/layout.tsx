import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getContent } from "@/content";
import { hasLocale, locales, ogLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { themeInitScript } from "@/lib/theme";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Both languages are prerendered at build time. */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const { profile } = getContent(lang);
  const title = `${profile.name} — ${profile.title}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description: profile.tagline,
    authors: [{ name: profile.name, url: siteConfig.url }],
    creator: profile.name,
    keywords: getDictionary(lang).meta.keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
        "x-default": "/",
      },
    },
    openGraph: {
      type: "profile",
      locale: ogLocales[lang],
      alternateLocale: locales
        .filter((locale) => locale !== lang)
        .map((locale) => ogLocales[locale]),
      url: `/${lang}`,
      title,
      description: profile.tagline,
      siteName: profile.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: profile.tagline,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1412" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    // The theme class is set by `themeInitScript` before hydration.
    <html
      lang={lang}
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans leading-relaxed">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-md bg-accent px-4 py-2 font-semibold text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {getDictionary(lang).meta.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
