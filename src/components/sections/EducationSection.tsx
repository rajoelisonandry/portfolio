import { Section } from "@/components/ui/Section";
import { TimelineItem } from "@/components/ui/TimelineItem";
import type { Education } from "@/types/content";

interface EducationSectionProps {
  title: string;
  education: readonly Education[];
}

export function EducationSection({ title, education }: EducationSectionProps) {
  return (
    <Section id="education" title={title}>
      <ol className="group/list">
        {education.map((item) => (
          <TimelineItem
            key={item.title}
            meta={item.year}
            title={item.title}
            subtitle={item.school}
          >
            {item.detail && <p className="mt-1 text-sm">{item.detail}</p>}
          </TimelineItem>
        ))}
      </ol>
    </Section>
  );
}
