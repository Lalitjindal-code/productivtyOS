const redisClient = require('../config/redis');
const User = require('../models/User');

const DEFAULT_DAILY_LIMIT = Number(process.env.AI_DAILY_LIMIT || 50);

const LIMITS = {
  quiz: { limit: 30, type: 'hourly' },
  roast: { limit: 20, type: 'hourly' },
  chat: { limit: 50, type: 'daily' },
  weeklyInsight: { limit: DEFAULT_DAILY_LIMIT, type: 'daily' },
  dna: { limit: DEFAULT_DAILY_LIMIT, type: 'daily' },
  journalSummary: { limit: DEFAULT_DAILY_LIMIT, type: 'daily' },
  schedule: { limit: DEFAULT_DAILY_LIMIT, type: 'daily' },
  default: { limit: DEFAULT_DAILY_LIMIT, type: 'daily' },
};

const getUserTimezone = async (userId) => {
  try {
    const user = await User.findOne({ userId }).select('timezone').lean();
    return user?.timezone || 'Asia/Kolkata';
  } catch (error) {
    return 'Asia/Kolkata';
  }
};

const getSecondsUntilNextHour = () => {
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setMinutes(0, 0, 0);
  nextHour.setHours(nextHour.getHours() + 1);
  return Math.max(1, Math.ceil((nextHour.getTime() - now.getTime()) / 1000));
};

const getSecondsUntilMidnightInTimezone = async (timezone) => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type) => parts.find((part) => part.type === type)?.value || '00';
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const localNowString = `${year}-${month}-${day}T00:00:00`;
  const localMidnight = new Date(localNowString);

  const nowParts = formatter.formatToParts(now);
  const hour = Number(nowParts.find((part) => part.type === 'hour')?.value || '0');
  const minute = Number(nowParts.find((part) => part.type === 'minute')?.value || '0');
  const second = Number(nowParts.find((part) => part.type === 'second')?.value || '0');
  const elapsed = (hour * 3600) + (minute * 60) + second;
  const secondsInDay = 24 * 60 * 60;

  if (Number.isNaN(localMidnight.getTime())) {
    return secondsInDay;
  }

  return Math.max(1, secondsInDay - elapsed);
};

/**
 * Redis-backed per-user AI rate limiter.
 * @param {string} endpointType
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => Promise<void>}
 */
const aiRateLimit = (endpointType) => {
  return async (req, res, next) => {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
          statusCode: 401,
        },
      });
    }

    const config = LIMITS[endpointType] || LIMITS.default;
    const timezone = await getUserTimezone(userId);
    const windowSeconds = config.type === 'hourly'
      ? getSecondsUntilNextHour()
      : await getSecondsUntilMidnightInTimezone(timezone);
    const key = `ai_rate_limit:${endpointType}:${userId}`;

    try {
      const currentCount = Number.parseInt(await redisClient.get(key), 10) || 0;

      if (currentCount >= config.limit) {
        const ttl = await redisClient.ttl(key);
        return res.status(429).json({
          success: false,
          error: {
            code: 'AI_RATE_LIMIT',
            message: 'Aaj ki AI limit ho gayi — kal phir aana!',
            resetIn: ttl > 0 ? ttl : windowSeconds,
            statusCode: 429,
          },
        });
      }

      if (currentCount === 0) {
        await redisClient.set(key, '1', { EX: windowSeconds });
      } else {
        await redisClient.incr(key);
      }

      return next();
    } catch (error) {
      console.error('[AI Rate Limit] Redis fallback:', error.message);
      return next();
    }
  };
};

module.exports = aiRateLimit;
