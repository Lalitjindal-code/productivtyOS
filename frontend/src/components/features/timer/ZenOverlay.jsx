import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { useMusic } from '../../../contexts/MusicContext';

const QUOTES = [
  "Focus on being productive instead of busy.",
  "Your mind is for having ideas, not holding them.",
  "Deep work is the superpower of the 21st century.",
  "The secret of getting ahead is getting started.",
  "Don't stop until you're proud."
];

export const ZenOverlay = ({ timeLeft, phase, onExit, isRunning, toggleTimer }) => {
  const { volume, setVolume } = useMusic();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % QUOTES.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, -100, -200],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Close Button */}
      <button 
        onClick={onExit}
        className="absolute top-8 right-8 text-neutral-600 hover:text-neutral-100 transition-colors p-2 rounded-full hover:bg-white/5"
      >
        <X size={24} />
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <motion.div 
          animate={{ scale: isRunning ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="font-mono text-[12rem] font-bold text-neutral-50 leading-none tracking-tighter tabular-nums drop-shadow-glow-lg">
            {mins}:{secs}
          </span>
          <span className="font-display font-bold text-sm tracking-[0.5em] text-primary-400 opacity-60 uppercase mt-4">
            {phase === 'work' ? 'Stay Focused' : 'Take a Breath'}
          </span>
        </motion.div>

        {/* AI Quote */}
        <div className="h-12 flex items-center justify-center px-12 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-body text-lg text-neutral-400 italic max-w-xl leading-relaxed"
            >
              "{QUOTES[quoteIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Controls Overlay */}
        <div className="flex items-center gap-8 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full">
          <div className="flex items-center gap-4 border-r border-white/10 pr-8">
            <Volume2 size={18} className="text-neutral-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-32 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-400"
            />
          </div>
          <button 
            onClick={toggleTimer}
            className="font-display font-bold text-sm text-neutral-200 hover:text-primary-400 transition-colors flex items-center gap-2"
          >
            <Sparkles size={16} />
            {isRunning ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
