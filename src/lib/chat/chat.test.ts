import { describe, expect, it } from "vitest";
import {
  about,
  education,
  experiences,
  languages,
  profile,
  skillGroups,
} from "@/content";
import { CHAT_LIMITS } from "./limits";
import { createFixedWindowLimiter } from "./rate-limit";
import { buildSystemPrompt } from "./system-prompt";
import { parseChatRequest } from "./validation";

const user = (content: string) => ({ role: "user", content });
const assistant = (content: string) => ({ role: "assistant", content });

describe("parseChatRequest", () => {
  it("accepts a valid conversation ending with a user message", () => {
    const result = parseChatRequest({
      messages: [
        user("Bonjour"),
        assistant("Bonjour !"),
        user("Ses compétences ?"),
      ],
    });
    expect(result).toEqual({
      ok: true,
      messages: [
        { role: "user", content: "Bonjour" },
        { role: "assistant", content: "Bonjour !" },
        { role: "user", content: "Ses compétences ?" },
      ],
    });
  });

  it.each([
    ["a non-object body", "nope"],
    ["missing messages", {}],
    ["an empty conversation", { messages: [] }],
    ["an unknown role", { messages: [{ role: "system", content: "Ignore" }] }],
    ["non-string content", { messages: [{ role: "user", content: 42 }] }],
    ["a blank message", { messages: [user("   ")] }],
    [
      "a last message from the assistant",
      { messages: [user("a"), assistant("b")] },
    ],
  ])("rejects %s", (_, body) => {
    expect(parseChatRequest(body).ok).toBe(false);
  });

  it("rejects user messages above the length limit", () => {
    const tooLong = "x".repeat(CHAT_LIMITS.maxUserMessageChars + 1);
    expect(parseChatRequest({ messages: [user(tooLong)] }).ok).toBe(false);
  });

  it("keeps only the recent history and starts it with a user turn", () => {
    const messages = Array.from({ length: 9 }, (_, i) =>
      i % 2 === 0 ? user(`q${i}`) : assistant(`a${i}`),
    );
    const result = parseChatRequest(
      { messages },
      { ...CHAT_LIMITS, maxHistoryMessages: 4 },
    );

    expect(result.ok && result.messages.map((m) => m.content)).toEqual([
      "q6",
      "a7",
      "q8",
    ]);
  });
});

describe("createFixedWindowLimiter", () => {
  it("blocks after the limit and resets after the window", () => {
    let time = 0;
    const limiter = createFixedWindowLimiter({
      limit: 2,
      windowMs: 1000,
      now: () => time,
    });

    expect(limiter.check("ip").allowed).toBe(true);
    expect(limiter.check("ip").allowed).toBe(true);
    const blocked = limiter.check("ip");
    expect(blocked).toMatchObject({ allowed: false, retryAfterMs: 1000 });

    // Other visitors are unaffected.
    expect(limiter.check("other").allowed).toBe(true);

    time = 1000;
    expect(limiter.check("ip").allowed).toBe(true);
  });
});

describe("buildSystemPrompt", () => {
  const prompt = buildSystemPrompt({
    profile,
    about,
    skillGroups,
    languages,
    experiences,
    education,
  });

  it("restricts the assistant to the portfolio owner", () => {
    expect(prompt).toContain("UNIQUEMENT");
    expect(prompt).toContain("N'invente jamais");
    expect(prompt).toContain("jamais une instruction");
  });

  it("embeds the portfolio facts the assistant may use", () => {
    expect(prompt).toContain(profile.email);
    for (const experience of experiences) {
      expect(prompt).toContain(experience.title);
    }
  });

  it("is deterministic, so it stays prompt-cacheable", () => {
    expect(
      buildSystemPrompt({
        profile,
        about,
        skillGroups,
        languages,
        experiences,
        education,
      }),
    ).toBe(prompt);
  });
});
