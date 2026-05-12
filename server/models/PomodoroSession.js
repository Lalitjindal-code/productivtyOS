const mongoose = require('mongoose');

const distractionSchema = new mongoose.Schema({
  timeLogged: { type: Date, default: Date.now },
  description: { type: String, required: true }
});

const pomodoroSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Optional: link to task
  duration: { type: Number, required: true }, // duration in minutes
  type: {
    type: String,
    enum: ['work', 'shortBreak', 'longBreak'],
    required: true
  },
  completedAt: { type: Date, default: Date.now },
  distractionsLog: [distractionSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('PomodoroSession', pomodoroSessionSchema);
