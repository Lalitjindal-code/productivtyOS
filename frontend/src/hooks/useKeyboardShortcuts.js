import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Global keyboard shortcuts:
 *   N  → New task (navigate to /tasks)
 *   T  → Timer page
 *   G  → Goals page
 *   J  → Journal page
 *   S  → Settings page
 *   ?  → Show/hide shortcuts modal (handled via callback)
 */
export const useKeyboardShortcuts = ({ onToggleShortcutsModal } = {}) => {
  const navigate = useNavigate();

  const handler = useCallback((e) => {
    // Ignore when user is typing in an input, textarea, or select
    const tag = e.target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key.toLowerCase()) {
      case 'n': navigate('/tasks'); break;
      case 't': navigate('/timer'); break;
      case 'g': navigate('/goals'); break;
      case 'j': navigate('/journal'); break;
      case 's': navigate('/settings'); break;
      case '?':
        if (onToggleShortcutsModal) onToggleShortcutsModal();
        break;
      default: break;
    }
  }, [navigate, onToggleShortcutsModal]);

  useEffect(() => {
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handler]);
};

export const SHORTCUTS = [
  { key: 'N', description: 'Go to Tasks / New Task' },
  { key: 'T', description: 'Go to Timer' },
  { key: 'G', description: 'Go to Goals' },
  { key: 'J', description: 'Go to Journal' },
  { key: 'S', description: 'Go to Settings' },
  { key: '?', description: 'Toggle this shortcuts panel' },
];
