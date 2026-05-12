import React, { useState } from 'react';
import { useJournal, useTodayEntry, useOnThisDay, useUpsertEntry, useDeleteEntry } from '../hooks/useJournal';
import { EntryForm } from '../components/features/journal/EntryForm';
import { EntryCard } from '../components/features/journal/EntryCard';

// ---- On This Day Banner ----
const OnThisDayBanner = ({ memories }) => {
  if (!memories?.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
      {memories.map(({ label, entry }) => (
        <div key={label} style={{
          background: 'linear-gradient(135deg, rgba(234,179,8,0.08), rgba(168,85,247,0.08))',
          border: '1px solid rgba(234,179,8,0.2)', borderRadius: '12px', padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: '14px',
        }}>
          <span style={{ fontSize: '24px' }}>⏳</span>
          <div>
            <div style={{ fontSize: '11px', color: '#eab308', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>On This Day — {label}</div>
            <div style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '3px' }}>
              {entry.mood?.emoji} {entry.achieved ? entry.achieved.slice(0, 120) + (entry.achieved.length > 120 ? '…' : '') : 'No achievement logged'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---- Main Journal Page ----
export const Journal = () => {
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [search, setSearch] = useState('');
  const [filterMood, setFilterMood] = useState('');
  const [page, setPage] = useState(1);

  const { data: todayEntry } = useTodayEntry();
  const { data: memories } = useOnThisDay();
  const { data: journalData, isLoading } = useJournal({ page, mood: filterMood, search });
  const upsert = useUpsertEntry();
  const deleteEntry = useDeleteEntry();

  const handleSave = async (payload) => {
    await upsert.mutateAsync(payload);
    setShowForm(false);
    setEditEntry(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this entry?')) deleteEntry.mutate(id);
  };

  const entries = journalData?.entries || [];

  return (
    <div style={{ padding: '24px 32px', maxWidth: '820px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#e2e8f0', margin: 0 }}>📔 Daily Journal</h1>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>Track your mood, wins, and reflections</p>
        </div>
        <button
          onClick={() => { setEditEntry(null); setShowForm(s => !s); }}
          style={{
            padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: showForm ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: '#fff', fontWeight: 700, fontSize: '14px',
          }}
        >
          {showForm ? '✕ Cancel' : todayEntry ? '✏️ Edit Today' : '+ New Entry'}
        </button>
      </div>

      {/* On This Day */}
      <OnThisDayBanner memories={memories} />

      {/* Today's Entry Form */}
      {(showForm || editEntry) && (
        <div style={{
          background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '16px', padding: '24px', marginBottom: '28px',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#a78bfa', marginBottom: '20px' }}>
            {editEntry ? '✏️ Edit Entry' : "✍️ Today's Reflection"}
          </h2>
          <EntryForm
            existing={editEntry || todayEntry}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditEntry(null); }}
          />
        </div>
      )}

      {/* Today's existing entry summary (when form is closed) */}
      {todayEntry && !showForm && !editEntry && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(124,58,237,0.06))',
          border: '1px solid rgba(34,197,94,0.2)', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px',
          display: 'flex', alignItems: 'center', gap: '14px',
        }}>
          <span style={{ fontSize: '28px' }}>{todayEntry.mood?.emoji}</span>
          <div>
            <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 700 }}>TODAY'S ENTRY SAVED</div>
            <div style={{ color: '#94a3b8', fontSize: '13px' }}>Feeling {todayEntry.mood?.label} · {todayEntry.tags?.join(', ') || 'no tags'}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="🔍 Search entries..."
          style={{
            flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
            padding: '9px 14px', color: '#e2e8f0', fontSize: '13px', outline: 'none',
          }}
        />
        <select
          value={filterMood}
          onChange={e => { setFilterMood(e.target.value); setPage(1); }}
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px', padding: '9px 14px', color: '#e2e8f0', fontSize: '13px', outline: 'none',
          }}
        >
          <option value=''>All Moods</option>
          <option value='1'>😭 Awful</option>
          <option value='2'>😕 Meh</option>
          <option value='3'>😐 Neutral</option>
          <option value='4'>😊 Good</option>
          <option value='5'>🔥 Amazing</option>
        </select>
      </div>

      {/* Entry List */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#555' }}>Loading entries…</div>
      ) : entries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#555' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📔</div>
          <div style={{ fontWeight: 600, color: '#777' }}>No entries yet</div>
          <div style={{ fontSize: '13px', color: '#555', marginTop: '6px' }}>Start writing your first daily reflection above.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {entries.map(e => (
            <EntryCard
              key={e._id}
              entry={e}
              onDelete={handleDelete}
              onEdit={(entry) => { setEditEntry(entry); setShowForm(false); }}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {journalData?.pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '24px' }}>
          <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
            style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: page <= 1 ? '#444' : '#a78bfa', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>← Prev</button>
          <span style={{ padding: '8px 12px', color: '#888', fontSize: '13px' }}>Page {page} / {journalData.pages}</span>
          <button disabled={page >= journalData.pages} onClick={() => setPage(p => p + 1)}
            style={{ padding: '8px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: page >= journalData.pages ? '#444' : '#a78bfa', cursor: page >= journalData.pages ? 'not-allowed' : 'pointer' }}>Next →</button>
        </div>
      )}
    </div>
  );
};
