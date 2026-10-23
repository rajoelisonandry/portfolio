// @vitest-environment node
import { describe, expect, it } from "vitest";
import { resolveChatProvider } from ".";

describe("resolveChatProvider", () => {
  it("is disabled when no API key is configured", () => {
    expect(resolveChatProvider({})).toBeNull();
  });

  it("uses Gemini Flash-Lite by default", () => {
    expect(resolveChatProvider({ GEMINI_API_KEY: "g" })?.name).toBe(
      "gemini:gemini-flash-lite-latest",
    );
  });

  it("honours a custom Gemini model", () => {
    const provider = resolveChatProvider({
      GEMINI_API_KEY: "g",
      GEMINI_MODEL: "gemini-custom",
    });
    expect(provider?.name).toBe("gemini:gemini-custom");
  });
});
