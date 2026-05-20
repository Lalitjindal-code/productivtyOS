const Task = require('../models/Task');
const User = require('../models/User');
const aiService = require('../services/aiService');

exports.generateRoast = async (req, res) => {
  try {
    const userId = req.user.userId;
    const task = await Task.findOne({ _id: req.params.taskId, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const user = await User.findOne({ userId });
    const rageMode = user?.settings?.rageMode || 'hard';

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);
    const failuresThisWeek = await Task.countDocuments({
      userId,
      status: 'failed',
      failedAt: { $gte: weekStart },
    });

    const roastData = await aiService.generateRoast(task, failuresThisWeek, rageMode, []);
    const roast = roastData.roast;

    task.aiRoast = roast;
    await task.save();

    res.status(200).json({ roast, rageMode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWallOfShame = async (req, res) => {
  try {
    const failedTasks = await Task.find({
      userId: req.user.userId,
      wallOfShame: true,
    }).sort({ failedAt: -1 });

    const categoryCount = {};
    failedTasks.forEach(t => {
      categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    });

    res.status(200).json({ tasks: failedTasks, categoryCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPenaltyTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const originalTask = await Task.findOne({ _id: req.params.taskId, userId });
    if (!originalTask) return res.status(404).json({ message: 'Task not found' });

    const penaltyTask = new Task({
      userId,
      title: `⚡ PENALTY: Redo "${originalTask.title}"`,
      description: `This is a penalty task. Complete it to redeem yourself and remove the original from the Wall of Shame.`,
      category: originalTask.category,
      priority: 'critical',
      penaltyTaskFor: originalTask._id,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await penaltyTask.save();
    res.status(201).json(penaltyTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.generateShameReport = async (req, res) => {
  try {
    const userId = req.user.userId;
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const failedTasks = await Task.find({
      userId,
      status: 'failed',
      failedAt: { $gte: weekStart },
    });

    const completedCount = await Task.countDocuments({
      userId,
      status: 'completed',
      completedAt: { $gte: weekStart },
    });

    const user = await User.findOne({ userId });

    const reportData = await aiService.generateShameReport(failedTasks, completedCount, user?.streak?.current || 0);
    const report = reportData.report;

    res.status(200).json({ report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
