import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { SHORTCUTS } from '../../hooks/useKeyboardShortcuts';

export const ShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/70 backdrop-blur-sm">
      <div className="bg-surface border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-modal animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Keyboard size={20} className="text-primary-400" />
            <h2 className="font-display font-bold text-lg text-neutral-50">Keyboard Shortcuts</h2>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-100 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-2">
          {SHORTCUTS.map(s => (
            <div key={s.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="font-body text-sm text-neutral-300">{s.description}</span>
              <kbd className="bg-elevated border border-white/10 text-neutral-200 font-mono text-xs px-2.5 py-1 rounded-lg">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        <p className="font-body text-xs text-neutral-600 mt-4">Shortcuts are disabled while typing in any input field.</p>
      </div>
    </div>
  );
};
