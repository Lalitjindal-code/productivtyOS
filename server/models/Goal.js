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
  xpEarned: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);
