"use client";

import { useCallback, useRef, useState } from "react";
import type { ChatTurn } from "@/lib/chat/validation";

const ENDPOINT = "/api/chat";

/**
 * Client side of the assistant: sends the conversation, streams the answer
 * into the last message, and surfaces server-side limit errors as text.
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const appendToAnswer = (chunk: string) =>
    setMessages((current) => {
      const last = current.at(-1);
      if (!last || last.role !== "assistant") return current;
      return [
        ...current.slice(0, -1),
        { ...last, content: last.content + chunk },
      ];
    });

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || pending) return;

      const history: ChatTurn[] = [...messages, { role: "user", content }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setError(null);
      setPending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const data = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          setMessages(history.slice(0, -1));
          setError(data?.error ?? "Une erreur est survenue. Réessayez.");
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          appendToAnswer(decoder.decode(value, { stream: true }));
        }
      } catch (caught) {
        if ((caught as Error).name !== "AbortError") {
          setMessages(history.slice(0, -1));
          setError("Connexion impossible. Vérifiez votre réseau et réessayez.");
        }
      } finally {
        setPending(false);
        abortRef.current = null;
      }
    },
    [messages, pending],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setPending(false);
  }, []);

  return { messages, pending, error, send, reset };
}
