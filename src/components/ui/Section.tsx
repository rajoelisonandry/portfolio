import type { ReactNode } from "react";
import type { SectionId } from "@/config/site";
import { cn } from "@/lib/cn";

interface SectionProps {
  id: SectionId;
  title: string;
  className?: string;
  children: ReactNode;
}

/** Anchored page section with an accessible, visually styled heading. */
export function Section({ id, title, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("mb-16 scroll-mt-24 md:mb-24 lg:mb-32", className)}
    >
      <h2
        id={headingId}
        className="mb-8 flex items-center gap-4 text-sm font-bold tracking-widest text-heading uppercase"
      >
        {title}
        <span aria-hidden className="h-px flex-1 bg-line" />
      </h2>
      {children}
    </section>
  );
}
