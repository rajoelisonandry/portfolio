import type { ChatTurn } from "../validation";

export interface ChatRequest {
  system: string;
  messages: readonly ChatTurn[];
  maxOutputTokens: number;
  signal?: AbortSignal;
}

/**
 * A model vendor behind the assistant. All guards (limits, validation, prompt)
 * live in the route, so swapping vendors never weakens them.
 */
export interface ChatProvider {
  readonly name: string;
  /** Yields the answer as text chunks; yields nothing if the model declined. */
  streamReply(request: ChatRequest): AsyncIterable<string>;
}
