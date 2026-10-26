import { getContent } from "@/content";
import {
  defaultLocale,
  hasLocale,
  localeNames,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { format } from "@/i18n/format";
import { CHAT_LIMITS } from "@/lib/chat/limits";
import { resolveChatProvider, type ChatProvider } from "@/lib/chat/providers";
import { createFixedWindowLimiter } from "@/lib/chat/rate-limit";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import { parseChatRequest } from "@/lib/chat/validation";

/**
 * AI assistant endpoint (`POST /api/chat?lang=fr|en`). Defense in depth,
 * cheapest checks first: kill switch → same-origin → per-visitor limit →
 * input validation → daily budget → scoped system prompt → capped output.
 * The model (Google Gemini) is configured from the environment.
 */

const DAILY_LIMIT =
  Number(process.env.CHAT_DAILY_LIMIT) || CHAT_LIMITS.defaultDailyLimit;

/** One prompt per language, built once (deterministic, so cache-friendly). */
const SYSTEM_PROMPTS = Object.fromEntries(
  locales.map((locale) => [
    locale,
    buildSystemPrompt(getContent(locale), localeNames[locale]),
  ]),
) as Record<Locale, string>;

const visitorLimiter = createFixedWindowLimiter({
  limit: CHAT_LIMITS.perVisitorLimit,
  windowMs: CHAT_LIMITS.perVisitorWindowMs,
});
const dailyLimiter = createFixedWindowLimiter({
  limit: DAILY_LIMIT,
  windowMs: 24 * 60 * 60 * 1000,
});

let provider: ChatProvider | null | undefined;
const getProvider = () => (provider ??= resolveChatProvider(process.env));

function jsonError(status: number, error: string, headers?: HeadersInit) {
  return Response.json({ error }, { status, headers });
}

/** Rejects calls that don't come from this site (e.g. someone reusing the endpoint). */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function requestLocale(request: Request): Locale {
  const lang = new URL(request.url).searchParams.get("lang");
  return hasLocale(lang) ? lang : defaultLocale;
}

export async function POST(request: Request) {
  const locale = requestLocale(request);
  const t = getDictionary(locale).chatApi;
  const { profile } = getContent(locale);
  const contact = { name: profile.firstName, email: profile.email };

  const model = getProvider();
  if (process.env.CHAT_ENABLED === "false" || !model) {
    return jsonError(503, t.disabled);
  }
  if (!isSameOrigin(request)) {
    return jsonError(403, t.forbidden);
  }

  const visitor = visitorLimiter.check(clientIp(request));
  if (!visitor.allowed) {
    const minutes = Math.ceil(visitor.retryAfterMs / 60_000);
    return jsonError(429, format(t.rateLimited, { ...contact, minutes }), {
      "Retry-After": String(Math.ceil(visitor.retryAfterMs / 1000)),
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, t.invalid);
  }
  const parsed = parseChatRequest(body);
  if (!parsed.ok) {
    return jsonError(
      400,
      parsed.error === "too_long"
        ? format(t.tooLong, { max: CHAT_LIMITS.maxUserMessageChars })
        : t.invalid,
    );
  }

  // Counted only for valid requests, right before spending tokens.
  if (!dailyLimiter.check("global").allowed) {
    return jsonError(429, format(t.dailyQuota, contact));
  }

  const declinedReply = format(t.declined, contact);
  const errorReply = format(t.unavailable, contact);
  const encoder = new TextEncoder();

  const responseBody = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentText = false;
      try {
        for await (const chunk of model.streamReply({
          system: SYSTEM_PROMPTS[locale],
          messages: parsed.messages,
          maxOutputTokens: CHAT_LIMITS.maxOutputTokens,
          // Stop when the visitor leaves, or when the model takes too long.
          signal: AbortSignal.any([
            request.signal,
            AbortSignal.timeout(CHAT_LIMITS.replyTimeoutMs),
          ]),
        })) {
          sentText = true;
          controller.enqueue(encoder.encode(chunk));
        }
        // No text at all means the model declined (safety filter, refusal…).
        if (!sentText) controller.enqueue(encoder.encode(declinedReply));
      } catch (error) {
        if (!request.signal.aborted) {
          console.error(`[chat] ${model.name} error`, error);
          controller.enqueue(
            encoder.encode(sentText ? `\n\n${errorReply}` : errorReply),
          );
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(responseBody, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-RateLimit-Remaining": String(visitor.remaining),
    },
  });
}
