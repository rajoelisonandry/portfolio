import { Section } from "@/components/ui/Section";
import { TimelineItem } from "@/components/ui/TimelineItem";
import type { Education } from "@/types/content";

export function EducationSection({
  education,
}: {
  education: readonly Education[];
}) {
  return (
    <Section id="education" title="Formation">
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
