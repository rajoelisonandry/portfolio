import { Section } from "@/components/ui/Section";
import { TagList } from "@/components/ui/TagList";
import { TimelineItem } from "@/components/ui/TimelineItem";
import type { Experience } from "@/types/content";

export function ExperienceSection({
  experiences,
}: {
  experiences: readonly Experience[];
}) {
  return (
    <Section id="experience" title="Expérience">
      <ol className="group/list">
        {experiences.map((experience) => (
          <TimelineItem
            key={experience.title}
            title={experience.title}
            subtitle={[experience.role, experience.company]
              .filter(Boolean)
              .join(" · ")}
          >
            <p className="mt-2 text-sm leading-normal">
              {experience.description}
            </p>
            {experience.highlights.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm marker:text-accent">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            <TagList tags={experience.stack} label="Technologies utilisées" />
          </TimelineItem>
        ))}
      </ol>
    </Section>
  );
}
