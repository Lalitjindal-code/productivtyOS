const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  type: {
    type: String,
    enum: ['daily', 'ai_monthly_summary'],
    default: 'daily'
  },
  date: { type: Date, required: true }, // The date this entry is for (midnight UTC)
  mood: {
    score: { type: Number, min: 1, max: 5, required: true }, // 1=awful, 5=amazing
    emoji: { type: String }, // e.g. '😭','😕','😐','😊','🔥'
    label: { type: String }  // e.g. 'Awful','Meh','Neutral','Good','Amazing'
  },
  // Three required reflection fields
  achieved: { type: String, default: '' },     // What did I achieve today?
  struggled: { type: String, default: '' },    // What did I struggle with?
  intention: { type: String, default: '' },    // What's my intention for tomorrow?
  // Optional free text
  freeText: { type: String, default: '' },
  // Tags
  tags: [{ type: String }],
  // AI-generated monthly summary content (type: 'ai_monthly_summary')
  aiSummary: { type: String, default: '' },
}, {
  timestamps: true
});

// Ensure one entry per user per date (for type=daily)
journalSchema.index({ userId: 1, date: 1 });

module.exports = mongoose.model('Journal', journalSchema);
