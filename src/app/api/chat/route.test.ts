// @vitest-environment node
import { beforeAll, describe, expect, it, vi } from "vitest";
import { CHAT_LIMITS } from "@/lib/chat/limits";

/**
 * Exercises the guards that run before any call to the model API.
 * Every request here is rejected early, so no tokens are spent.
 */
let POST: (request: Request) => Promise<Response>;

beforeAll(async () => {
  vi.stubEnv("GEMINI_API_KEY", "test-key");
  ({ POST } = await import("./route"));
});

function chatRequest(
  body: unknown,
  { origin = "http://localhost:3000", ip = "203.0.113.1" } = {},
) {
  return new Request("http://localhost:3000/api/chat", {
    method: "POST",
    headers: {
      host: "localhost:3000",
      origin,
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/chat guards", () => {
  it("rejects requests coming from another site", async () => {
    const response = await POST(
      chatRequest({ messages: [] }, { origin: "https://evil.example" }),
    );
    expect(response.status).toBe(403);
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(
      chatRequest("{not json", { ip: "203.0.113.2" }),
    );
    expect(response.status).toBe(400);
  });

  it("rejects messages above the length limit", async () => {
    const response = await POST(
      chatRequest(
        {
          messages: [
            {
              role: "user",
              content: "x".repeat(CHAT_LIMITS.maxUserMessageChars + 1),
            },
          ],
        },
        { ip: "203.0.113.3" },
      ),
    );
    expect(response.status).toBe(400);
  });

  it("rate-limits a visitor after too many messages", async () => {
    const send = () =>
      POST(chatRequest({ messages: [] }, { ip: "203.0.113.4" }));

    for (let i = 0; i < CHAT_LIMITS.perVisitorLimit; i++) {
      expect((await send()).status).toBe(400); // counted, then rejected as empty
    }
    const blocked = await send();
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get("Retry-After")).toBeTruthy();
  });

  it("can be switched off with CHAT_ENABLED=false", async () => {
    vi.stubEnv("CHAT_ENABLED", "false");
    const response = await POST(chatRequest({ messages: [] }));
    expect(response.status).toBe(503);
    vi.stubEnv("CHAT_ENABLED", "true");
  });
});
