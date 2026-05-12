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
    const user = await getOrCreateUser();
    await calculateStreak(user);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - 6); // last 7 days

    // Today's tasks
    const todayTasks = await Task.find({
      userId: TEMP_USER_ID,
      createdAt: { $gte: today, $lt: tomorrow }
    });
    const completedToday = todayTasks.filter(t => t.status === 'completed').length;

    // This week tasks
    const weekTasks = await Task.find({
      userId: TEMP_USER_ID,
      createdAt: { $gte: weekStart }
    });
    const weekCompleted = weekTasks.filter(t => t.status === 'completed').length;
    const weekCompletionRate = weekTasks.length > 0
      ? Math.round((weekCompleted / weekTasks.length) * 100)
      : 0;

    // Today's pomodoros
    const pomodorosToday = await PomodoroSession.countDocuments({
      userId: TEMP_USER_ID,
      type: 'work',
      completedAt: { $gte: today, $lt: tomorrow }
    });

    // 90-day activity heatmap
    const ninetyDaysAgo = new Date(today);
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 89);

    const completedTasks90 = await Task.find({
      userId: TEMP_USER_ID,
      status: 'completed',
      completedAt: { $gte: ninetyDaysAgo }
    }).select('completedAt');

    // Group by date
    const heatmapMap = {};
    completedTasks90.forEach(t => {
      if (!t.completedAt) return;
      const d = new Date(t.completedAt);
      d.setHours(0, 0, 0, 0);
      const key = d.toISOString().split('T')[0];
      heatmapMap[key] = (heatmapMap[key] || 0) + 1;
    });
    const heatmapData = Object.entries(heatmapMap).map(([date, count]) => ({ date, count }));

    // Weekly bar chart (last 7 days)
    const weeklyChart = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
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

    // Category breakdown (this week)
    const categoryBreakdown = {};
    weekTasks.filter(t => t.status === 'completed').forEach(t => {
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + 1;
    });

    res.status(200).json({
      streak: user.streak,
      totalXP: user.totalXP,
      tasksToday: { completed: completedToday, total: todayTasks.length },
      weekCompletion: { rate: weekCompletionRate, completed: weekCompleted, total: weekTasks.length },
      pomodorosToday,
      heatmapData,
      weeklyChart,
      categoryBreakdown
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
