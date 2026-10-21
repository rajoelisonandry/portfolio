import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimatedName, toAnimatedWords } from "./AnimatedName";

describe("toAnimatedWords", () => {
  it("splits words into letters with increasing delays across words", () => {
    const words = toAnimatedWords("Ab Cd");

    expect(words.map((letters) => letters.map((l) => l.char))).toEqual([
      ["A", "b"],
      ["C", "d"],
    ]);
    expect(words.flat().map((l) => l.delay)).toEqual([0, 45, 90, 135]);
  });
});

describe("<AnimatedName />", () => {
  it("exposes the full name as an accessible heading", () => {
    render(<AnimatedName name="Andry Tiana Rajoelison" />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Andry Tiana Rajoelison" }),
    ).toBeDefined();
  });
});
