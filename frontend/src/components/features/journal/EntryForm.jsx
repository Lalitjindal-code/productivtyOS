import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Save, X, Hash, MessageSquare, 
  Trophy, AlertCircle, Rocket, Calendar, CheckCircle, Loader2
} from 'lucide-react';
import { MoodSelector } from './MoodSelector';

export const EntryForm = ({ existing, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: { score: 3 },
    achieved: '',
    struggled: '',
    intention: '',
    freeText: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [autoSaveStatus, setAutoSaveStatus] = useState(null); // null | 'saving' | 'saved'
  const autoSaveTimer = useRef(null);
  const isExisting = !!existing?._id;

  useEffect(() => {
    if (existing) {
      setFormData({
        ...existing,
        date: new Date(existing.date).toISOString().split('T')[0]
      });
    }
  }, [existing]);

  // Auto-save: only for existing entries being edited
  const triggerAutoSave = useCallback((data) => {
    if (!isExisting) return;
    clearTimeout(autoSaveTimer.current);
    setAutoSaveStatus('saving');
    autoSaveTimer.current = setTimeout(() => {
      onSave(data);
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus(null), 2000);
    }, 2000);
  }, [isExisting, onSave]);

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(autoSaveTimer.current), []);

  const updateField = (updates) => {
    setFormData(prev => {
      const next = { ...prev, ...updates };
      triggerAutoSave(next);
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(autoSaveTimer.current);
    setAutoSaveStatus(null);
    onSave(formData);
  };

  const addTag = () => {
    const val = tagInput.trim().toLowerCase().replace(/#/g, '');
    if (val && !formData.tags.includes(val)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, val] }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Auto-save indicator */}
      {isExisting && autoSaveStatus && (
        <div className="flex items-center justify-end gap-1.5 text-xs font-body">
          {autoSaveStatus === 'saving' ? (
            <><Loader2 size={12} className="animate-spin text-neutral-500" /><span className="text-neutral-500">Saving...</span></>
          ) : (
            <><CheckCircle size={12} className="text-green-500" /><span className="text-green-500">Saved</span></>
          )}
        </div>
      )}
      {/* Date & Mood Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-xs font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
            <Calendar size={14} /> Date of Reflection
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={e => updateField({ date: e.target.value })}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-neutral-100 font-body text-sm focus:outline-none focus:border-primary-400/50 transition-all"
          />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
            How's your energy?
          </label>
          <MoodSelector 
            value={formData.mood.score} 
            onChange={score => updateField({ mood: { score } })} 
          />
        </div>
      </div>

      {/* Strategic Questions */}
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
            <Trophy size={14} /> Biggest Achievement Today?
          </label>
          <textarea
            value={formData.achieved}
            onChange={e => updateField({ achieved: e.target.value })}
            placeholder="What move did you make that mattered?"
            rows={2}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-neutral-100 font-body text-sm placeholder:text-neutral-700 focus:outline-none focus:border-green-500/30 transition-all resize-none"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-orange-500 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={14} /> Where was the friction?
          </label>
          <textarea
            value={formData.struggled}
            onChange={e => updateField({ struggled: e.target.value })}
            placeholder="What slowed you down or triggered resistance?"
            rows={2}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-neutral-100 font-body text-sm placeholder:text-neutral-700 focus:outline-none focus:border-orange-500/30 transition-all resize-none"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-primary-400 uppercase tracking-widest flex items-center gap-2">
            <Rocket size={14} /> Tomorrow's Primary Intention?
          </label>
          <textarea
            value={formData.intention}
            onChange={e => updateField({ intention: e.target.value })}
            placeholder="What is the one thing that must happen tomorrow?"
            rows={2}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-neutral-100 font-body text-sm placeholder:text-neutral-700 focus:outline-none focus:border-primary-400/30 transition-all resize-none"
          />
        </div>
      </div>

      {/* Deep Reflection */}
      <div className="space-y-3">
        <label className="text-xs font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
          <MessageSquare size={14} /> Deep Reflection (Optional)
        </label>
        <textarea
          value={formData.freeText}
          onChange={e => updateField({ freeText: e.target.value })}
          placeholder="Unfiltered thoughts, patterns, or mental models..."
          rows={5}
          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-neutral-100 font-body text-sm placeholder:text-neutral-700 focus:outline-none focus:border-primary-400/30 transition-all"
        />
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <label className="text-xs font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
          <Hash size={14} /> Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 pl-3 pr-2 py-1 rounded-full bg-primary-400/10 border border-primary-400/20 text-xs font-bold text-primary-400 uppercase tracking-tight">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-white transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}}
            placeholder="Add tag..."
            className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm font-body text-neutral-100 placeholder:text-neutral-700 focus:outline-none focus:border-primary-400/50"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-neutral-400 transition-all"
          >
            Add
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-xl font-body font-bold text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-body font-bold text-sm text-white shadow-glow-sm hover:scale-105 active:scale-95 transition-all"
        >
          <Save size={18} />
          Save Reflection
        </button>
      </div>
    </form>
  );
};
