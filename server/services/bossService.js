const Goal = require('../models/Goal');
const rpgService = require('./rpgService');

const BOSS_VARIATIONS = {
  career: [
    { name: 'The Micromanaging Hydra', avatar: '🐉' },
    { name: 'The Corporate Kraken', avatar: '🦑' }
  ],
  health: [
    { name: 'The Sugar Golem', avatar: '🍪' },
    { name: 'The Couch Potato Slime', avatar: '🥔' }
  ],
  finance: [
    { name: 'The Debt Dragon', avatar: '🐲' },
    { name: 'The Inflation Imp', avatar: '👺' }
  ],
  learning: [
    { name: 'The Fog of Confusion', avatar: '🌫️' },
    { name: 'The Procrastination Pixie', avatar: '🧚' }
  ],
  personal: [
    { name: 'The Inner Critic Ghost', avatar: '👻' },
    { name: 'The Anxiety Ogre', avatar: '👹' }
  ],
  project: [
    { name: 'The Scope Creep Spider', avatar: '🕷️' },
    { name: 'The Bug Behemoth', avatar: '👾' }
  ]
};

exports.initializeGoalBoss = (goal) => {
  const variations = BOSS_VARIATIONS[goal.category] || BOSS_VARIATIONS.project;
  const variation = variations[Math.floor(Math.random() * variations.length)];
  
  const milestoneCount = goal.milestones.length || 1;
  const totalHP = milestoneCount * 100;
  
  goal.boss = {
    name: variation.name,
    avatar: variation.avatar,
    hp: totalHP,
    maxHP: totalHP,
    isDefeated: false
  };
  
  return goal;
};

exports.damageBoss = async (goal, milestoneId) => {
  if (!goal || goal.boss.isDefeated) return null;

  const milestone = goal.milestones.id(milestoneId);
  if (!milestone || !milestone.completed) return null;

  // Each milestone deals 100 damage
  const damage = 100;
  goal.boss.hp = Math.max(0, goal.boss.hp - damage);

  let rewards = null;

  if (goal.boss.hp === 0 && !goal.boss.isDefeated) {
    goal.boss.isDefeated = true;
    // Massive XP Reward for defeating a boss
    const bossDefeatXP = 200;
    const { leveledUp } = await rpgService.updateUserXP(goal.userId, bossDefeatXP);
    
    rewards = {
      bossDefeated: true,
      xpGained: bossDefeatXP,
      leveledUp
    };
  }

  // We don't save here, the controller will save
  return {
    currentHP: goal.boss.hp,
    maxHP: goal.boss.maxHP,
    rewards
  };
};
