export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Milliseconds until the current window resets. */
  retryAfterMs: number;
}

export interface RateLimiter {
  check(key: string): RateLimitResult;
}

interface Window {
  count: number;
  resetAt: number;
}

const MAX_TRACKED_KEYS = 10_000;

/**
 * Fixed-window counter kept in memory.
 *
 * On serverless platforms each instance has its own memory, so limits are
 * per instance (approximate, but still bounding). For strict global limits,
 * swap this implementation for a shared store (e.g. Redis) behind the same
 * `RateLimiter` interface.
 */
export function createFixedWindowLimiter({
  limit,
  windowMs,
  now = Date.now,
}: {
  limit: number;
  windowMs: number;
  now?: () => number;
}): RateLimiter {
  const windows = new Map<string, Window>();

  const prune = (time: number) => {
    for (const [key, window] of windows) {
      if (window.resetAt <= time) windows.delete(key);
    }
  };

  return {
    check(key) {
      const time = now();
      if (windows.size > MAX_TRACKED_KEYS) prune(time);

      let window = windows.get(key);
      if (!window || window.resetAt <= time) {
        window = { count: 0, resetAt: time + windowMs };
        windows.set(key, window);
      }

      const retryAfterMs = window.resetAt - time;
      if (window.count >= limit) {
        return { allowed: false, remaining: 0, retryAfterMs };
      }
      window.count += 1;
      return {
        allowed: true,
        remaining: limit - window.count,
        retryAfterMs,
      };
    },
  };
}
