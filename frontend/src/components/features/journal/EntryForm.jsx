import React, { useState } from 'react';
import { MoodSelector } from './MoodSelector';

const TAGS = ['productive', 'creative', 'social', 'health', 'learning', 'rest', 'stressful', 'breakthrough'];

const Field = ({ label, hint, value, onChange, rows = 3 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label style={{ fontSize: '13px', fontWeight: 600, color: '#a78bfa' }}>{label}</label>
    {hint && <span style={{ fontSize: '11px', color: '#555' }}>{hint}</span>}
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={hint}
      style={{
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px',
        resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6,
        transition: 'border-color 0.2s',
      }}
      onFocus={e => e.target.style.borderColor = '#7c3aed'}
      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
    />
  </div>
);

export const EntryForm = ({ existing, onSave, onCancel }) => {
  const today = new Date().toISOString().split('T')[0];
  const [mood, setMood] = useState(existing?.mood?.score || 0);
  const [achieved, setAchieved] = useState(existing?.achieved || '');
  const [struggled, setStruggled] = useState(existing?.struggled || '');
  const [intention, setIntention] = useState(existing?.intention || '');
  const [freeText, setFreeText] = useState(existing?.freeText || '');
  const [tags, setTags] = useState(existing?.tags || []);
  const [saving, setSaving] = useState(false);

  const toggleTag = (t) => setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleSave = async () => {
    if (!mood) return alert('Please select a mood first.');
    setSaving(true);
    try {
      await onSave({ date: today, mood: { score: mood }, achieved, struggled, intention, freeText, tags });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginBottom: '12px' }}>How are you feeling today?</p>
        <MoodSelector value={mood} onChange={setMood} />
      </div>

      <Field label="✅ What did I achieve today?" hint="List your wins, big or small..." value={achieved} onChange={setAchieved} />
      <Field label="⚡ What did I struggle with?" hint="Be honest — this is private..." value={struggled} onChange={setStruggled} />
      <Field label="🎯 My intention for tomorrow" hint="One clear goal for tomorrow..." value={intention} onChange={setIntention} />
      <Field label="💭 Free thoughts (optional)" hint="Anything else on your mind..." value={freeText} onChange={setFreeText} rows={2} />

      <div>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#a78bfa', marginBottom: '8px' }}>🏷️ Tags</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {TAGS.map(t => (
            <button key={t} onClick={() => toggleTag(t)} style={{
              padding: '4px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '12px',
              background: tags.includes(t) ? '#7c3aed' : 'rgba(255,255,255,0.06)',
              color: tags.includes(t) ? '#fff' : '#888', transition: 'all 0.2s',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        {onCancel && <button onClick={onCancel} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#888', cursor: 'pointer' }}>Cancel</button>}
        <button onClick={handleSave} disabled={saving} style={{
          padding: '10px 28px', borderRadius: '10px', border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
          background: saving ? '#555' : 'linear-gradient(135deg, #7c3aed, #a855f7)',
          color: '#fff', fontWeight: 700, fontSize: '14px',
        }}>{saving ? 'Saving…' : existing ? '✏️ Update Entry' : '✍️ Save Entry'}</button>
      </div>
    </div>
  );
};
