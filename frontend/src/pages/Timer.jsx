import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Zap, Settings, X, Maximize2, Minimize2, AlertTriangle } from 'lucide-react';
import { useTimer } from '../contexts/TimerContext';
import { useTasks } from '../hooks/useTasks';
import { AmbientPlayer } from '../components/features/timer/AmbientPlayer';
import { ZenOverlay } from '../components/features/timer/ZenOverlay';
import { aiService } from '../services/aiService';
import { useMusic } from '../contexts/MusicContext';
import api from '../services/api';
import { AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { pomodoroService } from '../services/pomodoroService';

// --- Circular Progress Ring ---
const TimerRing = ({ progress, phase, timeLeft, totalDuration }) => {
  const radius = 140;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const phaseColors = {
    work: { stroke: '#ffab00', glow: 'rgba(255,171,0,0.4)', text: 'text-primary-400', label: 'FOCUS' },
    shortBreak: { stroke: '#00f0ff', glow: 'rgba(0,240,255,0.35)', text: 'text-plasma-400', label: 'BREAK' },
    longBreak: { stroke: '#a78bfa', glow: 'rgba(167,139,250,0.35)', text: 'text-purple-400', label: 'LONG BREAK' },
  };

  const colors = phaseColors[phase];
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="relative flex items-center justify-center" style={{ width: radius * 2, height: radius * 2 }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-20 transition-all duration-1000"
        style={{ background: colors.glow }}
      />

      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        {/* Track */}
        <circle
          stroke="rgba(255,255,255,0.05)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress */}
        <circle
          stroke={colors.stroke}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 1s linear',
            filter: `drop-shadow(0 0 8px ${colors.stroke})`
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span className={`font-mono text-xs font-bold tracking-[0.4em] ${colors.text} opacity-70`}>
          {colors.label}
        </span>
        <span className="font-mono text-6xl font-bold text-neutral-50 tracking-tight tabular-nums">
          {mins}:{secs}
        </span>
      </div>
    </div>
  );
};

// --- Distraction Log Modal ---
const DistractionModal = ({ onClose, onLog }) => {
  const [text, setText] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/60 backdrop-blur-sm">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-sm shadow-modal animate-in fade-in zoom-in duration-150">
        <h3 className="font-display font-bold text-lg text-neutral-50 mb-1">Log Distraction</h3>
        <p className="font-body text-sm text-neutral-400 mb-4">What pulled your attention away?</p>
        <input
          autoFocus
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && text.trim()) { onLog(text.trim()); onClose(); } }}
          placeholder="e.g., Phone notification, sudden thought..."
          className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body text-sm placeholder:text-neutral-600 focus:outline-none focus:border-red-400/50 mb-4"
        />
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="font-body text-sm text-neutral-400 hover:text-neutral-100 px-3 py-2">Cancel</button>
          <button
            onClick={() => { if (text.trim()) { onLog(text.trim()); onClose(); } }}
            className="font-body text-sm bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors"
          >
            Log It
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Settings Panel ---
const SettingsPanel = ({ settings, onSave, onClose }) => {
  const [local, setLocal] = useState(settings);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/60 backdrop-blur-sm">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-xs shadow-modal animate-in fade-in zoom-in duration-150">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display font-bold text-lg text-neutral-50">Timer Settings</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-100"><X size={18} /></button>
        </div>
        {[
          { label: 'Focus Duration', key: 'work', unit: 'min' },
          { label: 'Short Break', key: 'shortBreak', unit: 'min' },
          { label: 'Long Break', key: 'longBreak', unit: 'min' },
          { label: 'Long Break Every', key: 'longBreakInterval', unit: 'cycles' },
        ].map(({ label, key, unit }) => (
          <div key={key} className="flex items-center justify-between mb-4">
            <label className="font-body text-sm text-neutral-300">{label}</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={120}
                value={local[key]}
                onChange={e => setLocal(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                className="w-16 bg-base border border-white/10 rounded-lg px-2 py-1.5 text-center text-neutral-100 font-mono text-sm focus:outline-none focus:border-primary-400/50"
              />
              <span className="text-xs text-neutral-500 font-body w-8">{unit}</span>
            </div>
          </div>
        ))}
        <button
          onClick={() => { onSave(local); onClose(); }}
          className="w-full mt-2 bg-primary-400/20 border border-primary-400/30 text-primary-400 hover:bg-primary-400/30 font-body font-medium py-2.5 rounded-lg transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

// --- Main Timer Page ---
export const Timer = () => {
  const {
    phase, timeLeft, totalDuration, isRunning, cycleCount, settings,
    linkedTaskId, linkedTaskTitle, distractions,
    start, pause, reset, skip, logDistraction, updateSettings,
    setLinkedTaskId, setLinkedTaskTitle,
  } = useTimer();

  const { tasks } = useTasks();
  const [showDistractionModal, setShowDistractionModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const { togglePlaylist, setIsPlaying } = useMusic();
  const containerRef = useRef(null);

  // Fetch daily stats dynamically
  const { data: dailyStats } = useQuery({
    queryKey: ['pomodoroStats'],
    queryFn: pomodoroService.getDailyStats
  });

  // --- AI DJ: Auto-switch music based on task ---
  useEffect(() => {
    if (linkedTaskId && linkedTaskTitle) {
      const task = tasks?.find(t => t._id === linkedTaskId);
      if (task) {
        aiService.getMusicSuggestion(task.title, task.category).then(res => {
          if (res.data?.genre) {
            togglePlaylist(res.data.genre);
            setIsPlaying(true);
          }
        });
      }
    }
  }, [linkedTaskId, linkedTaskTitle, tasks]);

  const activeTasks = tasks?.filter(t => t.status !== 'completed' && t.status !== 'failed') || [];

  const progress = totalDuration > 0
    ? ((totalDuration - timeLeft) / totalDuration) * 100
    : 0;

  // --- Full-screen focus mode ---
  const toggleFocusMode = async () => {
    if (!isFocusMode) {
      try {
        await containerRef.current?.requestFullscreen?.();
        setIsFocusMode(true);
        // Trigger Mobile Lock
        api.post('/user/mobile/trigger-lock', { taskTitle: linkedTaskTitle }).catch(console.error);
      } catch {
        setIsFocusMode(prev => !prev);
        api.post('/user/mobile/trigger-lock', { taskTitle: linkedTaskTitle }).catch(console.error);
      }
    } else {
      if (document.fullscreenElement) {
        await document.exitFullscreen?.();
      }
      setIsFocusMode(false);
    }
  };

  useEffect(() => {
    const handler = () => { if (!document.fullscreenElement) setIsFocusMode(false); };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const phaseLabels = { work: 'Focus', shortBreak: 'Short Break', longBreak: 'Long Break' };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-700 ${
        isFocusMode
          ? 'bg-void fixed inset-0 z-40'
          : 'bg-transparent py-8 px-4'
      }`}
    >
      <AnimatePresence>
        {isFocusMode && (
          <ZenOverlay
            timeLeft={timeLeft}
            phase={phase}
            isRunning={isRunning}
            toggleTimer={isRunning ? pause : start}
            onExit={() => setIsFocusMode(false)}
          />
        )}
      </AnimatePresence>

      <div className={`w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${isFocusMode ? 'opacity-0 scale-95' : 'opacity-100'}`}>
        <div className="flex flex-col items-center">
          {/* Phase Tabs */}
          <div className="flex gap-2 mb-12">
            {['work', 'shortBreak', 'longBreak'].map(p => (
              <button
                key={p}
                onClick={() => {}}
                className={`font-body text-sm px-4 py-1.5 rounded-full transition-all ${
                  phase === p
                    ? 'bg-white/10 text-neutral-100 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-400'
                }`}
              >
                {phaseLabels[p]}
              </button>
            ))}
          </div>

          {/* Circular Ring */}
          <div className="mb-12">
            <TimerRing
              progress={progress}
              phase={phase}
              timeLeft={timeLeft}
              totalDuration={totalDuration}
            />
          </div>

          {/* Cycle Dots */}
          <div className="flex gap-2.5 mb-8">
            {Array.from({ length: settings.longBreakInterval }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i < (cycleCount % settings.longBreakInterval)
                    ? 'bg-primary-400 shadow-[0_0_6px_rgba(255,171,0,0.8)]'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>

          {/* Task Linker */}
          <div className="mb-8 w-full max-w-xs">
            <div className="flex items-center gap-2 bg-surface/80 border border-white/10 rounded-xl px-4 py-2.5">
              <Zap size={16} className="text-primary-400 shrink-0" />
              <select
                value={linkedTaskId || ''}
                onChange={e => {
                  const selected = activeTasks.find(t => t._id === e.target.value);
                  setLinkedTaskId(e.target.value || null);
                  setLinkedTaskTitle(selected?.title || null);
                }}
                className="flex-1 bg-transparent text-sm font-body text-neutral-300 focus:outline-none appearance-none cursor-pointer min-w-0"
              >
                <option value="">Working on: (no task)</option>
                {activeTasks.map(t => (
                  <option key={t._id} value={t._id}>{t.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-5 mb-10">
            <button
              onClick={reset}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-100 transition-all"
              title="Reset"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={isRunning ? pause : start}
              className={`w-20 h-20 flex items-center justify-center rounded-full text-void font-bold text-xl shadow-lg transition-all duration-300 ${
                phase === 'work'
                  ? 'bg-primary-400 hover:bg-primary-300 shadow-[0_0_24px_rgba(255,171,0,0.5)]'
                  : phase === 'shortBreak'
                    ? 'bg-plasma-400 hover:bg-cyan-300 shadow-[0_0_24px_rgba(0,240,255,0.5)]'
                    : 'bg-purple-400 hover:bg-purple-300 shadow-[0_0_24px_rgba(167,139,250,0.5)]'
              }`}
            >
              {isRunning ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" />}
            </button>

            <button
              onClick={skip}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-neutral-100 transition-all"
              title="Skip"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center gap-4">
            {isRunning && phase === 'work' && (
              <button
                onClick={() => setShowDistractionModal(true)}
                className="flex items-center gap-2 text-sm font-body text-red-400/70 hover:text-red-400 border border-red-500/20 hover:border-red-500/40 px-4 py-2 rounded-full transition-all"
              >
                <AlertTriangle size={14} />
                <span>Distracted ({distractions.length})</span>
              </button>
            )}

            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 text-sm font-body text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>

            <button
              onClick={toggleFocusMode}
              className="flex items-center gap-2 text-sm font-body text-neutral-500 hover:text-neutral-300 transition-colors"
              title={isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
            >
              {isFocusMode ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              <span>{isFocusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <AmbientPlayer />

          {/* Dynamic Daily Focus Stats Panel */}
          <div className="p-6 bg-surface/85 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap size={16} className="text-primary-400 animate-pulse" /> Focus Metrics Today
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-void/50 border border-white/5 p-4 rounded-xl text-center">
                <div className="text-3xl font-black text-white font-mono">{dailyStats?.completedPomodoros || 0}</div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-1">Pomodoros</div>
              </div>
              <div className="bg-void/50 border border-white/5 p-4 rounded-xl text-center">
                <div className="text-3xl font-black text-primary-400 font-mono">{dailyStats?.totalFocusMinutes || 0}m</div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mt-1">Focus Time</div>
              </div>
            </div>

            {/* Target Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-neutral-400">Daily Target Progress</span>
                <span className="text-neutral-200">{Math.min(100, Math.round(((dailyStats?.totalFocusMinutes || 0) / 120) * 100))}%</span>
              </div>
              <div className="w-full bg-void rounded-full h-2 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-300 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, ((dailyStats?.totalFocusMinutes || 0) / 120) * 100)}%` }}
                />
              </div>
              <div className="text-[10px] text-neutral-500 mt-1">Goal: 120 minutes focus daily</div>
            </div>
            
            {/* Recent Sessions */}
            {dailyStats?.sessions?.length > 0 && (
              <div className="mt-4 border-t border-white/5 pt-4">
                <p className="font-body text-[10px] text-neutral-500 mb-2 uppercase tracking-widest font-bold">Focus History (Today)</p>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {dailyStats.sessions.map((session, i) => (
                    <div key={session._id || i} className="flex justify-between items-center text-xs bg-void/30 p-2.5 rounded-lg border border-white/5">
                      <span className="font-medium text-neutral-300">
                        {session.type === 'work' ? '🔥 Focus Session' : '☕ Break Session'}
                      </span>
                      <span className="font-mono text-neutral-500 text-[10px]">
                        {session.duration} min | {new Date(session.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {distractions.length > 0 && (
            <div className="mt-4">
              <p className="font-body text-[10px] text-neutral-500 mb-2 uppercase tracking-widest font-bold">Session Distractions</p>
              <div className="space-y-2">
                {distractions.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-body text-red-400/80 bg-red-500/5 border border-red-500/10 px-3 py-2 rounded-xl">
                    <AlertTriangle size={12} />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showDistractionModal && (
        <DistractionModal
          onClose={() => setShowDistractionModal(false)}
          onLog={logDistraction}
        />
      )}

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSave={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};
