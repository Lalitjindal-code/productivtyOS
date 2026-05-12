import React from 'react';
import { MOOD_COLORS } from './MoodSelector';

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export const EntryCard = ({ entry, onDelete, onEdit }) => {
  const mc = MOOD_COLORS[entry.mood?.score] || '#888';
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.07)`,
      borderLeft: `3px solid ${mc}`, borderRadius: '12px', padding: '18px 20px',
      transition: 'background 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>{entry.mood?.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '15px' }}>{fmt(entry.date)}</div>
            <div style={{ fontSize: '12px', color: mc, fontWeight: 600 }}>{entry.mood?.label}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {onEdit && <button onClick={() => onEdit(entry)} style={{ background: 'rgba(124,58,237,0.15)', border: 'none', borderRadius: '7px', padding: '5px 10px', color: '#a78bfa', cursor: 'pointer', fontSize: '12px' }}>Edit</button>}
          <button onClick={() => onDelete(entry._id)} style={{ background: 'rgba(239,68,68,0.12)', border: 'none', borderRadius: '7px', padding: '5px 10px', color: '#f87171', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
        </div>
      </div>

      {entry.achieved && (
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Achieved</span>
          <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '3px 0 0', lineHeight: 1.5 }}>{entry.achieved}</p>
        </div>
      )}
      {entry.struggled && (
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Struggled</span>
          <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '3px 0 0', lineHeight: 1.5 }}>{entry.struggled}</p>
        </div>
      )}
      {entry.intention && (
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tomorrow</span>
          <p style={{ color: '#cbd5e1', fontSize: '13px', margin: '3px 0 0', lineHeight: 1.5 }}>{entry.intention}</p>
        </div>
      )}
      {entry.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
          {entry.tags.map(t => (
            <span key={t} style={{ padding: '2px 10px', borderRadius: '20px', background: 'rgba(124,58,237,0.18)', color: '#a78bfa', fontSize: '11px' }}>#{t}</span>
          ))}
        </div>
      )}
    </div>
  );
};
