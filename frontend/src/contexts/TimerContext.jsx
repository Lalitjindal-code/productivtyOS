import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { pomodoroService } from '../services/pomodoroService';

const DEFAULT_SETTINGS = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4, // long break after every 4 work cycles
};

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [phase, setPhase] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.work * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0); // number of completed work cycles
  const [linkedTaskId, setLinkedTaskId] = useState(null);
  const [linkedTaskTitle, setLinkedTaskTitle] = useState(null);
  const [distractions, setDistractions] = useState([]);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Total duration for the current phase in seconds
  const totalDuration = settings[phase] * 60;

  // ---- Audio ----
  const playChime = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      // Create 3 quick beeps
      [0, 0.35, 0.7].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.5, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.3);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.3);
      });
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }, []);

  // ---- Browser Notification ----
  const sendNotification = useCallback((title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.ico' });
    }
  }, []);

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  // ---- Phase Transition ----
  const advancePhase = useCallback(() => {
    playChime();

    if (phase === 'work') {
      const newCycleCount = cycleCount + 1;
      setCycleCount(newCycleCount);

      // Log to backend
      pomodoroService.logSession({
        taskId: linkedTaskId,
        duration: settings.work,
        type: 'work',
        distractionsLog: distractions.map(d => ({ description: d }))
      }).catch(console.error);
      setDistractions([]);

      if (newCycleCount % settings.longBreakInterval === 0) {
        setPhase('longBreak');
        setTimeLeft(settings.longBreak * 60);
        sendNotification('Long Break! 🎉', `Great work! Take a ${settings.longBreak} minute break.`);
      } else {
        setPhase('shortBreak');
        setTimeLeft(settings.shortBreak * 60);
        sendNotification('Short Break! ☕', `Take a ${settings.shortBreak} minute break.`);
      }
    } else {
      // Break is over, back to work
      setPhase('work');
      setTimeLeft(settings.work * 60);
      sendNotification('Focus Time! 🔥', `Time to get back to work. ${settings.work} minutes on the clock.`);
    }

    setIsRunning(false);
  }, [phase, cycleCount, settings, linkedTaskId, distractions, playChime, sendNotification]);

  // ---- Countdown Interval ----
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            advancePhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, advancePhase]);

  // ---- Controls ----
  const start = useCallback(() => {
    requestNotificationPermission();
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(settings[phase] * 60);
    setDistractions([]);
  }, [phase, settings]);

  const skip = useCallback(() => {
    setIsRunning(false);
    advancePhase();
  }, [advancePhase]);

  const logDistraction = useCallback((text) => {
    setDistractions(prev => [...prev, text]);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    setIsRunning(false);
    setPhase('work');
    setTimeLeft((newSettings.work || settings.work) * 60);
  }, [settings.work]);

  const value = {
    phase,
    timeLeft,
    totalDuration,
    isRunning,
    cycleCount,
    settings,
    linkedTaskId,
    linkedTaskTitle,
    distractions,
    start,
    pause,
    reset,
    skip,
    logDistraction,
    updateSettings,
    setLinkedTaskId,
    setLinkedTaskTitle,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimer must be used within TimerProvider');
  return ctx;
};
