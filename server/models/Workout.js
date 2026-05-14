const mongoose = require('mongoose');

const workoutSetSchema = new mongoose.Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  completed: { type: Boolean, default: true }
});

const workoutExerciseSchema = new mongoose.Schema({
  exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  name: { type: String }, // Denormalized for convenience
  sets: [workoutSetSchema]
});

const workoutSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  name: { type: String, default: () => `Workout on ${new Date().toLocaleDateString()}` },
  date: { type: Date, default: Date.now },
  duration: { type: Number }, // in minutes
  exercises: [workoutExerciseSchema],
  totalVolume: { type: Number, default: 0 },
  notes: { type: String },
  xpEarned: { type: Number, default: 0 },
  prsDetected: [{ 
    name: String, 
    type: { type: String }, // 'weight' or 'reps'
    value: Number,
    exerciseName: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
