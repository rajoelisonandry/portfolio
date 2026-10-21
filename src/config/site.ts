/**
 * Site-wide configuration shared by metadata, navigation and SEO routes.
 */

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr_FR",
  lang: "fr",
} as const;

/** Single source of truth for page sections: drives both the menu and the anchors. */
export const navigation = [
  { id: "about", label: "À propos" },
  { id: "experience", label: "Expérience" },
  { id: "education", label: "Formation" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];

export const sectionIds: readonly SectionId[] = navigation.map(({ id }) => id);

/** Anchor of the hero title, observed to reveal the compact identity in the header. */
export const HERO_NAME_ID = "hero-name";

/** Height of the fixed header, in pixels (Tailwind `h-16`). */
export const HEADER_HEIGHT_PX = 64;
