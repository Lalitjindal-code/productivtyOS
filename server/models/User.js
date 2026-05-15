const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  displayName: { type: String, default: 'Productivity Warrior' },
  avatarUrl: { type: String, default: '' },
  timezone: { type: String, default: 'Asia/Kolkata' },
  dateOfBirth: { type: Date },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActiveDate: { type: Date } // Date of last task completion
  },
  totalXP: { type: Number, default: 0 },
  settings: {
    pomodoro: {
      work: { type: Number, default: 25 },
      shortBreak: { type: Number, default: 5 },
      longBreak: { type: Number, default: 15 },
      longBreakInterval: { type: Number, default: 4 }
    },
    notifications: {
      taskReminders: { type: Boolean, default: true },
      streakReminders: { type: Boolean, default: true },
      dailyDigest: { type: Boolean, default: false }
    },
    appearance: {
      theme: { type: String, default: 'dark' },
      sidebarCollapsed: { type: Boolean, default: false }
    },
    gymPlan: {
      Monday: { type: String, default: 'Rest' },
      Tuesday: { type: String, default: 'Rest' },
      Wednesday: { type: String, default: 'Rest' },
      Thursday: { type: String, default: 'Rest' },
      Friday: { type: String, default: 'Rest' },
      Saturday: { type: String, default: 'Rest' },
      Sunday: { type: String, default: 'Rest' }
    }
  },
  aiUsage: {
    dailyCount: { type: Number, default: 0 },
    lastUsed: { type: Date }
  },
  character: {
    class: { type: String, enum: ['Warrior', 'Scholar', 'Cyborg', 'Monk', 'None'], default: 'None' },
    avatar: { type: String, default: '👤' }
  },
  rpgStats: {
    level: { type: Number, default: 1 },
    currentXP: { type: Number, default: 0 },
    nextLevelXP: { type: Number, default: 100 },
    hp: { type: Number, default: 100 },
    maxHP: { type: Number, default: 100 },
    strength: { type: Number, default: 10 },
    intelligence: { type: Number, default: 10 },
    charisma: { type: Number, default: 10 },
    wisdom: { type: Number, default: 10 },
    luck: { type: Number, default: 10 }
  },
  achievements: [{
    id: { type: String },
    title: { type: String },
    description: { type: String },
    unlockedAt: { type: Date, default: Date.now }
  }],
  fcmToken: { type: String, default: '' }, // For push notifications
  mobileDevices: [{
    deviceId: { type: String },
    model: { type: String },
    os: { type: String },
    lastActive: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
