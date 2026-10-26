"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ChatIcon,
  CloseIcon,
  SendIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { useChat } from "@/hooks/useChat";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { cn } from "@/lib/cn";
import { CHAT_LIMITS } from "@/lib/chat/limits";

const PANEL_ID = "chat-panel";

interface ChatWidgetProps {
  firstName: string;
  suggestions: readonly string[];
  locale: Locale;
  labels: Dictionary["chat"];
}

/** Floating AI assistant that answers questions about the portfolio owner. */
export function ChatWidget({
  firstName,
  suggestions,
  locale,
  labels,
}: ChatWidgetProps) {
  const name = { name: firstName };
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, pending, error, send, reset } = useChat(locale, labels);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus the input on open; close with Escape.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Keep the latest message in view while the answer streams in.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const submit = (text: string) => {
    if (!text.trim() || pending) return;
    setInput("");
    void send(text);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? labels.close : format(labels.open, name)}
        className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-accent text-bg shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
      >
        {open ? (
          <CloseIcon className="size-6" />
        ) : (
          <ChatIcon className="size-6" />
        )}
      </button>

      <section
        id={PANEL_ID}
        role="dialog"
        aria-label={format(labels.dialog, name)}
        hidden={!open}
        className="fixed inset-x-4 bottom-22 z-50 flex max-h-[min(36rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl shadow-black/30 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-96"
      >
        <header className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-accent">
            <SparklesIcon className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-heading">
              {labels.title}
            </h2>
            <p className="text-xs text-muted">
              {format(labels.subtitle, name)}
            </p>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              {labels.clear}
            </button>
          )}
        </header>

        <div
          ref={scrollRef}
          aria-live="polite"
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm"
        >
          {messages.length === 0 && (
            <div>
              <p className="mb-3">{format(labels.greeting, name)}</p>
              <ul className="flex flex-col gap-2">
                {suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => submit(suggestion)}
                      className="w-full rounded-lg border border-line px-3 py-2 text-left text-xs transition-colors hover:border-accent hover:text-accent"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {messages.map((message, index) => (
            <p
              key={index}
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed whitespace-pre-wrap",
                message.role === "user"
                  ? "ml-auto rounded-br-sm bg-accent text-bg"
                  : "rounded-bl-sm bg-card text-heading",
              )}
            >
              {message.content ||
                (pending && (
                  <span
                    className="inline-flex gap-1"
                    aria-label={labels.typing}
                  >
                    <span className="size-1.5 animate-bounce rounded-full bg-muted" />
                    <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
                  </span>
                ))}
            </p>
          ))}

          {error && (
            <p role="alert" className="text-xs text-red-500">
              {error}
            </p>
          )}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex items-end gap-2 border-t border-line p-3"
        >
          <label htmlFor="chat-input" className="sr-only">
            {labels.inputLabel}
          </label>
          <textarea
            id="chat-input"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit(input);
              }
            }}
            rows={1}
            maxLength={CHAT_LIMITS.maxUserMessageChars}
            placeholder={labels.placeholder}
            className="max-h-28 flex-1 resize-none rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-heading placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            aria-label={labels.send}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-bg transition-opacity disabled:opacity-40"
          >
            <SendIcon className="size-4" />
          </button>
        </form>
        <p className="px-4 pb-3 text-[11px] text-muted">{labels.disclaimer}</p>
      </section>
    </>
  );
}
