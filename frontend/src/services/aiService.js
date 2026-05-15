import axios from 'axios';

const API_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || '/api';

const aiClient = axios.create({
  baseURL: `${API_URL}/ai`,
  headers: {
    'Content-Type': 'application/json',
  },
});

aiClient.interceptors.request.use((config) => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const isBrowser = typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
const CACHE_PREFIX = 'ai_cache_';
const CACHE_TTLS = {
  weeklyInsight: 60 * 60 * 1000,
  dnaReport: 6 * 60 * 60 * 1000,
  journalSummary: 3 * 60 * 60 * 1000,
};

const getCache = (key) => {
  if (!isBrowser) {
    return null;
  }

  try {
    const cached = sessionStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached);
    if (Date.now() > parsed.expiry) {
      sessionStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }

    return parsed.data;
  } catch (error) {
    return null;
  }
};

const setCache = (key, data, ttlMs) => {
  if (!isBrowser) {
    return;
  }

  sessionStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify({
    data,
    expiry: Date.now() + ttlMs,
  }));
};

const delay = async (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const isNetworkError = (error) => !error.response || error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK';

const normalizeError = (error) => {
  if (error?.response?.data?.error?.code === 'AI_RATE_LIMIT') {
    const resetIn = error.response.data.error.resetIn || 0;
    const minutes = Math.max(1, Math.ceil(resetIn / 60));
    return {
      message: `Aaj ki AI limit khatam ho gayi hai. ${minutes} minute baad phir try karna.`,
      code: 'AI_RATE_LIMIT',
      resetIn,
    };
  }

  if (isNetworkError(error)) {
    return {
      message: 'Network side pe thoda issue hai. Ek baar phir se try karte hain.',
      code: 'NETWORK_ERROR',
    };
  }

  return {
    message: error?.response?.data?.error?.message || 'AI ke saath thodi dikkat ho gayi. Thoda baad mein try karo.',
    code: error?.response?.data?.error?.code || 'AI_ERROR',
  };
};

const requestWithRetry = async (requestFn) => {
  try {
    return await requestFn();
  } catch (error) {
    if (isNetworkError(error)) {
      await delay(300);
      return await requestFn();
    }

    throw error;
  }
};

const buildSuccess = (data) => ({
  data,
  loading: false,
  error: null,
});

const buildFailure = (error) => ({
  data: null,
  loading: false,
  error: normalizeError(error),
});

export const aiService = {
  async getTaskQuiz(taskId) {
    if (!taskId) {
      return buildFailure(new Error('Task ID required hai.'));
    }

    try {
      const response = await requestWithRetry(() => aiClient.post('/quiz', { taskId }));
      return buildSuccess(response.data.data);
    } catch (error) {
      return buildFailure(error);
    }
  },

  async getRoast(taskId, missedCount, mode = 'soft') {
    if (!taskId) {
      return buildFailure(new Error('Task ID required hai.'));
    }

    try {
      const response = await requestWithRetry(() => aiClient.post('/roast', { taskId, missedCount, mode }));
      return buildSuccess(response.data.data);
    } catch (error) {
      return buildFailure(error);
    }
  },

  async getWeeklyInsight() {
    const cached = getCache('weeklyInsight');
    if (cached) {
      return buildSuccess(cached);
    }

    try {
      const response = await requestWithRetry(() => aiClient.get('/weekly-insight'));
      setCache('weeklyInsight', response.data.data, CACHE_TTLS.weeklyInsight);
      return buildSuccess(response.data.data);
    } catch (error) {
      return buildFailure(error);
    }
  },

  async getDNAReport() {
    const cached = getCache('dnaReport');
    if (cached) {
      return buildSuccess(cached);
    }

    try {
      const response = await requestWithRetry(() => aiClient.get('/dna'));
      setCache('dnaReport', response.data.data, CACHE_TTLS.dnaReport);
      return buildSuccess(response.data.data);
    } catch (error) {
      return buildFailure(error);
    }
  },

  async getJournalSummary() {
    const cached = getCache('journalSummary');
    if (cached) {
      return buildSuccess(cached);
    }

    try {
      const response = await requestWithRetry(() => aiClient.get('/journal-summary'));
      setCache('journalSummary', response.data.data, CACHE_TTLS.journalSummary);
      return buildSuccess(response.data.data);
    } catch (error) {
      return buildFailure(error);
    }
  },

  async sendMessage(message, history = []) {
    if (!message) {
      return buildFailure(new Error('Message required hai.'));
    }

    try {
      const response = await requestWithRetry(() => aiClient.post('/chat', { 
        message, 
        conversationHistory: history 
      }));
      
      // Response is wrapped in { success: true, data: { reply: string } }
      const reply = response.data.data?.reply || response.data.reply;
      
      return buildSuccess({ reply });
    } catch (error) {
      return buildFailure(error);
    }
  },

  async getScheduleSuggestions(taskIds) {
    if (!Array.isArray(taskIds) || !taskIds.length) {
      return buildFailure(new Error('Task IDs required hain.'));
    }

    try {
      const response = await requestWithRetry(() => aiClient.post('/suggest-schedule', { taskIds }));
      return buildSuccess(response.data.data);
    } catch (error) {
      return buildFailure(error);
    }
  },
  async getMusicSuggestion(title, category) {
    try {
      const response = await requestWithRetry(() => aiClient.post('/suggest-music', { title, category }));
      return buildSuccess(response.data.data);
    } catch (error) {
      return buildFailure(error);
    }
  },
};
