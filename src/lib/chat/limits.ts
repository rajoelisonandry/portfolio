/**
 * Hard limits of the AI assistant. They are enforced server-side and are the
 * real cost guarantee: the system prompt alone can be talked around, these can't.
 */
export interface ChatLimits {
  readonly maxUserMessageChars: number;
  readonly maxAssistantMessageChars: number;
  readonly maxHistoryMessages: number;
  readonly maxOutputTokens: number;
  readonly perVisitorLimit: number;
  readonly perVisitorWindowMs: number;
  readonly defaultDailyLimit: number;
  readonly replyTimeoutMs: number;
}

export const CHAT_LIMITS: ChatLimits = {
  /** Max characters of a visitor message (blocks "translate this document"). */
  maxUserMessageChars: 500,
  /** Max characters of an assistant turn replayed from the client. */
  maxAssistantMessageChars: 3000,
  /** Only the most recent turns are sent to the model, so cost stays flat. */
  maxHistoryMessages: 6,
  /** Upper bound on the length of a single answer. */
  maxOutputTokens: 800,
  /** Messages allowed per visitor (IP) per window. */
  perVisitorLimit: 15,
  perVisitorWindowMs: 60 * 60 * 1000,
  /** Default site-wide daily budget, overridable with CHAT_DAILY_LIMIT. */
  defaultDailyLimit: 300,
  /** A model call is abandoned after this delay, so the UI never hangs. */
  replyTimeoutMs: 25_000,
};
