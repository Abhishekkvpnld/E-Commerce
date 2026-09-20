import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  retryStrategy: (times) => {
    if (times > 3) {
      console.warn("⚠️ Redis unavailable — caching disabled, falling back to MongoDB");
      return null; // stop retrying after 3 attempts
    }
    return Math.min(times * 200, 2000);
  },
  maxRetriesPerRequest: null,
  lazyConnect: true, // only connect when first used
  enableOfflineQueue: false,
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", () => {}); // suppress per-error noise — retryStrategy handles it

export default redis;
