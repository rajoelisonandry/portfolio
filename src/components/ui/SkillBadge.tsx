import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Skill } from "@/types/content";

const ICON_SIZE = 18;

export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <li className="flex items-center gap-2 rounded-md border border-line/70 bg-card px-2.5 py-1.5 text-xs font-medium text-heading">
      <Image
        src={skill.icon}
        alt=""
        width={ICON_SIZE}
        height={ICON_SIZE}
        // SVGs are already optimal; skip the image optimizer.
        unoptimized
        className={cn(
          "size-[18px] object-contain",
          skill.invertInDark && "dark:invert",
        )}
      />
      {skill.name}
    </li>
  );
}
