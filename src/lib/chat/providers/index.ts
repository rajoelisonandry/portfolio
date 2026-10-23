import { createGeminiProvider } from "./gemini";
import type { ChatProvider } from "./types";

export type { ChatProvider, ChatRequest } from "./types";

type Env = Record<string, string | undefined>;

/**
 * Builds the assistant's model provider from the environment.
 * Returns `null` when no key is configured (assistant disabled).
 */
export function resolveChatProvider(env: Env): ChatProvider | null {
  if (!env.GEMINI_API_KEY) return null;
  return createGeminiProvider({
    apiKey: env.GEMINI_API_KEY,
    model: env.GEMINI_MODEL || undefined,
  });
}
