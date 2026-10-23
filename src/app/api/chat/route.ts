import {
  about,
  education,
  experiences,
  languages,
  profile,
  skillGroups,
} from "@/content";
import { CHAT_LIMITS } from "@/lib/chat/limits";
import { resolveChatProvider, type ChatProvider } from "@/lib/chat/providers";
import { createFixedWindowLimiter } from "@/lib/chat/rate-limit";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import { parseChatRequest } from "@/lib/chat/validation";

/**
 * AI assistant endpoint. Defense in depth, cheapest checks first:
 * kill switch → same-origin → per-visitor limit → input validation →
 * daily budget → scoped system prompt → capped output.
 * The model (Google Gemini) is configured from the environment.
 */

const DAILY_LIMIT =
  Number(process.env.CHAT_DAILY_LIMIT) || CHAT_LIMITS.defaultDailyLimit;

const SYSTEM_PROMPT = buildSystemPrompt({
  profile,
  about,
  skillGroups,
  languages,
  experiences,
  education,
});

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

const FALLBACK_REPLY = `Je ne peux pas répondre à cette demande. Pour toute question sur ${profile.firstName}, vous pouvez le contacter directement : ${profile.email}.`;
const ERROR_REPLY = `L'assistante est momentanément indisponible. Vous pouvez contacter ${profile.firstName} directement : ${profile.email}.`;

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

export async function POST(request: Request) {
  const model = getProvider();
  if (process.env.CHAT_ENABLED === "false" || !model) {
    return jsonError(503, "L'assistante est désactivée pour le moment.");
  }
  if (!isSameOrigin(request)) {
    return jsonError(403, "Origine non autorisée.");
  }

  const visitor = visitorLimiter.check(clientIp(request));
  if (!visitor.allowed) {
    const minutes = Math.ceil(visitor.retryAfterMs / 60_000);
    return jsonError(
      429,
      `Vous avez atteint la limite de messages. Réessayez dans ${minutes} min ou contactez ${profile.firstName} : ${profile.email}.`,
      { "Retry-After": String(Math.ceil(visitor.retryAfterMs / 1000)) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "Requête invalide.");
  }
  const parsed = parseChatRequest(body);
  if (!parsed.ok) return jsonError(400, parsed.error);

  // Counted only for valid requests, right before spending tokens.
  if (!dailyLimiter.check("global").allowed) {
    return jsonError(
      429,
      `L'assistante a atteint son quota du jour. Contactez ${profile.firstName} directement : ${profile.email}.`,
    );
  }

  const encoder = new TextEncoder();
  const responseBody = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sentText = false;
      try {
        for await (const chunk of model.streamReply({
          system: SYSTEM_PROMPT,
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
        if (!sentText) controller.enqueue(encoder.encode(FALLBACK_REPLY));
      } catch (error) {
        if (!request.signal.aborted) {
          console.error(`[chat] ${model.name} error`, error);
          controller.enqueue(
            encoder.encode(sentText ? `\n\n${ERROR_REPLY}` : ERROR_REPLY),
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
