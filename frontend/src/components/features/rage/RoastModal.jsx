import React, { useEffect } from 'react';
import { X, Skull, Flame, Zap } from 'lucide-react';

const modeConfig = {
  soft: { emoji: '😔', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10', label: 'Gentle Nudge' },
  hard: { emoji: '💀', color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/10', label: 'Hard Truth' },
  brutal: { emoji: '🔥', color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10', label: 'BRUTAL MODE' },
  custom: { emoji: '⚡', color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10', label: 'Custom Mode' },
};

export const RoastModal = ({ isOpen, onClose, roast, taskTitle, rageMode = 'hard' }) => {
  const config = modeConfig[rageMode] || modeConfig.hard;

  // Dramatic entrance with vibration
  useEffect(() => {
    if (isOpen && navigator.vibrate) {
      navigator.vibrate([100, 50, 200, 50, 100]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      {/* Dramatic flash overlay */}
      <div className="absolute inset-0 bg-red-900/20 animate-pulse pointer-events-none" />

      <div
        className={`relative w-full max-w-lg bg-void border ${config.border} rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 fade-in duration-500`}
        style={{ boxShadow: `0 0 60px ${rageMode === 'brutal' ? 'rgba(239,68,68,0.4)' : 'rgba(249,115,22,0.3)'}` }}
      >
        {/* Header bar */}
        <div className={`${config.bg} border-b ${config.border} px-6 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-bounce">{config.emoji}</span>
            <div>
              <p className={`font-mono text-xs font-bold tracking-widest ${config.color} uppercase`}>
                {config.label}
              </p>
              <p className="font-body text-sm text-neutral-300 mt-0.5 line-clamp-1">
                Failed: "{taskTitle}"
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Roast text */}
        <div className="p-6">
          <div className="flex gap-1 mb-4">
            {[...Array(rageMode === 'brutal' ? 5 : rageMode === 'hard' ? 3 : 1)].map((_, i) => (
              <Flame key={i} size={16} className={`${config.color} ${i === 0 ? 'opacity-100' : 'opacity-40'}`} />
            ))}
          </div>

          <p className="font-body text-lg text-neutral-100 leading-relaxed italic">
            "{roast}"
          </p>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <p className="font-mono text-xs text-neutral-600">
              AI-generated · {rageMode} mode
            </p>
            <button
              onClick={onClose}
              className={`font-body font-semibold text-sm ${config.color} ${config.bg} border ${config.border} hover:opacity-80 px-5 py-2 rounded-lg transition-all flex items-center gap-2`}
            >
              <Zap size={14} />
              Take the L & Move On
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
