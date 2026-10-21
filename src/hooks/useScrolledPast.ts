"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` once the element has scrolled above the top of the viewport
 * (minus `offsetPx`, e.g. a fixed header), and `false` while it is visible or
 * still below the fold.
 */
export function useScrolledPast(elementId: string, offsetPx = 0): boolean {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) =>
        setScrolledPast(
          !entry.isIntersecting && entry.boundingClientRect.top < offsetPx,
        ),
      { rootMargin: `-${offsetPx}px 0px 0px 0px` },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [elementId, offsetPx]);

  return scrolledPast;
}
