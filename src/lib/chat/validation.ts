import { CHAT_LIMITS, type ChatLimits } from "./limits";

export type ChatRole = "user" | "assistant";

export interface ChatTurn {
  role: ChatRole;
  content: string;
}

/** Error codes, translated by the caller into the visitor's language. */
export type ChatRequestError = "invalid" | "too_long";

export type ParseResult =
  { ok: true; messages: ChatTurn[] } | { ok: false; error: ChatRequestError };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const invalid: ParseResult = { ok: false, error: "invalid" };

/**
 * Validates an untrusted chat request body and returns a bounded, well-formed
 * history ending with a user message. Anything unexpected is rejected rather
 * than coerced, so the model only ever sees data within the limits.
 */
export function parseChatRequest(
  body: unknown,
  limits: ChatLimits = CHAT_LIMITS,
): ParseResult {
  if (!isRecord(body) || !Array.isArray(body.messages)) return invalid;
  if (body.messages.length === 0) return invalid;

  const turns: ChatTurn[] = [];
  for (const raw of body.messages) {
    if (!isRecord(raw) || typeof raw.content !== "string") return invalid;
    if (raw.role !== "user" && raw.role !== "assistant") return invalid;

    const content = raw.content.trim();
    if (content.length === 0) return invalid;

    const max =
      raw.role === "user"
        ? limits.maxUserMessageChars
        : limits.maxAssistantMessageChars;
    if (content.length > max) return { ok: false, error: "too_long" };

    turns.push({ role: raw.role, content });
  }

  // The visitor must have the last word.
  if (turns.at(-1)?.role !== "user") return invalid;

  // Keep only the recent history, and make sure it starts with a user turn.
  const recent = turns.slice(-limits.maxHistoryMessages);
  const firstUser = recent.findIndex((turn) => turn.role === "user");
  return { ok: true, messages: recent.slice(firstUser) };
}
