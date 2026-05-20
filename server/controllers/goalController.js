const Goal = require('../models/Goal');
const bossService = require('../services/bossService');
const rpgService = require('../services/rpgService');

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId }).sort({ 'timeline.end': 1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const newGoal = new Goal({
      ...req.body,
      userId: req.user.userId,
    });

    // Initialize the Boss for this goal
    bossService.initializeGoalBoss(newGoal);

    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGoal) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const deletedGoal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!deletedGoal) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleMilestone = async (req, res) => {
  try {
    const userId = req.user.userId;
    const goal = await Goal.findOne({ _id: req.params.id, userId });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    const milestone = goal.milestones.id(req.params.milestoneId);
    if (!milestone) return res.status(404).json({ message: 'Milestone not found' });

    milestone.completed = !milestone.completed;
    milestone.completedAt = milestone.completed ? new Date() : null;

    let bossRewards = null;
    if (milestone.completed) {
      const bossResult = await bossService.damageBoss(goal, milestone._id);
      if (bossResult && bossResult.rewards) {
        bossRewards = bossResult.rewards;
      }
    } else {
      goal.boss.hp = Math.min(goal.boss.maxHP, goal.boss.hp + 100);
      goal.boss.isDefeated = false;
    }

    const allCompleted = goal.milestones.every(m => m.completed);
    if (allCompleted && goal.milestones.length > 0) {
      goal.status = 'completed';
      await rpgService.updateUserXP(userId, 300);
    } else {
      goal.status = 'active';
    }

    await goal.save();
    res.status(200).json({ goal, bossRewards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
