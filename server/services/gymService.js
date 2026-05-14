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
 * Saves a workout, updates RPG stats, and checks for PRs
 */
exports.completeWorkout = async (userId, workoutData) => {
  const volume = this.calculateVolume(workoutData);
  
  // PR Detection
  const prsFound = [];
  for (const ex of workoutData.exercises) {
    const maxWeight = Math.max(...ex.sets.map(s => s.weight));
    
    // Find previous best for this exercise
    const previousBest = await Workout.findOne({ 
      userId, 
      'exercises.exerciseId': ex.exerciseId 
    })
    .sort({ 'exercises.sets.weight': -1 })
    .select('exercises.$');

    if (!previousBest) {
      prsFound.push({ name: ex.name, type: 'Initial PR' });
    } else {
      const prevMax = Math.max(...previousBest.exercises[0].sets.map(s => s.weight));
      if (maxWeight > prevMax) {
        prsFound.push({ name: ex.name, type: 'New Max Weight', value: maxWeight });
      }
    }
  }

  // Create workout entry
  const workout = new Workout({
    ...workoutData,
    userId,
    totalVolume: volume,
    xpEarned: Math.floor(volume / 100) + 50 + (prsFound.length * 20), // PR bonus
    prsDetected: prsFound.map(pr => ({
      name: pr.type,
      exerciseName: pr.name,
      value: pr.value || 0,
      type: pr.type.includes('Weight') ? 'weight' : 'reps'
    }))
  });

  await workout.save();

  // RPG Stat Gain
  const user = await User.findOne({ userId });
  if (user) {
    user.rpgStats.strength += 1 + Math.floor(prsFound.length / 2);
    await user.save();
    await rpgService.updateUserXP(userId, workout.xpEarned);
  }

  return { workout, prsFound };
};

exports.getWorkouts = async (userId) => {
  return await Workout.find({ userId }).sort({ date: -1 });
};
