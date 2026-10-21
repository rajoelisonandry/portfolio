"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

export function Typewriter({ words }: { words: readonly string[] }) {
  const text = useTypewriter(words);

  return (
    <p className="mt-3 min-h-7 text-lg font-medium tracking-tight sm:min-h-8 sm:text-xl">
      {/* Screen readers get a stable label instead of the animated text. */}
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden>
        <span className="text-accent">{text}</span>
        <span className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-1 animate-caret bg-accent" />
      </span>
    </p>
  );
}
