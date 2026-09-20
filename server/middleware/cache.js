import redis from "../config/redis.js";

export const cacheMiddleware = (ttl = 300) => {
  return async (req, res, next) => {
    const cacheKey = `cache:${req.originalUrl}`;
    try {
      const cached = await redis.get(cacheKey);
      if (cached) return res.json(JSON.parse(cached));

      const originalJson = res.json.bind(res);
      res.json = (body) => {
        redis.setex(cacheKey, ttl, JSON.stringify(body))
          .catch(() => {}); // ← silently ignore Redis write failures
        return originalJson(body);
      };
      next();
    } catch (err) {
      // If Redis is completely down, just skip cache and hit MongoDB
      console.warn("Cache unavailable, falling back to DB:", err.message);
      next();
    }
  };
};

export const invalidateCache = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
      console.log(`[CACHE INVALIDATED] ${keys.length} keys: ${pattern}`);
    }
  } catch (err) {
    console.warn("Cache invalidation failed:", err.message);
  }
};
