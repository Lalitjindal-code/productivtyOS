import React from 'react';
import { motion } from 'framer-motion';

const MOODS = [
  { score: 1, emoji: '😭', label: 'Awful', color: 'text-red-400', bg: 'bg-red-400/20', border: 'border-red-400' },
  { score: 2, emoji: '😕', label: 'Meh', color: 'text-orange-400', bg: 'bg-orange-400/20', border: 'border-orange-400' },
  { score: 3, emoji: '😐', label: 'Neutral', color: 'text-neutral-400', bg: 'bg-neutral-400/20', border: 'border-neutral-400' },
  { score: 4, emoji: '😊', label: 'Good', color: 'text-primary-400', bg: 'bg-primary-400/20', border: 'border-primary-400' },
  { score: 5, emoji: '🔥', label: 'Amazing', color: 'text-plasma-400', bg: 'bg-plasma-400/20', border: 'border-plasma-400' },
];

export const MoodSelector = ({ value, onChange }) => (
  <div className="flex gap-4 justify-between flex-wrap">
    {MOODS.map(m => (
      <motion.button
        type="button"
        key={m.score}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(m.score)}
        className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all flex-1 min-w-[80px] border-2 ${
          value === m.score 
            ? `${m.bg} ${m.border} shadow-glow-sm` 
            : 'bg-white/5 border-transparent hover:bg-white/10'
        }`}
      >
        <span className="text-3xl leading-none">{m.emoji}</span>
        <span className={`text-[10px] font-black uppercase tracking-tighter ${
          value === m.score ? m.color : 'text-neutral-600'
        }`}>
          {m.label}
        </span>
      </motion.button>
    ))}
  </div>
);

export { MOODS };
