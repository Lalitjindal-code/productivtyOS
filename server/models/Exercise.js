const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio'],
    required: true 
  },
  equipment: { type: String },
  instructions: { type: String },
  isCustom: { type: Boolean, default: false }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
