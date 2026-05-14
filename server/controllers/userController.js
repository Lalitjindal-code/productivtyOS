const User = require('../models/User');
const Task = require('../models/Task');
const PomodoroSession = require('../models/PomodoroSession');

const TEMP_USER_ID = 'user_mvp_1';

// Ensure MVP user exists in DB (upsert on first call)
const getOrCreateUser = async () => {
  let user = await User.findOne({ userId: TEMP_USER_ID });
  if (!user) {
    user = await User.create({ userId: TEMP_USER_ID });
  }
  return user;
};

// ---- Streak Logic ----
const calculateStreak = async (user) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if there was any task completed yesterday
  const taskYesterday = await Task.findOne({
    userId: TEMP_USER_ID,
    status: 'completed',
    completedAt: { $gte: yesterday, $lt: today }
  });

  const lastActive = user.streak.lastActiveDate
    ? new Date(user.streak.lastActiveDate)
    : null;
  if (lastActive) lastActive.setHours(0, 0, 0, 0);

  const lastActiveIsToday = lastActive && lastActive.getTime() === today.getTime();
  const lastActiveIsYesterday = lastActive && lastActive.getTime() === yesterday.getTime();

  if (lastActiveIsToday) {
    // Already updated today, no change
    return user.streak.current;
  } else if (lastActiveIsYesterday || taskYesterday) {
    // Streak continues
    user.streak.current += 1;
    user.streak.longest = Math.max(user.streak.longest, user.streak.current);
    user.streak.lastActiveDate = today;
  } else {
    // Streak broken
    user.streak.current = 0;
    user.streak.lastActiveDate = today;
  }

  await user.save();
  return user.streak.current;
};

// ---- Touch streak on task completion (called internally) ----
exports.touchStreak = async () => {
  const user = await getOrCreateUser();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastActive = user.streak.lastActiveDate
    ? new Date(user.streak.lastActiveDate)
    : null;
  if (lastActive) lastActive.setHours(0, 0, 0, 0);

  // If first completion today, increment streak
  if (!lastActive || lastActive.getTime() !== today.getTime()) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActive && lastActive.getTime() === yesterday.getTime()) {
      user.streak.current += 1;
    } else if (!lastActive) {
      user.streak.current = 1;
    } else {
      user.streak.current = 1; // reset
    }

    user.streak.longest = Math.max(user.streak.longest, user.streak.current);
    user.streak.lastActiveDate = today;
    await user.save();
  }

  return user.streak.current;
};

// ---- GET /api/user/profile ----
exports.getProfile = async (req, res) => {
  try {
    const user = await getOrCreateUser();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---- PUT /api/user/profile ----
exports.updateProfile = async (req, res) => {
  try {
    const user = await getOrCreateUser();
    const allowed = ['displayName', 'avatarUrl', 'timezone', 'dateOfBirth', 'settings'];
    allowed.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'settings') {
          user.settings = { ...user.settings.toObject(), ...req.body.settings };
        } else {
          user[field] = req.body[field];
        }
      }
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ---- GET /api/user/stats ----
exports.getStats = async (req, res) => {
  try {
    const redisService = require('../services/redisService');
    const cacheKey = `stats:${TEMP_USER_ID}`;
    const cachedStats = await redisService.get(cacheKey);
    if (cachedStats) {
      return res.status(200).json(cachedStats);
    }

    const user = await getOrCreateUser();
    await calculateStreak(user);

    const today = new Date();
    // ... all the aggregation logic ...
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    const tomorrow = new Date(todayStart);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 6);

    const todayTasks = await Task.find({
      userId: TEMP_USER_ID,
      createdAt: { $gte: todayStart, $lt: tomorrow }
    });
    const completedToday = todayTasks.filter(t => t.status === 'completed').length;

    const weekTasks = await Task.find({
      userId: TEMP_USER_ID,
      createdAt: { $gte: weekStart }
    });
    const weekCompleted = weekTasks.filter(t => t.status === 'completed').length;
    const weekCompletionRate = weekTasks.length > 0
      ? Math.round((weekCompleted / weekTasks.length) * 100)
      : 0;

    const pomodorosToday = await PomodoroSession.countDocuments({
      userId: TEMP_USER_ID,
      type: 'work',
      completedAt: { $gte: todayStart, $lt: tomorrow }
    });

    const ninetyDaysAgo = new Date(todayStart);
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 89);

    const completedTasks90 = await Task.find({
      userId: TEMP_USER_ID,
      status: 'completed',
      completedAt: { $gte: ninetyDaysAgo }
    }).select('completedAt');

    const heatmapMap = {};
    completedTasks90.forEach(t => {
      if (!t.completedAt) return;
      const d = new Date(t.completedAt);
      d.setHours(0, 0, 0, 0);
      const key = d.toISOString().split('T')[0];
      heatmapMap[key] = (heatmapMap[key] || 0) + 1;
    });
    const heatmapData = Object.entries(heatmapMap).map(([date, count]) => ({ date, count }));

    const weeklyChart = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(todayStart);
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d);
      const dayEnd = new Date(d);
      dayEnd.setDate(dayEnd.getDate() + 1);
      const count = await Task.countDocuments({
        userId: TEMP_USER_ID,
        status: 'completed',
        completedAt: { $gte: dayStart, $lt: dayEnd }
      });
      weeklyChart.push({
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        count
      });
    }

    const categoryBreakdown = {};
    weekTasks.filter(t => t.status === 'completed').forEach(t => {
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + 1;
    });

    const stats = {
      streak: user.streak,
      totalXP: user.totalXP,
      rpgStats: user.rpgStats,
      character: user.character,
      achievements: user.achievements,
      tasksToday: { completed: completedToday, total: todayTasks.length },
      weekCompletion: { rate: weekCompletionRate, completed: weekCompleted, total: weekTasks.length },
      pomodorosToday,
      heatmapData,
      weeklyChart,
      categoryBreakdown
    };

    await redisService.set(cacheKey, stats, 300); // 5 min
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---- POST /api/user/select-class ----
exports.selectClass = async (req, res) => {
  try {
    const { charClass } = req.body;
    if (!['Warrior', 'Scholar', 'Cyborg', 'Monk'].includes(charClass)) {
      return res.status(400).json({ message: 'Invalid class selection' });
    }

    const user = await getOrCreateUser();
    user.character.class = charClass;
    
    // Set default avatar based on class
    const avatars = {
      'Warrior': '⚔️',
      'Scholar': '📜',
      'Cyborg': '🤖',
      'Monk': '🧘'
    };
    user.character.avatar = avatars[charClass];
    
    // Initial stat boost based on class
    if (user.rpgStats.level === 1 && user.totalXP === 0) {
      if (charClass === 'Warrior') { user.rpgStats.strength = 15; user.rpgStats.maxHP = 120; user.rpgStats.hp = 120; }
      if (charClass === 'Scholar') { user.rpgStats.intelligence = 15; }
      if (charClass === 'Monk') { user.rpgStats.wisdom = 15; }
      if (charClass === 'Cyborg') { user.rpgStats.intelligence = 12; user.rpgStats.strength = 12; }
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---- GET /api/user/rpg-status ----
exports.getRPGStatus = async (req, res) => {
  try {
    const user = await getOrCreateUser();
    res.status(200).json({
      character: user.character,
      rpgStats: user.rpgStats,
      achievements: user.achievements,
      totalXP: user.totalXP
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---- GET /api/user/feed ----
exports.getActivityFeed = async (req, res) => {
  try {
    const Workout = require('../models/Workout');
    const Goal = require('../models/Goal');
    const AIMemory = require('../models/AIMemory');
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // 1. Recent Gym Sessions with PRs
    const workouts = await Workout.find({ 
      userId: TEMP_USER_ID, 
      date: { $gte: weekAgo } 
    }).sort({ date: -1 }).limit(5);

    // 2. Recent Defeated Bosses
    const bosses = await Goal.find({ 
      userId: TEMP_USER_ID, 
      'boss.isDefeated': true,
      updatedAt: { $gte: weekAgo } 
    }).sort({ updatedAt: -1 }).limit(5);

    // 3. Recent AI Insights
    const memory = await AIMemory.findOne({ userId: TEMP_USER_ID });
    const insights = memory?.weeklyInsights?.slice(-3) || [];

    // Combine into a feed
    const feed = [
      ...workouts.map(w => ({
        type: 'gym',
        date: w.date,
        title: 'Workout Completed',
        content: w.prsDetected?.length > 0 
          ? `Detected ${w.prsDetected.length} PRs! (${w.prsDetected.map(p => p.exerciseName).join(', ')})`
          : `${w.exercises.length} exercises logged. Total Volume: ${w.totalVolume}kg`,
        icon: w.prsDetected?.length > 0 ? '🔥' : '🏋️'
      })),
      ...bosses.map(b => ({
        type: 'boss',
        date: b.updatedAt,
        title: 'Boss Defeated!',
        content: `You defeated ${b.boss.name} by completing "${b.title}"`,
        icon: '⚔️'
      })),
      ...insights.map(i => ({
        type: 'insight',
        date: i.createdAt || weekAgo,
        title: 'New AI Insight',
        content: typeof i === 'string' ? i : i.description,
        icon: '🧠'
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
