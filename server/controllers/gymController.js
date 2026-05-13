const gymService = require('../services/gymService');
const Exercise = require('../models/Exercise');

const TEMP_USER_ID = 'user_mvp_1';

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
    const workouts = await gymService.getWorkouts(TEMP_USER_ID);
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logWorkout = async (req, res) => {
  try {
    const workout = await gymService.completeWorkout(TEMP_USER_ID, req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
