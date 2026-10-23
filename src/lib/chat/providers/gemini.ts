import { GoogleGenAI } from "@google/genai";
import type { ChatProvider } from "./types";

/**
 * Google Gemini (free tier available on Google AI Studio).
 * `gemini-flash-lite-latest` always points to the current Flash-Lite model:
 * fast and plenty for answering questions about a résumé (the full Flash
 * model can stall for tens of seconds on the free tier).
 */
export const DEFAULT_GEMINI_MODEL = "gemini-flash-lite-latest";

export function createGeminiProvider({
  apiKey,
  model = DEFAULT_GEMINI_MODEL,
}: {
  apiKey: string;
  model?: string;
}): ChatProvider {
  const ai = new GoogleGenAI({ apiKey });

  return {
    name: `gemini:${model}`,
    async *streamReply({ system, messages, maxOutputTokens, signal }) {
      const stream = await ai.models.generateContentStream({
        model,
        // Gemini names the assistant role "model".
        contents: messages.map((turn) => ({
          role: turn.role === "assistant" ? "model" : "user",
          parts: [{ text: turn.content }],
        })),
        config: {
          systemInstruction: system,
          maxOutputTokens,
          abortSignal: signal,
        },
      });

      for await (const chunk of stream) {
        if (chunk.text) yield chunk.text;
      }
    },
  };
}
