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
    }
  },
  aiUsage: {
    dailyCount: { type: Number, default: 0 },
    lastUsed: { type: Date }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
