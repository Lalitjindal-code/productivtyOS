import React from 'react';
import { Search, Flame, Timer } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useTimer } from '../../contexts/TimerContext';
import { useStats } from '../../hooks/useStats';
import { MusicPlayer } from '../features/ai/MusicPlayer';
import { NotificationCenter } from './NotificationCenter';

const MiniTimerPill = () => {
  const { timeLeft, isRunning, phase } = useTimer();
  if (!isRunning) return null;

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  const color = phase === 'work' ? 'text-primary-400 border-primary-400/30 bg-primary-400/10'
    : phase === 'shortBreak' ? 'text-plasma-400 border-plasma-400/30 bg-plasma-400/10'
    : 'text-purple-400 border-purple-400/30 bg-purple-400/10';

  return (
    <Link to="/timer">
      <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-lg ${color} transition-all`}>
        <Timer size={14} className="animate-pulse" />
        <span className="font-mono font-bold text-sm tabular-nums">{mins}:{secs}</span>
      </div>
    </Link>
  );
};

export const Header = () => {
  const { stats } = useStats();
  const streak = stats?.streak?.current ?? 0;
  
  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-surface/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-6">
        <div className="text-neutral-400 font-body text-sm font-medium">
          {format(new Date(), 'EEEE, MMMM do, yyyy')}
        </div>
        <MusicPlayer />
      </div>

      <div className="flex items-center gap-4">
        <MiniTimerPill />

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-primary-400 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search commands (Press /)" 
            className="w-48 bg-elevated border border-white/5 rounded-lg py-1.5 pl-9 pr-4 text-xs font-body text-neutral-100 placeholder:text-neutral-700 focus:outline-none focus:border-primary-400/30 focus:w-64 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
          <Flame size={18} className="text-amber-500" />
          <span className="font-mono font-bold text-amber-500 text-sm">{streak} Day{streak !== 1 ? 's' : ''}</span>
        </div>

        <NotificationCenter />
      </div>
    </header>
  );
};
