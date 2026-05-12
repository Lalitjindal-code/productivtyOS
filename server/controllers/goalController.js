const Goal = require('../models/Goal');

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
    
    // Check if all milestones are complete, auto-complete goal
    const allCompleted = goal.milestones.every(m => m.completed);
    if (allCompleted && goal.milestones.length > 0) {
      goal.status = 'completed';
      goal.xpEarned = 500; // Big bonus for goal completion
    } else {
      goal.status = 'active';
      goal.xpEarned = 0;
    }

    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
