import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, AlertCircle, Rocket, 
  Trash2, Edit2, Hash, Calendar 
} from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '../../common/Card';

const MOOD_CONFIG = {
  1: { color: 'text-red-400', border: 'border-red-500/20', bg: 'bg-red-500/5' },
  2: { color: 'text-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-500/5' },
  3: { color: 'text-neutral-400', border: 'border-neutral-500/20', bg: 'bg-neutral-500/5' },
  4: { color: 'text-primary-400', border: 'border-primary-500/20', bg: 'bg-primary-500/5' },
  5: { color: 'text-plasma-400', border: 'border-plasma-500/20', bg: 'bg-plasma-500/5' },
};

export const EntryCard = ({ entry, onDelete, onEdit }) => {
  const config = MOOD_CONFIG[entry.mood?.score] || MOOD_CONFIG[3];

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 border-l-4 ${config.border} hover:bg-white/[0.02]`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] scale-150 group-hover:scale-175 transition-transform">
        <span className="text-8xl">{entry.mood?.emoji}</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-3xl shadow-glow-sm">
            {entry.mood?.emoji}
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-neutral-100 flex items-center gap-2">
              {format(new Date(entry.date), 'EEEE, MMM do')}
            </h3>
            <div className={`text-xs font-black uppercase tracking-widest ${config.color}`}>
              {entry.mood?.label}
            </div>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-start">
          <button 
            onClick={() => onEdit(entry)}
            className="p-2 rounded-lg bg-primary-500/10 text-primary-400 hover:bg-primary-500/20 border border-primary-500/20 transition-all"
            title="Edit Reflection"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => onDelete(entry._id)}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
            title="Purge Memory"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {entry.achieved && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-400">
              <Trophy size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Achieved</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed italic border-l border-green-500/20 pl-3">
              {entry.achieved}
            </p>
          </div>
        )}

        {entry.struggled && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-400">
              <AlertCircle size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Struggled</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed italic border-l border-orange-500/20 pl-3">
              {entry.struggled}
            </p>
          </div>
        )}

        {entry.intention && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary-400">
              <Rocket size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Tomorrow</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed italic border-l border-primary-500/20 pl-3">
              {entry.intention}
            </p>
          </div>
        )}
      </div>

      {entry.freeText && (
        <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
          <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-wrap">
            {entry.freeText}
          </p>
        </div>
      )}

      {entry.tags?.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-6 relative z-10">
          {entry.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-neutral-500 hover:text-primary-400 hover:border-primary-400/30 transition-all cursor-default uppercase tracking-tight">
              <Hash size={10} />
              {tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};
