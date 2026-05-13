const Goal = require('../models/Goal');
const bossService = require('../services/bossService');
const rpgService = require('../services/rpgService');


const TEMP_USER_ID = 'user_mvp_1'; // Consistent with Task MVP

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: TEMP_USER_ID }).sort({ 'timeline.end': 1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const newGoal = new Goal({
      ...req.body,
      userId: TEMP_USER_ID
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
      { _id: req.params.id, userId: TEMP_USER_ID },
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
    const deletedGoal = await Goal.findOneAndDelete({ _id: req.params.id, userId: TEMP_USER_ID });
    if (!deletedGoal) return res.status(404).json({ message: 'Goal not found' });
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Milestone specific endpoints
exports.toggleMilestone = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: TEMP_USER_ID });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    const milestone = goal.milestones.id(req.params.milestoneId);
    if (!milestone) return res.status(404).json({ message: 'Milestone not found' });

    milestone.completed = !milestone.completed;
    milestone.completedAt = milestone.completed ? new Date() : null;
    
    // Boss Battle Logic: Damage boss if milestone is completed
    let bossRewards = null;
    if (milestone.completed) {
      const bossResult = await bossService.damageBoss(goal, milestone._id);
      if (bossResult && bossResult.rewards) {
        bossRewards = bossResult.rewards;
      }
    } else {
      // Heal boss if milestone is uncompleted
      goal.boss.hp = Math.min(goal.boss.maxHP, goal.boss.hp + 100);
      goal.boss.isDefeated = false;
    }

    // Check if all milestones are complete, auto-complete goal
    const allCompleted = goal.milestones.every(m => m.completed);
    if (allCompleted && goal.milestones.length > 0) {
      goal.status = 'completed';
      // Goal completion gives extra XP
      await rpgService.updateUserXP(TEMP_USER_ID, 300);
    } else {
      goal.status = 'active';
    }

    await goal.save();
    res.status(200).json({ goal, bossRewards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
