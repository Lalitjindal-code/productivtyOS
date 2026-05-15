import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const MusicContext = createContext(null);

const PLAYLISTS = {
  lofi: {
    name: 'Lofi Chillhop',
    url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&controls=0&showinfo=0&autohide=1', // Lofi Girl
    icon: '🎧'
  },
  ambient: {
    name: 'Deep Ambient',
    url: 'https://www.youtube.com/embed/m5W9v_N1l-A?autoplay=1&controls=0&showinfo=0&autohide=1',
    icon: '🌌'
  },
  nature: {
    name: 'Forest Rain',
    url: 'https://www.youtube.com/embed/nUGRX99Y_lA?autoplay=1&controls=0&showinfo=0&autohide=1',
    icon: '🌿'
  },
  cyber: {
    name: 'Cyberpunk Focus',
    url: 'https://www.youtube.com/embed/7S8YxS6iUVE?autoplay=1&controls=0&showinfo=0&autohide=1',
    icon: '🌆'
  }
};

const AMBIENT_SOUNDS = {
  rain: { name: 'Rain', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', icon: '🌧️' }, // Placeholder URLs
  waves: { name: 'Waves', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', icon: '🌊' },
  white_noise: { name: 'White Noise', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', icon: '🌫️' }
};

export const MusicProvider = ({ children }) => {
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [activeAmbient, setActiveAmbient] = useState([]);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef({});

  const togglePlaylist = (key) => {
    if (activePlaylist === key) {
      setIsPlaying(!isPlaying);
    } else {
      setActivePlaylist(key);
      setIsPlaying(true);
    }
  };

  const toggleAmbient = (key) => {
    setActiveAmbient(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const value = {
    activePlaylist,
    activeAmbient,
    volume,
    isPlaying,
    playlists: PLAYLISTS,
    ambientSounds: AMBIENT_SOUNDS,
    setActivePlaylist,
    setVolume,
    setIsPlaying,
    togglePlaylist,
    toggleAmbient
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Hidden YouTube Players for Audio */}
      {activePlaylist && isPlaying && (
        <div className="fixed -left-[1000px] -top-[1000px] opacity-0 pointer-events-none">
          <iframe
            width="1"
            height="1"
            src={playlists[activePlaylist].url}
            allow="autoplay"
          ></iframe>
        </div>
      )}
      {/* Hidden HTML5 Audio for Ambient Layers */}
      {activeAmbient.map(key => (
        <audio
          key={key}
          src={ambientSounds[key].url}
          autoPlay
          loop
          ref={el => {
            if (el) el.volume = volume * 0.5;
            audioRefs.current[key] = el;
          }}
        />
      ))}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
};
