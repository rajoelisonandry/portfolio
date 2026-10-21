const LETTER_DELAY_MS = 45;

interface Letter {
  char: string;
  delay: number;
}

/** Splits a name into words of letters, each with a staggered animation delay. */
export function toAnimatedWords(name: string): Letter[][] {
  let position = 0;
  return name.split(" ").map((word) =>
    Array.from(word, (char) => ({
      char,
      delay: position++ * LETTER_DELAY_MS,
    })),
  );
}

/** Page title revealed letter by letter (pure CSS animation, server-rendered). */
export function AnimatedName({ name, id }: { name: string; id?: string }) {
  const words = toAnimatedWords(name);

  return (
    <h1
      id={id}
      aria-label={name}
      className="text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:short:text-4xl"
    >
      {words.map((letters, wordIndex) => (
        <span
          key={wordIndex}
          aria-hidden
          className="mr-[0.25em] inline-block whitespace-nowrap"
        >
          {letters.map(({ char, delay }) => (
            <span
              key={delay}
              className="inline-block animate-letter"
              style={{ animationDelay: `${delay}ms` }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
