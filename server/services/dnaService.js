const Task = require('../models/Task');
const PomodoroSession = require('../models/PomodoroSession');

/**
 * Aggregates productivity data for the last 90 days.
 * @param {string} userId 
 * @returns {Promise<Object>}
 */
const aggregateNinetyDayData = async (userId) => {
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  // Fetch all tasks in the last 90 days
  const tasks = await Task.find({
    userId,
    createdAt: { $gte: ninetyDaysAgo }
  });

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const failedTasks = tasks.filter(t => t.status === 'failed');

  // 1. Peak Hours (Average completions per hour)
  const hourlyCompletions = Array(24).fill(0);
  completedTasks.forEach(t => {
    if (t.completedAt) {
      const hour = new Date(t.completedAt).getHours();
      hourlyCompletions[hour]++;
    }
  });

  const peakHours = hourlyCompletions.map((count, hour) => ({
    hour,
    score: count
  }));

  // 2. Kryptonite (Highest failure rate category)
  const categoryStats = {};
  tasks.forEach(t => {
    if (!categoryStats[t.category]) {
      categoryStats[t.category] = { total: 0, failed: 0 };
    }
    categoryStats[t.category].total++;
    if (t.status === 'failed') {
      categoryStats[t.category].failed++;
    }
  });

  let kryptonite = 'None';
  let maxFailureRate = 0;
  Object.entries(categoryStats).forEach(([cat, stats]) => {
    const rate = stats.failed / stats.total;
    if (rate > maxFailureRate && stats.total > 2) { // Need at least 3 tasks to call it kryptonite
      maxFailureRate = rate;
      kryptonite = cat;
    }
  });

  // 3. Sweet Spot Duration (Most common estimated duration for completed tasks)
  const durationCounts = {};
  completedTasks.forEach(t => {
    const dur = t.estimatedDuration || 30;
    durationCounts[dur] = (durationCounts[dur] || 0) + 1;
  });

  let sweetSpotDuration = 30;
  let maxCount = 0;
  Object.entries(durationCounts).forEach(([dur, count]) => {
    if (count > maxCount) {
      maxCount = count;
      sweetSpotDuration = parseInt(dur);
    }
  });

  // 4. Best & Worst Days
  const dayStats = Array(7).fill(0).map(() => ({ completed: 0, total: 0 }));
  tasks.forEach(t => {
    const day = new Date(t.createdAt).getDay();
    dayStats[day].total++;
    if (t.status === 'completed') {
      dayStats[day].completed++;
    }
  });

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let bestDayIndex = 1; // Default Monday
  let worstDayIndex = 0; // Default Sunday
  let maxRate = -1;
  let minRate = 2;

  dayStats.forEach((stats, i) => {
    if (stats.total > 0) {
      const rate = stats.completed / stats.total;
      if (rate > maxRate) {
        maxRate = rate;
        bestDayIndex = i;
      }
      if (rate < minRate) {
        minRate = rate;
        worstDayIndex = i;
      }
    }
  });

  // 5. Pomodoro patterns
  const pomodoros = await PomodoroSession.countDocuments({
    userId,
    type: 'work',
    completedAt: { $gte: ninetyDaysAgo }
  });

  return {
    userId,
    stats: {
      totalTasks: tasks.length,
      completed: completedTasks.length,
      failed: failedTasks.length,
      pomodoros,
      peakHours,
      bestDay: days[bestDayIndex],
      worstDay: days[worstDayIndex],
      kryptonite,
      sweetSpotDuration,
      categoryPerformance: Object.entries(categoryStats).map(([cat, s]) => ({
        category: cat,
        completionRate: Math.round(( (s.total - s.failed) / s.total) * 100)
      }))
    }
  };
};

module.exports = {
  aggregateNinetyDayData
};
