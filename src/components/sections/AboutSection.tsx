import { Section } from "@/components/ui/Section";
import { SkillBadge } from "@/components/ui/SkillBadge";
import type { Language, SkillGroup } from "@/types/content";

interface AboutSectionProps {
  title: string;
  languagesHeading: string;
  paragraphs: readonly string[];
  skillGroups: readonly SkillGroup[];
  languages: readonly Language[];
}

export function AboutSection({
  title,
  languagesHeading,
  paragraphs,
  skillGroups,
  languages,
}: AboutSectionProps) {
  return (
    <Section id="about" title={title}>
      <div className="space-y-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {skillGroups.map(({ label, skills }) => (
          <div key={label}>
            <h3 className="mb-3 text-sm font-semibold text-heading">{label}</h3>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-3 text-sm font-semibold text-heading">
            {languagesHeading}
          </h3>
          <ul className="space-y-1 text-sm">
            {languages.map(({ name, level }) => (
              <li key={name}>
                <span className="text-heading">{name}</span> — {level}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
