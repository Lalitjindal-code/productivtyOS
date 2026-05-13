const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');
const rpgService = require('../services/rpgService');
require('dotenv').config();

const TEMP_USER_ID = 'user_mvp_1';

async function testRPG() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // 1. Reset user for clean test
    await User.deleteMany({ userId: TEMP_USER_ID });
    let user = await User.create({ userId: TEMP_USER_ID });
    console.log('User created:', user.userId);

    // 2. Select Class
    user.character.class = 'Warrior';
    user.character.avatar = '⚔️';
    await user.save();
    console.log('Class selected: Warrior');

    // 3. Test XP Gain
    const fakeTask = { priority: 'critical', subtasks: [] };
    const xpGain = rpgService.calculateXPGain(fakeTask);
    console.log('Calculated XP Gain (Critical):', xpGain); // Should be 50

    const { leveledUp } = await rpgService.updateUserXP(TEMP_USER_ID, 120);
    user = await User.findOne({ userId: TEMP_USER_ID });
    console.log('Updated Stats:', {
      level: user.rpgStats.level,
      currentXP: user.rpgStats.currentXP,
      strength: user.rpgStats.strength,
      leveledUp
    });

    // 4. Test HP Loss
    await rpgService.updateUserHP(TEMP_USER_ID, 20);
    user = await User.findOne({ userId: TEMP_USER_ID });
    console.log('HP after loss:', user.rpgStats.hp);

    // 5. Test Achievement
    const newAchievements = await rpgService.checkAchievements(TEMP_USER_ID, {});
    console.log('Unlocked Achievements:', newAchievements.map(a => a.title));

    console.log('RPG System Test PASSED');
    process.exit(0);
  } catch (error) {
    console.error('Test FAILED:', error);
    process.exit(1);
  }
}

testRPG();
