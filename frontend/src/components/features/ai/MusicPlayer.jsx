import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, Volume2, 
  Music, Sparkles, Disc, ListMusic
} from 'lucide-react';
import { useTimer } from '../../../contexts/TimerContext';

const PLAYLISTS = {
  work: {
    name: 'Deep Focus Lo-fi',
    id: 'jfKfPfyJRdk', // Lofi Girl 24/7
    icon: <Sparkles className="text-primary-400" size={14} />,
    color: 'from-primary-400/20 to-primary-600/20'
  },
  study: {
    name: 'Ambient Study',
    id: 'S_moW6V07v4', // Ambient Study Music
    icon: <Music className="text-plasma-400" size={14} />,
    color: 'from-plasma-400/20 to-plasma-600/20'
  },
  gym: {
    name: 'High Energy Phonk',
    id: 'fH9vYv099x4', // Phonk Mix
    icon: <Disc className="text-lime-500" size={14} />,
    color: 'from-lime-500/20 to-lime-600/20'
  },
  creative: {
    name: 'Synthwave Creative',
    id: 'kg9F-vPr3-M', // Synthwave Radio
    icon: <Disc className="text-purple-400" size={14} />,
    color: 'from-purple-400/20 to-purple-600/20'
  },
  chill: {
    name: 'Chill Vibes',
    id: '5qap5aO4i9A', // Chillhop
    icon: <ListMusic className="text-neutral-400" size={14} />,
    color: 'from-neutral-400/20 to-neutral-600/20'
  }
};

export const MusicPlayer = () => {
  const { isRunning, phase, linkedTaskId } = useTimer();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChannel, setActiveChannel] = useState('chill');
  const [isExpanded, setIsExpanded] = useState(false);
  const playerRef = useRef(null);

  // Auto-switch based on timer state
  useEffect(() => {
    if (isRunning) {
      if (phase === 'work') {
        // Here we'd ideally fetch the category of linkedTaskId
        // For now, defaulting to 'work' or 'study'
        setActiveChannel('work');
      } else {
        setActiveChannel('chill');
      }
      setIsPlaying(true);
    }
  }, [isRunning, phase]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative flex items-center">
      {/* Mini Player */}
      <motion.div 
        layout
        className={`flex items-center gap-3 bg-elevated border border-white/10 px-4 py-2 rounded-xl transition-all ${isExpanded ? 'w-64' : 'w-48'}`}
      >
        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${PLAYLISTS[activeChannel].color}`}>
          {PLAYLISTS[activeChannel].icon}
        </div>
        
        <div className="flex-1 min-w-0 overflow-hidden" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest truncate">
            {isPlaying ? 'Now Playing' : 'Paused'}
          </div>
          <div className="text-xs font-bold text-neutral-100 truncate">
            {PLAYLISTS[activeChannel].name}
          </div>
        </div>

        <button 
          onClick={togglePlay}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
        </button>
      </motion.div>

      {/* Hidden YouTube Iframe (Audio Only) */}
      <div className="hidden">
        {isPlaying && (
          <iframe
            width="1"
            height="1"
            src={`https://www.youtube.com/embed/${PLAYLISTS[activeChannel].id}?autoplay=1&controls=0&modestbranding=1&loop=1&playlist=${PLAYLISTS[activeChannel].id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>

      {/* Expanded Controls Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsExpanded(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-12 left-0 w-64 bg-surface border border-white/10 rounded-2xl p-4 shadow-2xl z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest">Switch Channel</h3>
                <Volume2 size={14} className="text-neutral-600" />
              </div>
              
              <div className="space-y-2">
                {Object.entries(PLAYLISTS).map(([key, channel]) => (
                  <button
                    key={key}
                    onClick={() => { setActiveChannel(key); setIsPlaying(true); }}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all ${activeChannel === key ? 'bg-primary-400/10 border border-primary-400/20' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${channel.color}`}>
                      {channel.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-neutral-100">{channel.name}</div>
                      <div className="text-[9px] text-neutral-500 uppercase tracking-tighter">AI Curated</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
