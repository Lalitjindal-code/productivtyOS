const Journal = require('../models/Journal');
const aiService = require('../services/aiService');

const TEMP_USER_ID = 'user_mvp_1';

const MOOD_MAP = {
  1: { emoji: '😭', label: 'Awful' },
  2: { emoji: '😕', label: 'Meh' },
  3: { emoji: '😐', label: 'Neutral' },
  4: { emoji: '😊', label: 'Good' },
  5: { emoji: '🔥', label: 'Amazing' },
};

// Normalise a JS Date to midnight UTC for a given local date string (YYYY-MM-DD)
const toMidnightUTC = (dateStr) => {
  const d = new Date(dateStr);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

// GET /api/journal — list entries, newest first (paginated)
exports.getEntries = async (req, res) => {
  try {
    const { page = 1, limit = 20, mood, tag, search, type = 'daily' } = req.query;
    const query = { userId: TEMP_USER_ID, type };
    if (mood) query['mood.score'] = Number(mood);
    if (tag) query.tags = tag;
    if (search) {
      query.$or = [
        { achieved: { $regex: search, $options: 'i' } },
        { struggled: { $regex: search, $options: 'i' } },
        { intention: { $regex: search, $options: 'i' } },
        { freeText: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Journal.countDocuments(query);
    const entries = await Journal.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json({ entries, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/journal/today — get today's entry if exists
exports.getTodayEntry = async (req, res) => {
  try {
    const today = toMidnightUTC(new Date().toISOString().split('T')[0]);
    const entry = await Journal.findOne({ userId: TEMP_USER_ID, date: today, type: 'daily' });
    return res.json({ entry });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET /api/journal/on-this-day — memories from 1yr, 6m, 3m ago
exports.getOnThisDay = async (req, res) => {
  try {
    const now = new Date();
    const periods = [
      { label: '1 year ago', months: 12 },
      { label: '6 months ago', months: 6 },
      { label: '3 months ago', months: 3 },
    ];

    const memories = await Promise.all(
      periods.map(async ({ label, months }) => {
        const past = new Date(now);
        past.setMonth(past.getMonth() - months);
        const dateStr = past.toISOString().split('T')[0];
        const d = toMidnightUTC(dateStr);
        const entry = await Journal.findOne({ userId: TEMP_USER_ID, date: d, type: 'daily' });
        return entry ? { label, entry } : null;
      }),
    );

    return res.json({ memories: memories.filter(Boolean) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/journal — create or update today's entry (upsert by date)
exports.upsertEntry = async (req, res) => {
  try {
    const { date, mood, achieved, struggled, intention, freeText, tags } = req.body;
    if (!date || !mood?.score) {
      return res.status(400).json({ message: 'date and mood.score are required' });
    }

    const moodScore = Number(mood.score);
    const moodData = {
      score: moodScore,
      emoji: MOOD_MAP[moodScore]?.emoji || '😐',
      label: MOOD_MAP[moodScore]?.label || 'Neutral',
    };

    const entryDate = toMidnightUTC(date);

    const entry = await Journal.findOneAndUpdate(
      { userId: TEMP_USER_ID, date: entryDate, type: 'daily' },
      { $set: { mood: moodData, achieved, struggled, intention, freeText, tags: tags || [] } },
      { new: true, upsert: true, runValidators: true },
    );

    // Award XP for journaling (10 XP per entry)
    const rpgResult = await require('../services/rpgService').updateUserXP(TEMP_USER_ID, 10);

    return res.status(200).json({ 
      entry, 
      xpGained: 10,
      leveledUp: rpgResult?.leveledUp || false 
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// DELETE /api/journal/:id — delete an entry
exports.deleteEntry = async (req, res) => {
  try {
    await Journal.findOneAndDelete({ _id: req.params.id, userId: TEMP_USER_ID });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST /api/journal/summary/generate — AI monthly summary for previous month
exports.generateMonthlySummary = async (req, res) => {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    const entries = await Journal.find({
      userId: TEMP_USER_ID,
      type: 'daily',
      date: { $gte: monthStart, $lte: monthEnd },
    });

    if (entries.length === 0) {
      return res.status(400).json({ message: 'No entries for previous month' });
    }

    const avgMood = (entries.reduce((sum, entry) => sum + entry.mood.score, 0) / entries.length).toFixed(1);

    const aiResult = await aiService.generateJournalSummary(entries);
    const summaryParts = [
      aiResult?.summary || '',
      aiResult?.biggestWin ? `Biggest win: ${aiResult.biggestWin}` : '',
      aiResult?.biggestStruggle ? `Biggest struggle: ${aiResult.biggestStruggle}` : '',
      aiResult?.recurringTheme ? `Recurring theme: ${aiResult.recurringTheme}` : '',
      aiResult?.letterToSelf || '',
    ].filter(Boolean);

    const summary = summaryParts.length
      ? summaryParts.join('\n\n')
      : 'AI summary abhi generate nahi ho paaya — thoda baad mein try karo.';

    const avgMoodRounded = Math.max(1, Math.min(5, Math.round(Number(avgMood))));

    // Save as ai_monthly_summary type
    const summaryEntry = await Journal.findOneAndUpdate(
      {
        userId: TEMP_USER_ID,
        type: 'ai_monthly_summary',
        date: monthStart,
      },
      { $set: { aiSummary: summary, mood: { score: avgMoodRounded, ...MOOD_MAP[avgMoodRounded] } } },
      { new: true, upsert: true },
    );

    return res.json({ summary: summaryEntry });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

