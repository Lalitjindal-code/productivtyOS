const gymService = require('../services/gymService');
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');
const User = require('../models/User');

exports.getExerciseLibrary = async (req, res) => {
  try {
    const exercises = await Exercise.find().sort({ name: 1 });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await gymService.getWorkouts(req.user.userId);
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logWorkout = async (req, res) => {
  try {
    const result = await gymService.completeWorkout(req.user.userId, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getExerciseProgress = async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.user.userId,
      'exercises.exerciseId': req.params.exerciseId,
    }).sort({ date: 1 });

    const progress = workouts.map(w => {
      const ex = w.exercises.find(e => e.exerciseId.toString() === req.params.exerciseId);
      return {
        date: w.date,
        maxWeight: Math.max(...ex.sets.map(s => s.weight)),
        volume: ex.sets.reduce((acc, s) => acc + (s.reps * s.weight), 0),
      };
    });

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGymPlan = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    res.status(200).json(user.settings.gymPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGymPlan = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.user.userId },
      { $set: { 'settings.gymPlan': req.body } },
      { new: true }
    );
    res.status(200).json(user.settings.gymPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
