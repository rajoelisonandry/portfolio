"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the upper part of the
 * viewport, used to highlight the matching navigation link (scroll-spy).
 */
export function useActiveSection<T extends string>(ids: readonly T[]): T {
  const [active, setActive] = useState<T>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as T);
        }
      },
      // Only the band between 30% and 40% of the viewport height counts as "active".
      { rootMargin: "-30% 0px -60% 0px" },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
