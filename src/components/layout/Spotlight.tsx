"use client";

import { useEffect, useRef } from "react";

/**
 * Soft radial light following the pointer.
 * Updates are batched with `requestAnimationFrame` (one style write per frame)
 * and the effect is hidden on touch devices and for reduced-motion users.
 */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const onPointerMove = ({ clientX, clientY }: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--spot-x", `${clientX}px`);
        ref.current?.style.setProperty("--spot-y", `${clientY}px`);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 bg-[radial-gradient(600px_at_var(--spot-x,50%)_var(--spot-y,-100%),var(--spotlight),transparent_80%)] motion-reduce:hidden pointer-coarse:hidden"
    />
  );
}
