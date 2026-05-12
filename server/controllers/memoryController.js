const AIMemory = require('../models/AIMemory');
const Task = require('../models/Task');
const Goal = require('../models/Goal');
const User = require('../models/User');
const PomodoroSession = require('../models/PomodoroSession');
const aiService = require('../services/aiService');

const TEMP_USER_ID = 'user_mvp_1';

const getOrCreateMemory = async () => {
  let memory = await AIMemory.findOne({ userId: TEMP_USER_ID });
  if (!memory) memory = await AIMemory.create({ userId: TEMP_USER_ID });
  return memory;
};

// GET /api/memory — get full memory record (insights + notes)
exports.getMemory = async (req, res) => {
  try {
    const memory = await getOrCreateMemory();
    res.status(200).json(memory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/memory/insights/generate — Aggregate last 7 days and generate insights via AI
exports.generateInsights = async (req, res) => {
  try {
    const memory = await getOrCreateMemory();

    // Aggregate last 7 days
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const weekTasks = await Task.find({ userId: TEMP_USER_ID, createdAt: { $gte: weekStart } });
    const completedTasks = weekTasks.filter(t => t.status === 'completed');
    const failedTasks = weekTasks.filter(t => t.status === 'failed');

    const pomodorosCount = await PomodoroSession.countDocuments({
      userId: TEMP_USER_ID,
      type: 'work',
      completedAt: { $gte: weekStart }
    });

    const goals = await Goal.find({ userId: TEMP_USER_ID, status: 'active' });
    const user = await User.findOne({ userId: TEMP_USER_ID });

    const weeklyStats = {
      totalTasks: weekTasks.length,
      completed: completedTasks.length,
      failed: failedTasks.length,
      completionRate: weekTasks.length > 0 ? Math.round((completedTasks.length / weekTasks.length) * 100) : 0,
      pomodoros: pomodorosCount,
      streak: user?.streak?.current || 0,
      topCategory: Object.entries(
        completedTasks.reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + 1; return acc; }, {})
      ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'none'
    };

    const insights = await aiService.generateWeeklyInsights({
      weeklyStats,
      goals,
      patterns: { personalNotes: memory.personalNotes.map(n => n.content) }
    });

    if (insights.length > 0) {
      memory.weeklyInsights.unshift(...insights.map(i => ({ ...i, generatedAt: new Date() })));
      // Keep only last 20 insights
      if (memory.weeklyInsights.length > 20) memory.weeklyInsights = memory.weeklyInsights.slice(0, 20);
      memory.lastAggregatedAt = new Date();
      await memory.save();
    }

    res.status(200).json({ insights, memory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/memory/insights/:insightId/flag — Flag insight as wrong
exports.flagInsight = async (req, res) => {
  try {
    const memory = await getOrCreateMemory();
    const insight = memory.weeklyInsights.id(req.params.insightId);
    if (!insight) return res.status(404).json({ message: 'Insight not found' });
    insight.flaggedAsWrong = !insight.flaggedAsWrong;
    await memory.save();
    res.status(200).json(memory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/memory/notes — Add personal note to AI memory
exports.addNote = async (req, res) => {
  try {
    if (!req.body.content?.trim()) return res.status(400).json({ message: 'Content required' });
    const memory = await getOrCreateMemory();
    memory.personalNotes.push({ content: req.body.content.trim() });
    await memory.save();
    res.status(200).json(memory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/memory/notes/:noteId — Delete personal note
exports.deleteNote = async (req, res) => {
  try {
    const memory = await getOrCreateMemory();
    memory.personalNotes.pull({ _id: req.params.noteId });
    await memory.save();
    res.status(200).json(memory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/memory/chat — "Ask Your Brain" chat
exports.chat = async (req, res) => {
  try {
    const { messages } = req.body; // Array of {role, content}
    if (!messages?.length) return res.status(400).json({ message: 'Messages required' });

    const memory = await getOrCreateMemory();
    const user = await User.findOne({ userId: TEMP_USER_ID });
    const goals = await Goal.find({ userId: TEMP_USER_ID, status: 'active' });

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const weekCompleted = await Task.countDocuments({
      userId: TEMP_USER_ID,
      status: 'completed',
      completedAt: { $gte: weekStart }
    });
    const pomodorosToday = await PomodoroSession.countDocuments({
      userId: TEMP_USER_ID,
      type: 'work',
      completedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });

    const reply = await aiService.chat({
      messages,
      userContext: {
        streak: user?.streak?.current || 0,
        goals,
        weekCompletion: { completed: weekCompleted },
        pomodorosToday,
        personalNotes: memory.personalNotes.map(n => n.content)
      }
    });

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
