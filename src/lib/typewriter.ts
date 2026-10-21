/**
 * Pure state machine behind the typewriter effect.
 * Kept framework-agnostic so it can be unit-tested without rendering.
 */

export type TypewriterPhase = "typing" | "pausing" | "deleting";

export interface TypewriterState {
  readonly wordIndex: number;
  readonly text: string;
  readonly phase: TypewriterPhase;
}

export interface TypewriterTimings {
  readonly typeMs: number;
  readonly deleteMs: number;
  readonly pauseMs: number;
}

export const DEFAULT_TIMINGS: TypewriterTimings = {
  typeMs: 70,
  deleteMs: 35,
  pauseMs: 1800,
};

export const INITIAL_STATE: TypewriterState = {
  wordIndex: 0,
  text: "",
  phase: "typing",
};

/** Computes the next frame of the animation. */
export function nextState(
  state: TypewriterState,
  words: readonly string[],
): TypewriterState {
  const word = words[state.wordIndex % words.length] ?? "";

  switch (state.phase) {
    case "typing": {
      const text = word.slice(0, state.text.length + 1);
      return { ...state, text, phase: text === word ? "pausing" : "typing" };
    }
    case "pausing":
      return { ...state, phase: "deleting" };
    case "deleting": {
      if (state.text === "") {
        return {
          wordIndex: (state.wordIndex + 1) % words.length,
          text: "",
          phase: "typing",
        };
      }
      return { ...state, text: state.text.slice(0, -1) };
    }
  }
}

/** Delay to wait before computing the frame that follows `state`. */
export function delayFor(
  state: TypewriterState,
  timings: TypewriterTimings = DEFAULT_TIMINGS,
): number {
  switch (state.phase) {
    case "typing":
      return timings.typeMs;
    case "pausing":
      return timings.pauseMs;
    case "deleting":
      return timings.deleteMs;
  }
}
