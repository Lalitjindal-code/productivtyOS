const Task = require('../models/Task');
const { touchStreak } = require('./userController');
const rpgService = require('../services/rpgService');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
      ...req.body,
      userId: req.user.userId,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.completeTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const task = await Task.findOne({ _id: req.params.id, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = 'completed';
    task.completedAt = new Date();

    // RPG XP Calculation
    const xpGain = rpgService.calculateXPGain(task);
    task.xpEarned = xpGain;

    // Redeem from Wall of Shame if this was a penalty task
    if (task.penaltyTaskFor) {
      const originalTask = await Task.findById(task.penaltyTaskFor);
      if (originalTask) {
        originalTask.wallOfShame = false;
        await originalTask.save();
      }
    }

    await task.save();

    // Update User XP and Level
    const { user, leveledUp } = await rpgService.updateUserXP(userId, xpGain);

    // Check achievements
    const newAchievements = await rpgService.checkAchievements(userId, { task });

    // Touch streak on every task completion
    touchStreak(userId).catch(console.error);

    res.status(200).json({
      task,
      rpgUpdate: {
        xpGain,
        leveledUp,
        currentLevel: user.rpgStats.level,
        newAchievements,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.failTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const task = await Task.findOne({ _id: req.params.id, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = 'failed';
    task.failedAt = new Date();
    task.wallOfShame = true;

    await task.save();

    // HP Loss on failure
    const user = await rpgService.updateUserHP(userId, 10);

    res.status(200).json({
      task,
      rpgUpdate: {
        hpRemaining: user.rpgStats.hp,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSubtask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (!req.body.title) return res.status(400).json({ message: 'Subtask title is required' });

    task.subtasks.push({ title: req.body.title, completed: false });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleSubtask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) return res.status(404).json({ message: 'Subtask not found' });

    subtask.completed = !subtask.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSubtask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.subtasks.pull({ _id: req.params.subtaskId });
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
