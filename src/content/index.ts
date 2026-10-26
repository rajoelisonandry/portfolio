import type { Locale } from "@/i18n/config";
import type {
  Education,
  Experience,
  Language,
  Profile,
  SkillGroup,
} from "@/types/content";
import { en } from "./locales/en";
import { fr } from "./locales/fr";
import type { LocalizedContent } from "./schema";
import {
  educationCatalog,
  experienceCatalog,
  identity,
  skillCatalog,
  type SkillGroupId,
} from "./shared";

export interface PortfolioContent {
  readonly profile: Profile;
  readonly about: readonly string[];
  readonly skillGroups: readonly SkillGroup[];
  readonly languages: readonly Language[];
  readonly experiences: readonly Experience[];
  readonly education: readonly Education[];
  readonly chatSuggestions: readonly string[];
}

const translations: Record<Locale, LocalizedContent> = { fr, en };

/** Merges the shared facts with the texts of the requested language. */
export function getContent(locale: Locale): PortfolioContent {
  const text = translations[locale];

  return {
    profile: { ...identity, ...text.profile },
    about: text.about,
    skillGroups: (Object.keys(skillCatalog) as SkillGroupId[]).map((id) => ({
      label: text.skillGroupLabels[id],
      skills: skillCatalog[id],
    })),
    languages: text.languages,
    experiences: experienceCatalog.map(({ id, stack, ...meta }) => ({
      ...text.experiences[id],
      company: "company" in meta ? meta.company : undefined,
      stack,
    })),
    education: educationCatalog.map(({ id, year, school }) => ({
      ...text.education[id],
      year,
      school,
    })),
    chatSuggestions: text.chatSuggestions,
  };
}
