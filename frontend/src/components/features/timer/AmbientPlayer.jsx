import React from 'react';
import { useMusic } from '../../../contexts/MusicContext';
import { Volume2, VolumeX, Music, CloudRain, Waves, Wind } from 'lucide-react';

export const AmbientPlayer = () => {
  const { 
    activePlaylist, activeAmbient, playlists, ambientSounds,
    togglePlaylist, toggleAmbient, volume, setVolume, isPlaying 
  } = useMusic();

  const getIcon = (key) => {
    switch (key) {
      case 'rain': return <CloudRain size={16} />;
      case 'waves': return <Waves size={16} />;
      default: return <Wind size={16} />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-elevated border border-white/5 rounded-2xl shadow-glow-sm">
      <div>
        <h3 className="font-display font-bold text-sm text-neutral-400 uppercase tracking-widest mb-4">Focus Music</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(playlists).map(([key, p]) => (
            <button
              key={key}
              onClick={() => togglePlaylist(key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                activePlaylist === key && isPlaying
                  ? 'bg-primary-400/20 border-primary-400/50 text-primary-400 shadow-glow-sm'
                  : 'bg-surface border-white/5 text-neutral-400 hover:border-white/20 hover:text-neutral-200'
              }`}
            >
              <span className="text-xl">{p.icon}</span>
              <span className="font-body text-xs font-semibold">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-bold text-sm text-neutral-400 uppercase tracking-widest mb-4">Ambient Layers</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(ambientSounds).map(([key, s]) => (
            <button
              key={key}
              onClick={() => toggleAmbient(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                activeAmbient.includes(key)
                  ? 'bg-plasma-400/20 border-plasma-400/50 text-plasma-400'
                  : 'bg-surface border-white/5 text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {getIcon(key)}
              <span className="font-body text-xs font-medium">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-white/5">
        <div className="flex items-center gap-4">
          {volume === 0 ? <VolumeX size={18} className="text-neutral-500" /> : <Volume2 size={18} className="text-neutral-400" />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-400"
          />
        </div>
      </div>
    </div>
  );
};
