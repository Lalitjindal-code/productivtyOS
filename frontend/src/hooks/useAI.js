import { useState, useEffect, useCallback } from 'react';
import { aiService } from '../services/aiService.js';

/**
 * Hook for Task Quiz
 */
export const useTaskQuiz = (taskId) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const fetchQuiz = useCallback(async () => {
    if (!taskId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.getTaskQuiz(taskId);
      if (res.error) {
        setError(res.error.message);
        setQuestions([{ id: 1, question: 'Kya task poora hua?', type: 'reflection' }]);
      } else {
        setQuestions(res.data?.questions || []);
      }
      setAnswers({});
      setIsComplete(false);
    } catch (err) {
      setError('Quiz load karne mein dikkat aa gayi.');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const submitAnswer = (questionId, answer) => {
    setAnswers((prev) => {
      const nextAnswers = { ...prev, [questionId]: answer };
      if (Object.keys(nextAnswers).length >= questions.length) {
        setIsComplete(true);
      }
      return nextAnswers;
    });
  };

  return { questions, loading, error, submitAnswer, answers, isComplete };
};

/**
 * Hook for Roast Mode
 */
export const useRoastMode = (taskId, mode = 'soft') => {
  const [roastData, setRoastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [missedCount, setMissedCount] = useState(1);

  const fetchRoast = useCallback(async (count = missedCount) => {
    if (!taskId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.getRoast(taskId, count, mode);
      if (res.error) {
        setError(res.error.message);
      } else {
        setRoastData(res.data);
        setMissedCount(count);
      }
    } catch (err) {
      setError('Roast laane mein dikkat aa gayi.');
    } finally {
      setLoading(false);
    }
  }, [taskId, mode, missedCount]);

  useEffect(() => {
    fetchRoast(1);
  }, [fetchRoast]);

  const playAgain = useCallback((count = missedCount) => fetchRoast(count), [fetchRoast, missedCount]);

  return {
    roast: roastData?.roast,
    loading,
    playAgain,
    hasRoast: !!roastData,
  };
};

/**
 * Hook for Weekly Insight
 */
export const useWeeklyInsight = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsight = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.getWeeklyInsight();
      if (res.error) {
        setError(res.error.message);
      } else {
        setData(res.data);
      }
    } catch (err) {
      setError('Weekly insight load karne mein dikkat aa gayi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight();
  }, []);

  return {
    insights: data?.insights || [],
    weekSummary: data?.weekSummary,
    recommendation: data?.topRecommendation,
    loading,
    error,
  };
};

/**
 * Hook for DNA Report
 */
export const useDNAReport = () => {
  const [dna, setDna] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDNA = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await aiService.getDNAReport();
        if (res.error) {
          setError(res.error.message);
        } else {
          setDna(res.data);
        }
      } catch (err) {
        setError('DNA report laane mein dikkat aa gayi.');
      } finally {
        setLoading(false);
      }
    };
    fetchDNA();
  }, []);

  return {
    dna,
    hasEnoughData: !!dna && Boolean(dna.formula),
    daysUntilReady: dna ? 0 : 30,
    loading,
    error,
  };
};

/**
 * Hook for AI Chat
 */
export const useAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text, timestamp: new Date() };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);
    setError(null);

    try {
      const res = await aiService.sendMessage(text, history);
      if (res.error) {
        setError(res.error.message);
      } else {
        const assistantMsg = { role: 'assistant', content: res.data.reply, timestamp: new Date() };
        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (err) {
      setError('AI chat mein thodi dikkat aa gayi.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return { messages, sendMessage, loading, clearChat, isTyping: loading };
};

/**
 * Hook for Schedule Suggestions
 */
export const useScheduleSuggestions = (taskIds) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [tip, setTip] = useState(null);

  const fetchSuggestions = async () => {
    if (!taskIds || taskIds.length === 0) return;
    setLoading(true);
    try {
      const res = await aiService.getScheduleSuggestions(taskIds);
      if (!res.error) {
        setSchedule(res.data?.scheduledTasks || []);
        setTip(res.data?.tip || null);
      } else {
        setSchedule([]);
        setTip('Sabse important task pehle karo.');
      }
    } catch (err) {
      setSchedule([]);
      setTip('Sabse important task pehle karo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [taskIds]);

  const applySchedule = () => {
    setIsApplied(true);
  };

  return {
    schedule,
    tip,
    loading,
    applySchedule,
    isApplied,
  };
};
