const Workout = require('../models/Workout');
const User = require('../models/User');
const rpgService = require('./rpgService');

/**
 * Calculates total volume for a workout
 */
exports.calculateVolume = (workoutData) => {
  return workoutData.exercises.reduce((total, ex) => {
    const exVolume = ex.sets.reduce((setTotal, set) => {
      return setTotal + (set.reps * set.weight);
    }, 0);
    return total + exVolume;
  }, 0);
};

/**
 * Saves a workout and updates RPG stats
 */
exports.completeWorkout = async (userId, workoutData) => {
  const volume = this.calculateVolume(workoutData);
  
  // Create workout entry
  const workout = new Workout({
    ...workoutData,
    userId,
    totalVolume: volume,
    xpEarned: Math.floor(volume / 100) + 50 // Base 50 XP + volume bonus
  });

  await workout.save();

  // RPG Stat Gain: Gym workouts primarily increase Strength
  const user = await User.findOne({ userId });
  if (user) {
    // Award Strength based on intensity (simplified for MVP)
    user.rpgStats.strength += 1;
    await user.save();
    
    // Award XP
    await rpgService.updateUserXP(userId, workout.xpEarned);
  }

  return workout;
};

exports.getWorkouts = async (userId) => {
  return await Workout.find({ userId }).sort({ date: -1 });
};
