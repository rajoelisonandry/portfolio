import type { StaticImageData } from "next/image";

/**
 * Domain types for the portfolio content.
 * Content lives in `src/content` and is fully decoupled from presentation.
 */

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface Profile {
  readonly name: string;
  readonly firstName: string;
  /** Statically imported portrait: dimensions and blur placeholder come for free. */
  readonly photo: StaticImageData;
  readonly title: string;
  /** Rotating headlines rendered by the typewriter effect. */
  readonly roles: readonly string[];
  readonly tagline: string;
  readonly stats: readonly Stat[];
  readonly location: string;
  readonly email: string;
  readonly phones: readonly string[];
  readonly socials: {
    readonly github: string;
    readonly linkedin: string;
  };
  /** Public link to the downloadable résumé. */
  readonly cvUrl: string;
}

export interface Skill {
  readonly name: string;
  /** Path to an official logo inside `/public/icons`. */
  readonly icon: `/icons/${string}.svg`;
  /** Monochrome black logos are inverted in dark mode to stay visible. */
  readonly invertInDark?: boolean;
}

export interface SkillGroup {
  readonly label: string;
  readonly skills: readonly Skill[];
}

export interface Language {
  readonly name: string;
  readonly level: string;
}

export interface Experience {
  readonly title: string;
  /** Omitted when the client is confidential or the mission is freelance. */
  readonly company?: string;
  readonly role: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
}

export interface Education {
  readonly year: string;
  readonly title: string;
  readonly school: string;
  readonly detail?: string;
}
