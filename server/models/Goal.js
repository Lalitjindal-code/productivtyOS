const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  targetDate: { type: Date },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date }
});

const goalSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true }, // Using String for MVP hardcoded user
  title: { type: String, required: true },
  why: { type: String, required: true }, // Motivation
  category: { 
    type: String, 
    enum: ['career', 'health', 'finance', 'learning', 'personal', 'project'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active'
  },
  timeline: {
    start: { type: Date, default: Date.now },
    end: { type: Date, required: true }
  },
  milestones: [milestoneSchema],
  boss: {
    name: { type: String, default: 'The Productivity Void' },
    avatar: { type: String, default: '🌑' },
    hp: { type: Number, default: 100 },
    maxHP: { type: Number, default: 100 },
    isDefeated: { type: Boolean, default: false }
  },
  xpEarned: { type: Number, default: 0 }
}, {
  timestamps: true
});

goalSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Goal', goalSchema);
