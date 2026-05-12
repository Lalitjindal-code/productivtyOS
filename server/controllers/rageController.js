const Task = require('../models/Task');
const User = require('../models/User');
const aiService = require('../services/aiService');

const TEMP_USER_ID = 'user_mvp_1';

// POST /api/rage/roast/:taskId — Generate roast after task failure
exports.generateRoast = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId, userId: TEMP_USER_ID });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const user = await User.findOne({ userId: TEMP_USER_ID });
    const rageMode = user?.settings?.rageMode || 'hard';

    // Count failures this week
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);
    const failuresThisWeek = await Task.countDocuments({
      userId: TEMP_USER_ID,
      status: 'failed',
      failedAt: { $gte: weekStart }
    });

    const roast = await aiService.generateRoast({
      taskTitle: task.title,
      taskCategory: task.category,
      rageMode,
      failuresThisWeek
    });

    // Save roast to task
    task.aiRoast = roast;
    await task.save();

    res.status(200).json({ roast, rageMode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/rage/wall — Get all Wall of Shame tasks
exports.getWallOfShame = async (req, res) => {
  try {
    const failedTasks = await Task.find({
      userId: TEMP_USER_ID,
      wallOfShame: true
    }).sort({ failedAt: -1 });

    // Group by category for sorting
    const categoryCount = {};
    failedTasks.forEach(t => {
      categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    });

    res.status(200).json({ tasks: failedTasks, categoryCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/rage/penalty/:taskId — Create penalty task for a Wall of Shame item
exports.createPenaltyTask = async (req, res) => {
  try {
    const originalTask = await Task.findOne({ _id: req.params.taskId, userId: TEMP_USER_ID });
    if (!originalTask) return res.status(404).json({ message: 'Task not found' });

    const penaltyTask = new Task({
      userId: TEMP_USER_ID,
      title: `⚡ PENALTY: Redo "${originalTask.title}"`,
      description: `This is a penalty task. Complete it to redeem yourself and remove the original from the Wall of Shame.`,
      category: originalTask.category,
      priority: 'critical',
      penaltyTaskFor: originalTask._id,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    });

    await penaltyTask.save();
    res.status(201).json(penaltyTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// POST /api/rage/shame-report — Generate weekly shame report
exports.generateShameReport = async (req, res) => {
  try {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const failedTasks = await Task.find({
      userId: TEMP_USER_ID,
      status: 'failed',
      failedAt: { $gte: weekStart }
    });

    const completedCount = await Task.countDocuments({
      userId: TEMP_USER_ID,
      status: 'completed',
      completedAt: { $gte: weekStart }
    });

    const user = await User.findOne({ userId: TEMP_USER_ID });

    const report = await aiService.generateShameReport({
      failedTasks,
      totalCompleted: completedCount,
      streak: user?.streak?.current || 0
    });

    res.status(200).json({ report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
