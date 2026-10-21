import { describe, expect, it } from "vitest";
import {
  DEFAULT_TIMINGS,
  INITIAL_STATE,
  delayFor,
  nextState,
  type TypewriterState,
} from "./typewriter";

const words = ["ab", "c"];

/** Runs the state machine `steps` times from the initial state. */
function run(steps: number): TypewriterState {
  let state = INITIAL_STATE;
  for (let i = 0; i < steps; i++) state = nextState(state, words);
  return state;
}

describe("typewriter state machine", () => {
  it("types the current word one character at a time", () => {
    expect(run(1)).toEqual({ wordIndex: 0, text: "a", phase: "typing" });
    expect(run(2)).toEqual({ wordIndex: 0, text: "ab", phase: "pausing" });
  });

  it("deletes the word after the pause", () => {
    expect(run(3)).toEqual({ wordIndex: 0, text: "ab", phase: "deleting" });
    expect(run(4).text).toBe("a");
    expect(run(5).text).toBe("");
  });

  it("moves to the next word, then loops back to the first", () => {
    expect(run(6)).toEqual({ wordIndex: 1, text: "", phase: "typing" });
    // "c": type (1) → pause (1) → delete (1) → empty → next word
    expect(run(10)).toEqual({ wordIndex: 0, text: "", phase: "typing" });
  });

  it("uses the configured delay for each phase", () => {
    const base = { wordIndex: 0, text: "" };
    expect(delayFor({ ...base, phase: "typing" })).toBe(DEFAULT_TIMINGS.typeMs);
    expect(delayFor({ ...base, phase: "pausing" })).toBe(
      DEFAULT_TIMINGS.pauseMs,
    );
    expect(delayFor({ ...base, phase: "deleting" })).toBe(
      DEFAULT_TIMINGS.deleteMs,
    );
  });
});
