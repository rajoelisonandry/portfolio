"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  DEFAULT_TIMINGS,
  INITIAL_STATE,
  delayFor,
  nextState,
  type TypewriterTimings,
} from "@/lib/typewriter";

/**
 * Cycles through `words` with a type / pause / delete animation.
 * Falls back to the first word, static, when the user prefers reduced motion.
 */
export function useTypewriter(
  words: readonly string[],
  timings: TypewriterTimings = DEFAULT_TIMINGS,
): string {
  const reducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (reducedMotion || words.length === 0) return;

    const timer = setTimeout(
      () => setState((current) => nextState(current, words)),
      delayFor(state, timings),
    );
    return () => clearTimeout(timer);
  }, [state, words, timings, reducedMotion]);

  return reducedMotion ? (words[0] ?? "") : state.text;
}
