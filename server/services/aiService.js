const { callAI } = require('../config/ai');
const prompts = require('../prompts');

const FALLBACK_QUIZ = {
  questions: [{ id: 1, question: 'Kya task poora hua?', type: 'reflection' }],
};

const FALLBACK_ROAST = {
  roast: 'Kal zaroor karna!',
  emoji: '💪',
  title: 'Miss Ho Gaya',
};

const FALLBACK_WEEKLY_INSIGHT = {
  insights: [],
  weekSummary: 'Data kam hai',
  topRecommendation: 'Kal ek task zaroor complete karo',
};

const FALLBACK_DNA = {
  formula: '',
  narrative: '30+ din ke data ke baad DNA ready hoga',
  peakHours: [],
  bestDay: '',
  worstDay: '',
  kryptonite: '',
  sweetSpotDuration: 0,
};

const FALLBACK_JOURNAL = {
  summary: 'Journal entries kam hain',
  moodTrend: '',
  biggestWin: '',
  biggestStruggle: '',
  recurringTheme: '',
  letterToSelf: 'Likhte raho — yeh safar tumhara hai.',
};

const FALLBACK_CHAT = {
  reply: 'Abhi kuch technical dikkat hai — thodi der mein try karo.',
};

const FALLBACK_SCHEDULE = {
  scheduledTasks: [],
  tip: 'Sabse important task pehle karo.',
};

const safeParseJSON = (text) => {
  if (typeof text !== 'string' || !text.trim()) {
    return null;
  }

  try {
    const cleaned = text.replace(/```json|```|`json/gi, '').trim();
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    const arrayStart = cleaned.indexOf('[');
    const arrayEnd = cleaned.lastIndexOf(']');

    const payload = jsonStart !== -1 && jsonEnd !== -1
      ? cleaned.slice(jsonStart, jsonEnd + 1)
      : arrayStart !== -1 && arrayEnd !== -1
        ? cleaned.slice(arrayStart, arrayEnd + 1)
        : cleaned;

    return JSON.parse(payload);
  } catch (error) {
    console.error('[AI Service] JSON parse failed:', error.message);
    return null;
  }
};

const normalizeQuestions = (questions) => {
  if (!Array.isArray(questions) || !questions.length) {
    return FALLBACK_QUIZ.questions;
  }

  return questions.slice(0, 3).map((question, index) => ({
    id: Number.isFinite(question?.id) ? question.id : index + 1,
    question: typeof question?.question === 'string' ? question.question : FALLBACK_QUIZ.questions[0].question,
    type: ['text', 'reflection', 'action'].includes(question?.type) ? question.type : 'reflection',
  }));
};

const normalizeInsights = (insights) => {
  if (!Array.isArray(insights)) {
    return [];
  }

  return insights.slice(0, 4).map((insight) => ({
    title: typeof insight?.title === 'string' ? insight.title : 'Insight',
    description: typeof insight?.description === 'string' ? insight.description : '',
    type: ['positive', 'warning', 'tip'].includes(insight?.type) ? insight.type : 'tip',
  }));
};

const normalizeDNA = (dna) => ({
  formula: typeof dna?.formula === 'string' ? dna.formula : FALLBACK_DNA.formula,
  narrative: typeof dna?.narrative === 'string' ? dna.narrative : FALLBACK_DNA.narrative,
  peakHours: Array.isArray(dna?.peakHours) ? dna.peakHours : FALLBACK_DNA.peakHours,
  bestDay: typeof dna?.bestDay === 'string' ? dna.bestDay : FALLBACK_DNA.bestDay,
  worstDay: typeof dna?.worstDay === 'string' ? dna.worstDay : FALLBACK_DNA.worstDay,
  kryptonite: typeof dna?.kryptonite === 'string' ? dna.kryptonite : FALLBACK_DNA.kryptonite,
  sweetSpotDuration: Number.isFinite(dna?.sweetSpotDuration) ? dna.sweetSpotDuration : FALLBACK_DNA.sweetSpotDuration,
});

const normalizeJournal = (summary) => ({
  summary: typeof summary?.summary === 'string' ? summary.summary : FALLBACK_JOURNAL.summary,
  moodTrend: typeof summary?.moodTrend === 'string' ? summary.moodTrend : FALLBACK_JOURNAL.moodTrend,
  biggestWin: typeof summary?.biggestWin === 'string' ? summary.biggestWin : FALLBACK_JOURNAL.biggestWin,
  biggestStruggle: typeof summary?.biggestStruggle === 'string' ? summary.biggestStruggle : FALLBACK_JOURNAL.biggestStruggle,
  recurringTheme: typeof summary?.recurringTheme === 'string' ? summary.recurringTheme : FALLBACK_JOURNAL.recurringTheme,
  letterToSelf: typeof summary?.letterToSelf === 'string' ? summary.letterToSelf : FALLBACK_JOURNAL.letterToSelf,
});

/**
 * Generates task-specific quiz questions.
 * @param {Object} task
 * @param {Array} [userHistory=[]]
 * @returns {Promise<{questions: Array<{id: number, question: string, type: string}>}>}
 */
const generateTaskQuiz = async (task, userHistory = []) => {
  if (!task?.title || !task?.category) {
    return FALLBACK_QUIZ;
  }

  const prompt = [
    `Task title: ${task.title}`,
    `Task category: ${task.category}`,
    `Task description: ${task.description || 'N/A'}`,
    `Recent user history: ${JSON.stringify(Array.isArray(userHistory) ? userHistory.slice(-5) : [])}`,
    `Category behavior: ${task.category === 'work' ? 'outcome + next step questions' : task.category === 'study' ? 'explain concept + application' : task.category === 'gym' ? 'session feel + any PRs' : task.category === 'creative' ? 'what was created + improvements' : 'forward progress + lesson learned'}`,
  ].join('\n');

  try {
    const response = await callAI(prompt, prompts.PROMPT_TASK_QUIZ, { jsonMode: true });
    const parsed = safeParseJSON(response.text);
    return {
      questions: normalizeQuestions(parsed?.questions),
    };
  } catch (error) {
    console.error('[AI Service] generateTaskQuiz failed:', error.message);
    return FALLBACK_QUIZ;
  }
};

/**
 * Generates a Hinglish roast for a missed task.
 * @param {Object} task
 * @param {number} missedCount
 * @param {'soft'|'hard'|'brutal'} [mode='soft']
 * @param {Array} [recentFailures=[]]
 * @returns {Promise<{roast: string, emoji: string, title: string}>}
 */
const generateRoast = async (task, missedCount, mode = 'soft', recentFailures = []) => {
  if (!task?.title || !Number.isFinite(Number(missedCount))) {
    return FALLBACK_ROAST;
  }

  const safeMode = ['soft', 'hard', 'brutal'].includes(mode) ? mode : 'soft';
  const prompt = [
    `Task title: ${task.title}`,
    `Missed count: ${missedCount}`,
    `Mode: ${safeMode}`,
    `Recent failures: ${JSON.stringify(Array.isArray(recentFailures) ? recentFailures.slice(-5) : [])}`,
  ].join('\n');

  try {
    const response = await callAI(prompt, prompts.PROMPT_ROAST, { jsonMode: true });
    const parsed = safeParseJSON(response.text);
    if (!parsed?.roast || !parsed?.emoji || !parsed?.title) {
      return FALLBACK_ROAST;
    }

    return {
      roast: parsed.roast,
      emoji: parsed.emoji,
      title: parsed.title,
    };
  } catch (error) {
    console.error('[AI Service] generateRoast failed:', error.message);
    return FALLBACK_ROAST;
  }
};

/**
 * Generates weekly memory insights from structured week data.
 * @param {Object} weekData
 * @returns {Promise<{insights: Array, weekSummary: string, topRecommendation: string}>}
 */
const generateWeeklyMemoryInsight = async (weekData) => {
  if (!weekData || typeof weekData !== 'object') {
    return FALLBACK_WEEKLY_INSIGHT;
  }

  try {
    const response = await callAI(JSON.stringify(weekData), prompts.PROMPT_WEEKLY_INSIGHT, { jsonMode: true });
    const parsed = safeParseJSON(response.text);
    return {
      insights: normalizeInsights(parsed?.insights),
      weekSummary: typeof parsed?.weekSummary === 'string' ? parsed.weekSummary : FALLBACK_WEEKLY_INSIGHT.weekSummary,
      topRecommendation: typeof parsed?.topRecommendation === 'string' ? parsed.topRecommendation : FALLBACK_WEEKLY_INSIGHT.topRecommendation,
    };
  } catch (error) {
    console.error('[AI Service] generateWeeklyMemoryInsight failed:', error.message);
    return FALLBACK_WEEKLY_INSIGHT;
  }
};

/**
 * Generates a personalized productivity DNA report.
 * @param {Object} ninetyDayData
 * @returns {Promise<{formula: string, narrative: string, peakHours: Array, bestDay: string, worstDay: string, kryptonite: string, sweetSpotDuration: number}>}
 */
const generateDNAReport = async (ninetyDayData) => {
  if (!ninetyDayData || typeof ninetyDayData !== 'object') {
    return FALLBACK_DNA;
  }

  try {
    const response = await callAI(JSON.stringify(ninetyDayData), prompts.PROMPT_DNA_REPORT, { jsonMode: true });
    const parsed = safeParseJSON(response.text);
    return normalizeDNA(parsed);
  } catch (error) {
    console.error('[AI Service] generateDNAReport failed:', error.message);
    return FALLBACK_DNA;
  }
};

/**
 * Generates a warm journal summary and letter to self.
 * @param {Array} entries
 * @returns {Promise<{summary: string, moodTrend: string, biggestWin: string, biggestStruggle: string, recurringTheme: string, letterToSelf: string}>}
 */
const generateJournalSummary = async (entries) => {
  if (!Array.isArray(entries)) {
    return FALLBACK_JOURNAL;
  }

  try {
    const response = await callAI(JSON.stringify(entries.slice(-30)), prompts.PROMPT_JOURNAL_SUMMARY, { jsonMode: true });
    const parsed = safeParseJSON(response.text);
    return normalizeJournal(parsed);
  } catch (error) {
    console.error('[AI Service] generateJournalSummary failed:', error.message);
    return FALLBACK_JOURNAL;
  }
};

/**
 * Chats with the user's AI brain.
 * @param {string} message
 * @param {Array} conversationHistory
 * @param {Object} userContext
 * @returns {Promise<{reply: string}>}
 */
const chatWithBrain = async (message, conversationHistory, userContext) => {
  if (typeof message !== 'string' || !message.trim() || !userContext || typeof userContext !== 'object') {
    return FALLBACK_CHAT;
  }

  const history = Array.isArray(conversationHistory) ? conversationHistory.slice(-10) : [];
  const systemPrompt = prompts.PROMPT_CHAT_BRAIN(userContext);
  const prompt = [
    `Conversation history: ${JSON.stringify(history)}`,
    `User message: ${message}`,
  ].join('\n');

  try {
    const response = await callAI(prompt, systemPrompt, { maxTokens: 500 });
    return {
      reply: typeof response.text === 'string' && response.text.trim() ? response.text.trim() : FALLBACK_CHAT.reply,
    };
  } catch (error) {
    console.error('[AI Service] chatWithBrain failed:', error.message);
    return FALLBACK_CHAT;
  }
};

/**
 * Suggests a schedule for tasks using productivity DNA data.
 * @param {Array} tasks
 * @param {Object} dnaData
 * @param {Date|string|number} currentTime
 * @returns {Promise<{scheduledTasks: Array, tip: string}>}
 */
const suggestTaskSchedule = async (tasks, dnaData, currentTime) => {
  if (!Array.isArray(tasks) || !tasks.length || !dnaData || typeof dnaData !== 'object') {
    return FALLBACK_SCHEDULE;
  }

  const prompt = [
    `Tasks: ${JSON.stringify(tasks)}`,
    `DNA data: ${JSON.stringify(dnaData)}`,
    `Current time: ${new Date(currentTime).toISOString()}`,
  ].join('\n');

  try {
    const response = await callAI(prompt, prompts.PROMPT_SCHEDULE_SUGGEST, { jsonMode: true });
    const parsed = safeParseJSON(response.text);
    const scheduledTasks = Array.isArray(parsed?.scheduledTasks)
      ? parsed.scheduledTasks.map((item) => ({
        taskId: typeof item?.taskId === 'string' ? item.taskId : String(item?.taskId || ''),
        suggestedTime: typeof item?.suggestedTime === 'string' ? item.suggestedTime : '',
        reason: typeof item?.reason === 'string' ? item.reason : '',
      })).filter((item) => item.taskId)
      : [];

    return {
      scheduledTasks,
      tip: typeof parsed?.tip === 'string' ? parsed.tip : FALLBACK_SCHEDULE.tip,
    };
  } catch (error) {
    console.error('[AI Service] suggestTaskSchedule failed:', error.message);
    return FALLBACK_SCHEDULE;
  }
};

module.exports = {
  generateTaskQuiz,
  generateRoast,
  generateWeeklyMemoryInsight,
  generateDNAReport,
  generateJournalSummary,
  chatWithBrain,
  suggestTaskSchedule,
};
