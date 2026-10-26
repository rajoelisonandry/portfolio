/**
 * Site-wide configuration shared by metadata, navigation and SEO routes.
 */

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/**
 * Single source of truth for page sections: drives both the menu and the
 * anchors. Labels are translated in the dictionaries (`nav.<id>`).
 */
export const sectionIds = [
  "about",
  "experience",
  "education",
  "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];

/** Anchor of the hero title, observed to reveal the compact identity in the header. */
export const HERO_NAME_ID = "hero-name";

/** Height of the fixed header, in pixels (Tailwind `h-16`). */
export const HEADER_HEIGHT_PX = 64;
