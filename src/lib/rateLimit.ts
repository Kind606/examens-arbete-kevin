/**
 * Simple in-memory rate limiter to prevent abuse
 * For production, consider using Redis-based solution like @upstash/ratelimit
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  },
  5 * 60 * 1000,
);

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (e.g., userId, IP address)
 * @param config - Rate limit configuration
 * @returns true if rate limit exceeded, false otherwise
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }, // 10 requests per minute default
): { limited: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return { limited: false, remaining: config.maxRequests - 1 };
  }

  if (entry.count >= config.maxRequests) {
    return { limited: true, remaining: 0 };
  }

  entry.count++;
  return { limited: false, remaining: config.maxRequests - entry.count };
}

/**
 * Rate limit presets for different action types
 */
export const RATE_LIMITS = {
  // Authentication actions - stricter limits
  LOGIN: { maxRequests: 5, windowMs: 60000 }, // 5 per minute
  REGISTER: { maxRequests: 3, windowMs: 60000 }, // 3 per minute

  // Write operations - moderate limits
  CREATE: { maxRequests: 20, windowMs: 60000 }, // 20 per minute
  UPDATE: { maxRequests: 30, windowMs: 60000 }, // 30 per minute
  DELETE: { maxRequests: 15, windowMs: 60000 }, // 15 per minute

  // Read operations - relaxed limits
  READ: { maxRequests: 100, windowMs: 60000 }, // 100 per minute
} as const;
