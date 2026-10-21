import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TimelineItemProps {
  /** Optional date shown in a left column; without it, content spans the full width. */
  meta?: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

/**
 * Card used by the experience and education lists.
 * On large screens, hovering one item dims its siblings (`group/list` on the parent).
 */
export function TimelineItem({
  meta,
  title,
  subtitle,
  children,
}: TimelineItemProps) {
  return (
    <li className="mb-12 last:mb-0">
      <article className="group relative grid transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:opacity-100!">
        <div
          aria-hidden
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-card lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
        />
        {meta && (
          <p className="z-10 mt-1 mb-2 text-xs font-semibold tracking-wide text-muted uppercase sm:col-span-2">
            {meta}
          </p>
        )}
        <div className={cn("z-10", meta ? "sm:col-span-6" : "sm:col-span-8")}>
          <h3 className="leading-snug font-medium text-heading group-hover:text-accent">
            {title}
          </h3>
          <p className="text-sm text-muted">{subtitle}</p>
          {children}
        </div>
      </article>
    </li>
  );
}
