"use client";

import Image, { type StaticImageData } from "next/image";
import { HEADER_HEIGHT_PX, HERO_NAME_ID } from "@/config/site";
import { useScrolledPast } from "@/hooks/useScrolledPast";
import { cn } from "@/lib/cn";

interface HeaderIdentityProps {
  name: string;
  photo: StaticImageData;
  backToTopLabel: string;
}

/**
 * Compact avatar + name that slides into the header once the hero title has
 * scrolled out of view. Hidden on large screens, where the hero column is sticky.
 */
export function HeaderIdentity({
  name,
  photo,
  backToTopLabel,
}: HeaderIdentityProps) {
  const visible = useScrolledPast(HERO_NAME_ID, HEADER_HEIGHT_PX);

  return (
    <a
      href="#"
      title={backToTopLabel}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "flex min-w-0 items-center gap-2.5 transition-all duration-500 ease-out lg:hidden",
        visible
          ? "translate-y-0 opacity-100 blur-none"
          : "pointer-events-none translate-y-3 opacity-0 blur-sm",
      )}
    >
      <Image
        src={photo}
        alt=""
        sizes="32px"
        className={cn(
          "size-8 shrink-0 rounded-full object-cover ring-2 ring-accent/70 transition-transform duration-500 ease-out",
          visible ? "scale-100" : "scale-75",
        )}
      />
      <span className="truncate text-sm font-semibold tracking-tight text-heading">
        {name}
      </span>
    </a>
  );
}
