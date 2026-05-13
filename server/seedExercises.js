const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');
require('dotenv').config();

const exercises = [
  // Chest
  { name: 'Bench Press (Barbell)', category: 'Chest', equipment: 'Barbell' },
  { name: 'Incline Bench Press (Barbell)', category: 'Chest', equipment: 'Barbell' },
  { name: 'Dumbbell Flys', category: 'Chest', equipment: 'Dumbbells' },
  { name: 'Push Ups', category: 'Chest', equipment: 'Bodyweight' },
  { name: 'Cable Crossover', category: 'Chest', equipment: 'Cable' },
  
  // Back
  { name: 'Deadlift (Barbell)', category: 'Back', equipment: 'Barbell' },
  { name: 'Pull Ups', category: 'Back', equipment: 'Bodyweight' },
  { name: 'Lat Pulldown', category: 'Back', equipment: 'Machine' },
  { name: 'Bent Over Row (Barbell)', category: 'Back', equipment: 'Barbell' },
  { name: 'Seated Cable Row', category: 'Back', equipment: 'Cable' },

  // Shoulders
  { name: 'Overhead Press (Barbell)', category: 'Shoulders', equipment: 'Barbell' },
  { name: 'Lateral Raise (Dumbbell)', category: 'Shoulders', equipment: 'Dumbbells' },
  { name: 'Front Raise (Dumbbell)', category: 'Shoulders', equipment: 'Dumbbells' },
  { name: 'Face Pulls', category: 'Shoulders', equipment: 'Cable' },

  // Legs
  { name: 'Squat (Barbell)', category: 'Legs', equipment: 'Barbell' },
  { name: 'Leg Press', category: 'Legs', equipment: 'Machine' },
  { name: 'Lunge (Dumbbell)', category: 'Legs', equipment: 'Dumbbells' },
  { name: 'Leg Extension', category: 'Legs', equipment: 'Machine' },
  { name: 'Leg Curl', category: 'Legs', equipment: 'Machine' },
  { name: 'Calf Raise (Standing)', category: 'Legs', equipment: 'Machine' },

  // Arms
  { name: 'Bicep Curl (Barbell)', category: 'Arms', equipment: 'Barbell' },
  { name: 'Hammer Curl (Dumbbell)', category: 'Arms', equipment: 'Dumbbells' },
  { name: 'Tricep Pushdown', category: 'Arms', equipment: 'Cable' },
  { name: 'Skull Crushers', category: 'Arms', equipment: 'Barbell' },
  { name: 'Dips', category: 'Arms', equipment: 'Bodyweight' },

  // Core
  { name: 'Plank', category: 'Core', equipment: 'Bodyweight' },
  { name: 'Crunches', category: 'Core', equipment: 'Bodyweight' },
  { name: 'Leg Raise (Hanging)', category: 'Core', equipment: 'Bodyweight' },
  { name: 'Russian Twist', category: 'Core', equipment: 'Dumbbells' }
];

const seedExercises = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TESTT');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing exercises
    await Exercise.deleteMany({ isCustom: false });
    
    // Insert new exercises
    await Exercise.insertMany(exercises);
    console.log(`Successfully seeded ${exercises.length} exercises!`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedExercises();
