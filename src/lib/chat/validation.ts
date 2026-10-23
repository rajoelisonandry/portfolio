import { CHAT_LIMITS, type ChatLimits } from "./limits";

export type ChatRole = "user" | "assistant";

export interface ChatTurn {
  role: ChatRole;
  content: string;
}

export type ParseResult =
  { ok: true; messages: ChatTurn[] } | { ok: false; error: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * Validates an untrusted chat request body and returns a bounded, well-formed
 * history ending with a user message. Anything unexpected is rejected rather
 * than coerced, so the model only ever sees data within the limits.
 */
export function parseChatRequest(
  body: unknown,
  limits: ChatLimits = CHAT_LIMITS,
): ParseResult {
  if (!isRecord(body) || !Array.isArray(body.messages)) {
    return { ok: false, error: "Requête invalide." };
  }
  if (body.messages.length === 0) {
    return { ok: false, error: "Aucun message." };
  }

  const turns: ChatTurn[] = [];
  for (const raw of body.messages) {
    if (!isRecord(raw) || typeof raw.content !== "string") {
      return { ok: false, error: "Message invalide." };
    }
    if (raw.role !== "user" && raw.role !== "assistant") {
      return { ok: false, error: "Rôle de message invalide." };
    }
    const content = raw.content.trim();
    if (content.length === 0) {
      return { ok: false, error: "Message vide." };
    }
    const max =
      raw.role === "user"
        ? limits.maxUserMessageChars
        : limits.maxAssistantMessageChars;
    if (content.length > max) {
      return {
        ok: false,
        error: `Message trop long (${max} caractères maximum).`,
      };
    }
    turns.push({ role: raw.role, content });
  }

  if (turns.at(-1)?.role !== "user") {
    return { ok: false, error: "Le dernier message doit venir du visiteur." };
  }

  // Keep only the recent history, and make sure it starts with a user turn.
  const recent = turns.slice(-limits.maxHistoryMessages);
  const firstUser = recent.findIndex((turn) => turn.role === "user");
  return { ok: true, messages: recent.slice(firstUser) };
}
