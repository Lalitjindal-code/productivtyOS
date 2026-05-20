const PomodoroSession = require('../models/PomodoroSession');
const Task = require('../models/Task');

exports.logSession = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { taskId, duration, type, distractionsLog } = req.body;

    const newSession = new PomodoroSession({
      userId,
      taskId: taskId || undefined,
      duration,
      type,
      distractionsLog,
    });

    const savedSession = await newSession.save();

    // If it was a 'work' session linked to a task, increment pomodorosUsed
    if (type === 'work' && taskId) {
      await Task.findOneAndUpdate(
        { _id: taskId, userId },
        { $inc: { pomodorosUsed: 1 } }
      );
    }

    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDailyStats = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const sessions = await PomodoroSession.find({
      userId: req.user.userId,
      completedAt: { $gte: startOfDay },
    });

    const completedPomodoros = sessions.filter(s => s.type === 'work').length;
    const totalFocusMinutes = sessions
      .filter(s => s.type === 'work')
      .reduce((acc, curr) => acc + curr.duration, 0);

    res.status(200).json({
      completedPomodoros,
      totalFocusMinutes,
      sessions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
