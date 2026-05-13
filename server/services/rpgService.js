const User = require('../models/User');
const achievementService = require('./achievementService');


const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000];

/**
 * Calculates XP gain based on task priority and type
 */
const calculateXPGain = (task) => {
  let xp = 10; // base xp
  
  if (task.priority === 'high') xp = 25;
  if (task.priority === 'critical') xp = 50;
  
  // Bonus for subtasks
  if (task.subtasks && task.subtasks.length > 0) {
    const completedSubtasks = task.subtasks.filter(s => s.completed).length;
    xp += completedSubtasks * 5;
  }
  
  return xp;
};

/**
 * Updates user XP and handles level up logic
 */
const updateUserXP = async (userId, xpGain) => {
  const user = await User.findOne({ userId });
  if (!user) return null;

  user.totalXP += xpGain;
  user.rpgStats.currentXP += xpGain;

  // Level Up Logic
  let leveledUp = false;
  while (user.rpgStats.currentXP >= user.rpgStats.nextLevelXP) {
    user.rpgStats.level += 1;
    user.rpgStats.currentXP -= user.rpgStats.nextLevelXP;
    
    // Set next threshold
    const nextIdx = Math.min(user.rpgStats.level, LEVEL_THRESHOLDS.length - 1);
    user.rpgStats.nextLevelXP = LEVEL_THRESHOLDS[nextIdx] - (LEVEL_THRESHOLDS[nextIdx-1] || 0);
    if (user.rpgStats.nextLevelXP <= 0) user.rpgStats.nextLevelXP = 5000; // default for high levels

    // Stat increases based on class
    applyStatIncreases(user);
    leveledUp = true;
    
    // Check for level achievements
    await achievementService.checkLevelAchievements(userId, user.rpgStats.level);
  }

  // HP Recovery on completion
  if (user.rpgStats.hp < user.rpgStats.maxHP) {
    user.rpgStats.hp = Math.min(user.rpgStats.maxHP, user.rpgStats.hp + 5);
  }

  await user.save();
  return { user, leveledUp };
};

/**
 * Applies stat increases based on character class
 */
const applyStatIncreases = (user) => {
  const charClass = user.character.class;
  
  switch (charClass) {
    case 'Warrior':
      user.rpgStats.strength += 3;
      user.rpgStats.luck += 1;
      user.rpgStats.maxHP += 20;
      break;
    case 'Scholar':
      user.rpgStats.intelligence += 3;
      user.rpgStats.wisdom += 1;
      break;
    case 'Monk':
      user.rpgStats.wisdom += 3;
      user.rpgStats.intelligence += 1;
      break;
    case 'Cyborg':
      user.rpgStats.intelligence += 2;
      user.rpgStats.strength += 2;
      break;
    default:
      // None or unknown
      user.rpgStats.strength += 1;
      user.rpgStats.intelligence += 1;
      user.rpgStats.wisdom += 1;
      user.rpgStats.charisma += 1;
      break;
  }
  
  // Full heal on level up
  user.rpgStats.hp = user.rpgStats.maxHP;
};

/**
 * Handles HP loss on task failure
 */
const updateUserHP = async (userId, hpLoss = 10) => {
  const user = await User.findOne({ userId });
  if (!user) return null;

  user.rpgStats.hp = Math.max(0, user.rpgStats.hp - hpLoss);
  await user.save();
  
  return user;
};

/**
 * Checks and unlocks achievements (Proxy to achievementService)
 */
const checkAchievements = async (userId, context) => {
  if (context === 'task_complete') {
    return await achievementService.checkTaskAchievements(userId, 1); // Placeholder for count
  }
  return [];
};

module.exports = {
  calculateXPGain,
  updateUserXP,
  updateUserHP,
  checkAchievements
};
