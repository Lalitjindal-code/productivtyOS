const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true }, // Using String for MVP instead of ObjectId, to allow hardcoded 'user_1'
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { 
    type: String, 
    enum: ['work', 'study', 'gym', 'personal', 'creative', 'finance', 'health'],
    required: true
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: { 
    type: String, 
    enum: ['todo', 'inprogress', 'completed', 'failed', 'archived'],
    default: 'todo'
  },
  estimatedDuration: { type: Number, default: 30 }, // in minutes
  deadline: { type: Date },
  completedAt: { type: Date },
  failedAt: { type: Date },
  xpEarned: { type: Number, default: 0 },
  subtasks: [subtaskSchema],
  recurring: {
    enabled: { type: Boolean, default: false },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'custom'] },
    customDays: [{ type: Number }],
    nextOccurrence: { type: Date }
  },
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  aiQuizAnswers: [{ 
    question: String, 
    answer: String, 
    timestamp: Date 
  }],
  pomodorosUsed: { type: Number, default: 0 },
  wallOfShame: { type: Boolean, default: false },
  aiRoast: { type: String, default: '' },
  penaltyTaskFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
