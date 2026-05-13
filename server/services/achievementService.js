const User = require('../models/User');

const ACHIEVEMENTS = {
  first_blood: {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Completed your first task!'
  },
  boss_slayer: {
    id: 'boss_slayer',
    title: 'Boss Slayer',
    description: 'Defeated your first Boss (Goal completed)!'
  },
  streak_starter: {
    id: 'streak_starter',
    title: 'Streak Starter',
    description: 'Maintained a 7-day productivity streak!'
  },
  level_up: {
    id: 'level_up',
    title: 'Level Up',
    description: 'Reached Level 2!'
  }
};

exports.unlockAchievement = async (userId, achievementId) => {
  const user = await User.findOne({ userId });
  if (!user) return null;

  // Check if already unlocked
  if (user.achievements.some(a => a.id === achievementId)) {
    return null;
  }

  const achievement = ACHIEVEMENTS[achievementId];
  if (!achievement) return null;

  user.achievements.push({
    ...achievement,
    unlockedAt: new Date()
  });

  await user.save();
  return achievement;
};

exports.checkTaskAchievements = async (userId, totalCompleted) => {
  if (totalCompleted === 1) {
    return await this.unlockAchievement(userId, 'first_blood');
  }
  return null;
};

exports.checkLevelAchievements = async (userId, level) => {
  if (level === 2) {
    return await this.unlockAchievement(userId, 'level_up');
  }
  return null;
};

exports.checkBossAchievements = async (userId) => {
  return await this.unlockAchievement(userId, 'boss_slayer');
};
