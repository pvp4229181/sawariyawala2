const hits = new Map<string, { count: number; resetAt: number }>();
export function rateLimit(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now(),
    item = hits.get(key);
  if (!item || item.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (item.count >= limit) return false;
  item.count += 1;
  return true;
}
export function requestKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
  );
}
