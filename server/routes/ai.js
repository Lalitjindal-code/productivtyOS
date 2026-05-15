const express = require('express');

const router = express.Router();

const aiService = require('../services/aiService');
const aiRateLimit = require('../middleware/aiRateLimit');
const auth = require('../middleware/auth');
const redisClient = require('../config/redis');
const User = require('../models/User');
const Task = require('../models/Task');
const AIMemory = require('../models/AIMemory');
const Journal = require('../models/Journal');
const Goal = require('../models/Goal');
const PomodoroSession = require('../models/PomodoroSession');

const CACHE_TTL_SECONDS = {
  weeklyInsight: 6 * 60 * 60,
  dna: 24 * 60 * 60,
  journalSummary: 12 * 60 * 60,
};

const jsonError = (res, code, message, statusCode = 500, extra = {}) => res.status(statusCode).json({
  success: false,
  error: {
    code,
    message,
    statusCode,
    ...extra,
  },
});

const jsonSuccess = (res, data) => res.json({
  success: true,
  data,
});

const updateAIUsage = async (userId) => {
  try {
    await User.findOneAndUpdate(
      { userId },
      {
        $inc: { 'aiUsage.dailyCount': 1 },
        $set: { 'aiUsage.lastUsed': new Date() },
      },
      { new: true },
    );
  } catch (error) {
    console.error('[AI Routes] aiUsage update failed:', error.message);
  }
};

const getCache = async (key) => {
  try {
    const cached = await redisClient.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('[AI Routes] cache read failed:', error.message);
    return null;
  }
};

const setCache = async (key, value, ttlSeconds) => {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (error) {
    console.error('[AI Routes] cache write failed:', error.message);
  }
};

const getUserContext = async (userId) => {
  const [user, memory, activeGoals, todayTasks] = await Promise.all([
    User.findOne({ userId }).lean(),
    AIMemory.findOne({ userId }).lean(),
    Goal.find({ userId, status: 'active' }).sort({ createdAt: -1 }).limit(1).lean(),
    Task.find({
      userId,
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    }).lean(),
  ]);

  const topGoalMemory = Array.isArray(memory?.memories)
    ? [...memory.memories].reverse().find((item) => item.type === 'goal')
    : null;

  return {
    user,
    memory,
    topGoal: topGoalMemory?.content || activeGoals?.[0]?.title || 'Aaj ka sabse important task',
    completedToday: todayTasks.filter((task) => task.status === 'completed').length,
    totalToday: todayTasks.length,
    streak: user?.streak?.current || 0,
    level: Math.max(1, Math.floor((user?.totalXP || 0) / 1000) + 1),
  };
};

const buildTaskQuizHistory = async (userId, task) => {
  const recentTasks = await Task.find({
    userId,
    category: task.category,
    _id: { $ne: task._id },
  })
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();

  return recentTasks.map((item) => ({
    title: item.title,
    status: item.status,
    aiQuizAnswers: item.aiQuizAnswers || [],
  }));
};

const buildWeekData = async (userId) => {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const [tasks, journals, sessions, memory, user] = await Promise.all([
    Task.find({
      userId,
      updatedAt: { $gte: sevenDaysAgo },
    }).lean(),
    Journal.find({
      userId,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: -1 }).lean(),
    PomodoroSession.find({
      userId,
      completedAt: { $gte: sevenDaysAgo },
    }).lean(),
    AIMemory.findOne({ userId }).lean(),
    User.findOne({ userId }).lean(),
  ]);

  const completed = tasks.filter((task) => task.status === 'completed');
  const failed = tasks.filter((task) => task.status === 'failed');
  const categoryCounts = tasks.reduce((accumulator, task) => {
    accumulator[task.category] = (accumulator[task.category] || 0) + 1;
    return accumulator;
  }, {});

  return {
    userId,
    weekStart: sevenDaysAgo,
    weekEnd: now,
    taskStats: {
      total: tasks.length,
      completed: completed.length,
      failed: failed.length,
      completionRate: tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0,
      byCategory: categoryCounts,
    },
    journalEntries: journals,
    pomodoroSessions: sessions,
    memory: memory?.memories || [],
    streak: user?.streak || {},
  };
};

const buildNinetyDayData = async (userId) => {
  const now = new Date();
  const ninetyDaysAgo = new Date(now);
  ninetyDaysAgo.setDate(now.getDate() - 90);

  const [tasks, journals, sessions, memory, user, goals] = await Promise.all([
    Task.find({
      userId,
      updatedAt: { $gte: ninetyDaysAgo },
    }).lean(),
    Journal.find({
      userId,
      date: { $gte: ninetyDaysAgo },
    }).sort({ date: -1 }).lean(),
    PomodoroSession.find({
      userId,
      completedAt: { $gte: ninetyDaysAgo },
    }).lean(),
    AIMemory.findOne({ userId }).lean(),
    User.findOne({ userId }).lean(),
    Goal.find({ userId }).lean(),
  ]);

  const completedTasks = tasks.filter((task) => task.status === 'completed');
  const failedTasks = tasks.filter((task) => task.status === 'failed');
  const byCategory = tasks.reduce((accumulator, task) => {
    accumulator[task.category] = (accumulator[task.category] || 0) + 1;
    return accumulator;
  }, {});
  const totalPomodoroMinutes = sessions.reduce((sum, session) => sum + (session.duration || 0), 0);

  return {
    userId,
    totalDaysTracked: 90,
    taskStats: {
      total: tasks.length,
      completed: completedTasks.length,
      failed: failedTasks.length,
      completionRate: tasks.length ? Math.round((completedTasks.length / tasks.length) * 100) : 0,
      byCategory,
    },
    journalEntries: journals,
    pomodoroSessions: sessions,
    totalPomodoroMinutes,
    memory: memory?.memories || [],
    goals,
    streak: user?.streak || {},
  };
};

const handleRouteError = (res, error, fallbackCode = 'AI_ERROR') => {
  console.error('[AI Routes] request failed:', error.message);
  return jsonError(res, fallbackCode, error.message || 'AI request failed', 500);
};

router.post('/quiz', auth, aiRateLimit('quiz'), async (req, res) => {
  try {
    const { taskId, userHistory: incomingHistory } = req.body || {};
    if (!taskId) {
      return jsonError(res, 'AI_VALIDATION_ERROR', 'Task ID required hai.', 400);
    }

    const task = await Task.findOne({ _id: taskId, userId: req.user.userId });
    if (!task) {
      return jsonError(res, 'AI_NOT_FOUND', 'Task nahi mila.', 404);
    }

    const userHistory = Array.isArray(incomingHistory) && incomingHistory.length
      ? incomingHistory
      : await buildTaskQuizHistory(req.user.userId, task);

    const result = await aiService.generateTaskQuiz(task, userHistory);
    await updateAIUsage(req.user.userId);
    return jsonSuccess(res, result);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.post('/roast', auth, aiRateLimit('roast'), async (req, res) => {
  try {
    const { taskId, missedCount, mode = 'soft', recentFailures = [] } = req.body || {};
    if (!taskId) {
      return jsonError(res, 'AI_VALIDATION_ERROR', 'Task ID required hai.', 400);
    }

    const task = await Task.findOne({ _id: taskId, userId: req.user.userId });
    if (!task) {
      return jsonError(res, 'AI_NOT_FOUND', 'Task nahi mila.', 404);
    }

    const failures = Array.isArray(recentFailures) && recentFailures.length
      ? recentFailures
      : await Task.find({
        userId: req.user.userId,
        status: 'failed',
      })
        .sort({ failedAt: -1 })
        .limit(5)
        .lean();

    const result = await aiService.generateRoast(task, Number(missedCount || 1), mode, failures);
    await updateAIUsage(req.user.userId);
    return jsonSuccess(res, result);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.get('/weekly-insight', auth, aiRateLimit('weeklyInsight'), async (req, res) => {
  try {
    const cacheKey = `ai:weekly-insight:${req.user.userId}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      await updateAIUsage(req.user.userId);
      return jsonSuccess(res, cached);
    }

    const weekData = await buildWeekData(req.user.userId);
    const result = await aiService.generateWeeklyMemoryInsight(weekData);

    await AIMemory.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $setOnInsert: { userId: req.user.userId },
        $push: {
          weeklyInsights: {
            weekOf: new Date(),
            insights: (result.insights || []).map((item) => `${item.title}: ${item.description}`),
            generatedAt: new Date(),
          },
        },
      },
      { upsert: true, new: true },
    );

    await setCache(cacheKey, result, CACHE_TTL_SECONDS.weeklyInsight);
    await updateAIUsage(req.user.userId);
    return jsonSuccess(res, result);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.get('/dna', auth, aiRateLimit('dna'), async (req, res) => {
  try {
    const cacheKey = `ai:dna:${req.user.userId}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      await updateAIUsage(req.user.userId);
      return jsonSuccess(res, cached);
    }

    const ninetyDayData = await buildNinetyDayData(req.user.userId);
    const result = await aiService.generateDNAReport(ninetyDayData);

    await AIMemory.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $setOnInsert: { userId: req.user.userId },
        $set: {
          productivityDNA: {
            generatedAt: new Date(),
            peakHours: result.peakHours || [],
            bestDay: result.bestDay || '',
            worstDay: result.worstDay || '',
            kryptonite: result.kryptonite || '',
            sweetSpotDuration: result.sweetSpotDuration || 0,
            formula: result.formula || '',
          },
        },
      },
      { upsert: true, new: true },
    );

    await setCache(cacheKey, result, CACHE_TTL_SECONDS.dna);
    await updateAIUsage(req.user.userId);
    return jsonSuccess(res, result);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.get('/journal-summary', auth, aiRateLimit('journalSummary'), async (req, res) => {
  try {
    const cacheKey = `ai:journal-summary:${req.user.userId}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      await updateAIUsage(req.user.userId);
      return jsonSuccess(res, cached);
    }

    const entries = await Journal.find({ userId: req.user.userId })
      .sort({ date: -1 })
      .limit(30)
      .lean();

    const result = await aiService.generateJournalSummary(entries);
    await setCache(cacheKey, result, CACHE_TTL_SECONDS.journalSummary);
    await updateAIUsage(req.user.userId);
    return jsonSuccess(res, result);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.post('/chat', auth, aiRateLimit('chat'), async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body || {};
    if (!message) {
      return jsonError(res, 'AI_VALIDATION_ERROR', 'Message required hai.', 400);
    }

    const context = await getUserContext(req.user.userId);
    const result = await aiService.chatWithBrain(message, conversationHistory, {
      name: context.user?.displayName || 'User',
      streak: context.streak,
      level: context.level,
      completedToday: context.completedToday,
      totalToday: context.totalToday,
      topGoal: context.topGoal,
    });

    await updateAIUsage(req.user.userId);
    return jsonSuccess(res, result);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.post('/suggest-schedule', auth, aiRateLimit('schedule'), async (req, res) => {
  try {
    const { taskIds = [] } = req.body || {};
    if (!Array.isArray(taskIds) || !taskIds.length) {
      return jsonError(res, 'AI_VALIDATION_ERROR', 'Task IDs required hain.', 400);
    }

    const [tasks, memory] = await Promise.all([
      Task.find({ _id: { $in: taskIds }, userId: req.user.userId }).lean(),
      AIMemory.findOne({ userId: req.user.userId }).lean(),
    ]);

    const result = await aiService.suggestTaskSchedule(tasks, memory?.productivityDNA || {}, new Date());
    await updateAIUsage(req.user.userId);
    return jsonSuccess(res, result);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

router.post('/suggest-music', auth, async (req, res) => {
  try {
    const { title, category } = req.body || {};
    const result = await aiService.suggestMusic(title, category);
    return jsonSuccess(res, result);
  } catch (error) {
    return handleRouteError(res, error);
  }
});

module.exports = router;
