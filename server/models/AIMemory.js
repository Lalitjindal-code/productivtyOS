const mongoose = require('mongoose');

const memoryItemSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['pattern', 'insight', 'trigger', 'preference', 'goal'],
    required: true 
  },
  content: { type: String, required: true },
  confidence: { type: Number, default: 1, min: 0, max: 1 },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

const weeklyInsightSchema = new mongoose.Schema({
  weekOf: { type: Date, required: true },
  insights: [{
    title: { type: String },
    description: { type: String },
    type: { type: String, enum: ['positive', 'warning', 'tip', 'pattern'] },
    generatedAt: { type: Date, default: Date.now }
  }],
  generatedAt: { type: Date, default: Date.now }
});

const aiMemorySchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  memories: [memoryItemSchema],
  weeklyInsights: [weeklyInsightSchema],
  productivityDNA: {
    generatedAt: { type: Date },
    peakHours: [{
      hour: { type: Number },
      score: { type: Number }
    }],
    bestDay: { type: String },
    worstDay: { type: String },
    kryptonite: { type: String },
    sweetSpotDuration: { type: Number },
    formula: { type: String },
    narrative: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('AIMemory', aiMemorySchema);
