import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { profile } from "@/content";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description: profile.tagline,
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  keywords: [
    "Développeur FullStack",
    "Freelance",
    "React",
    "React Native",
    "Node.js",
    "TypeScript",
    "Madagascar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: siteConfig.locale,
    url: "/",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1412" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The theme class is set by `themeInitScript` before hydration.
    <html
      lang={siteConfig.lang}
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
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
