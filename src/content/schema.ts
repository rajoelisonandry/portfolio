import type { Language, Stat } from "@/types/content";
import type { EducationId, ExperienceId, SkillGroupId } from "./shared";

/**
 * Shape every language file must provide. Keyed by the shared ids, so a
 * missing translation is a type error rather than a blank on the page.
 */
export interface LocalizedContent {
  readonly profile: {
    readonly title: string;
    /** Rotating headlines rendered by the typewriter effect. */
    readonly roles: readonly string[];
    readonly tagline: string;
    readonly stats: readonly Stat[];
    readonly location: string;
  };
  readonly about: readonly string[];
  readonly skillGroupLabels: Record<SkillGroupId, string>;
  readonly languages: readonly Language[];
  readonly experiences: Record<
    ExperienceId,
    {
      readonly title: string;
      readonly role: string;
      readonly description: string;
      readonly highlights: readonly string[];
    }
  >;
  readonly education: Record<
    EducationId,
    { readonly title: string; readonly detail?: string }
  >;
  /** Starter questions shown when the assistant opens. */
  readonly chatSuggestions: readonly string[];
}
