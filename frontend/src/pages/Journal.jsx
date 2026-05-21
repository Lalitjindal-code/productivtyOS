import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Calendar, 
  Sparkles, Loader2, Edit3, Trash2,
  ChevronLeft, ChevronRight, History
} from 'lucide-react';
import { useJournal, useTodayEntry, useOnThisDay, useUpsertEntry, useDeleteEntry } from '../hooks/useJournal';
import { EntryForm } from '../components/features/journal/EntryForm';
import { EntryCard } from '../components/features/journal/EntryCard';
import { Card } from '../components/common/Card';
import { useNotifications } from '../contexts/NotificationContext';
import toast from 'react-hot-toast';

// ---- On This Day Banner ----
const OnThisDayBanner = ({ memories }) => {
  if (!memories?.length) return null;
  return (
    <div className="flex flex-col gap-3 mb-8">
      {memories.map(({ label, entry }) => (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          key={label} 
          className="bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-4 group hover:border-amber-500/40 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl shadow-glow-sm group-hover:scale-110 transition-transform">
            ⏳
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">On This Day — {label}</div>
            <div className="text-sm text-neutral-300 line-clamp-1">
              <span className="mr-2">{entry.mood?.emoji}</span>
              {entry.achieved || 'No specific achievement logged.'}
            </div>
          </div>
          <History size={16} className="text-neutral-600 group-hover:text-amber-500 transition-colors" />
        </motion.div>
      ))}
    </div>
  );
};

// ---- Main Journal Page ----
export const Journal = () => {
  const { addNotification } = useNotifications();
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
    try {
      const result = await upsert.mutateAsync(payload);
      setShowForm(false);
      setEditEntry(null);
      
      toast.success('📔 Reflection saved! +10 XP');

      if (result.leveledUp) {
        setTimeout(() => toast.success('⚡ Level Up! Keep journaling!', { duration: 5000 }), 500);
      }
    } catch (err) {
      toast.error('Failed to save reflection. Try again.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to purge this memory?')) {
      deleteEntry.mutate(id);
      toast.error('Memory purged.');
    }
  };

  const entries = journalData?.entries || [];

  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="font-display font-black text-4xl text-neutral-50 tracking-tight">
            Daily Journal
          </h1>
          <p className="font-body text-neutral-400 mt-2">
            Capture your mood, wins, and strategic reflections.
          </p>
        </div>
        
        <button
          onClick={() => { setEditEntry(null); setShowForm(s => !s); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm transition-all shadow-glow-sm ${
            showForm 
              ? 'bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10' 
              : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:scale-105 active:scale-95'
          }`}
        >
          {showForm ? 'Cancel' : todayEntry ? <><Edit3 size={16} /> Edit Today</> : <><Plus size={16} /> New Entry</>}
        </button>
      </div>

      {/* On This Day memories */}
      <OnThisDayBanner memories={memories} />

      {/* Today's Entry Form */}
      <AnimatePresence>
        {(showForm || editEntry) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-10"
          >
            <Card className="p-8 border-primary-500/20 bg-primary-500/5 overflow-visible">
              <h2 className="font-display font-bold text-xl text-primary-400 mb-6 flex items-center gap-2">
                <Edit3 size={20} />
                {editEntry ? 'Edit Entry' : "Today's Strategic Reflection"}
              </h2>
              <EntryForm
                existing={editEntry || todayEntry}
                onSave={handleSave}
                onCancel={() => { setShowForm(false); setEditEntry(null); }}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Today's shortcut (when form is closed) */}
      {todayEntry && !showForm && !editEntry && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-500/5 border border-green-500/20 rounded-2xl p-4 mb-10 flex items-center gap-4"
        >
          <div className="text-3xl">{todayEntry.mood?.emoji}</div>
          <div className="flex-1">
            <div className="text-[10px] font-black text-green-500 uppercase tracking-widest">Entry Captured</div>
            <div className="text-sm text-neutral-400">
              Feeling <span className="text-neutral-100 font-bold">{todayEntry.mood?.label}</span> today.
            </div>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="text-xs font-mono font-bold text-primary-400 hover:text-primary-300 transition-colors uppercase"
          >
            Update
          </button>
        </motion.div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-primary-400 transition-colors" size={18} />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search your memories..."
            className="w-full bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-body text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-primary-400/50 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
          <select
            value={filterMood}
            onChange={e => { setFilterMood(e.target.value); setPage(1); }}
            className="appearance-none bg-surface border border-white/10 rounded-xl py-3 pl-12 pr-10 text-sm font-body text-neutral-100 focus:outline-none focus:border-primary-400/50 transition-all cursor-pointer"
          >
            <option value=''>All Moods</option>
            <option value='1'>😭 Awful</option>
            <option value='2'>😕 Meh</option>
            <option value='3'>😐 Neutral</option>
            <option value='4'>😊 Good</option>
            <option value='5'>🔥 Amazing</option>
          </select>
        </div>
      </div>

      {/* Entry List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-primary-400" size={32} />
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">Loading archives...</p>
          </div>
        ) : entries.length === 0 ? (
          <Card className="p-20 text-center flex flex-col items-center justify-center border-dashed">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-6 grayscale opacity-50">
              📔
            </div>
            <h3 className="font-display font-bold text-xl text-neutral-200 mb-2">The Archive is Empty</h3>
            <p className="font-body text-neutral-500 max-w-sm mx-auto">
              You haven't recorded any strategic reflections yet. Start capturing your journey today.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {entries.map((entry, idx) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <EntryCard
                  entry={entry}
                  onDelete={handleDelete}
                  onEdit={(e) => { setEditEntry(e); setShowForm(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {journalData?.pages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-white/5">
          <button 
            disabled={page <= 1} 
            onClick={() => setPage(p => p - 1)}
            className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-primary-400 hover:border-primary-400/30 disabled:opacity-20 disabled:hover:text-neutral-400 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
            Page {page} of {journalData.pages}
          </span>
          <button 
            disabled={page >= journalData.pages} 
            onClick={() => setPage(p => p + 1)}
            className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-primary-400 hover:border-primary-400/30 disabled:opacity-20 disabled:hover:text-neutral-400 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
