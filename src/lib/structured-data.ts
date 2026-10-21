import { siteConfig } from "@/config/site";
import { toMailtoHref } from "@/lib/contact";
import type { Profile, SkillGroup } from "@/types/content";

/** schema.org `Person` description, used by search engines for rich results. */
export function buildPersonJsonLd(
  profile: Profile,
  skillGroups: readonly SkillGroup[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: toMailtoHref(profile.email),
    url: siteConfig.url,
    image: new URL(profile.photo.src, siteConfig.url).toString(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Antananarivo",
      addressCountry: "MG",
    },
    sameAs: [profile.socials.github, profile.socials.linkedin],
    knowsAbout: skillGroups.flatMap((group) =>
      group.skills.map((skill) => skill.name),
    ),
  };
}

/**
 * Serializes JSON-LD safely for inline `<script>` injection by escaping `<`,
 * as recommended by the Next.js JSON-LD guide.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
