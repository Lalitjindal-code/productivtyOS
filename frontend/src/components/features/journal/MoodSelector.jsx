import React from 'react';

const MOODS = [
  { score: 1, emoji: '😭', label: 'Awful' },
  { score: 2, emoji: '😕', label: 'Meh' },
  { score: 3, emoji: '😐', label: 'Neutral' },
  { score: 4, emoji: '😊', label: 'Good' },
  { score: 5, emoji: '🔥', label: 'Amazing' },
];

const MOOD_COLORS = {
  1: '#ef4444', 2: '#f97316', 3: '#eab308', 4: '#22c55e', 5: '#a855f7'
};

export const MoodSelector = ({ value, onChange }) => (
  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
    {MOODS.map(m => (
      <button
        key={m.score}
        onClick={() => onChange(m.score)}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
          padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
          background: value === m.score ? `${MOOD_COLORS[m.score]}22` : 'rgba(255,255,255,0.04)',
          outline: value === m.score ? `2px solid ${MOOD_COLORS[m.score]}` : '2px solid transparent',
          transition: 'all 0.2s', transform: value === m.score ? 'scale(1.12)' : 'scale(1)',
        }}
      >
        <span style={{ fontSize: '28px', lineHeight: 1 }}>{m.emoji}</span>
        <span style={{ fontSize: '11px', color: value === m.score ? MOOD_COLORS[m.score] : '#888', fontWeight: 600 }}>{m.label}</span>
      </button>
    ))}
  </div>
);

export { MOODS, MOOD_COLORS };
