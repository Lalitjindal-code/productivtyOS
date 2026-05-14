import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, CheckCircle, AlertTriangle, 
  Trophy, Zap, Flame, Trash2 
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { format } from 'date-fns';

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, clearAll } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'level_up': return <Zap className="text-yellow-400" size={18} />;
      case 'achievement': return <Trophy className="text-amber-500" size={18} />;
      case 'streak': return <Flame className="text-orange-500" size={18} />;
      case 'success': return <CheckCircle className="text-green-500" size={18} />;
      case 'error': return <AlertTriangle className="text-red-500" size={18} />;
      default: return <Bell className="text-primary-400" size={18} />;
    }
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-neutral-400 hover:text-neutral-100 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-400 rounded-full shadow-[0_0_8px_rgba(255,173,0,0.8)]"></span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-80 bg-surface border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <h3 className="font-display font-bold text-sm text-neutral-100">Notifications</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={clearAll}
                    className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                    title="Clear All"
                  >
                    <Trash2 size={14} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-neutral-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="mx-auto text-neutral-700 mb-2" size={32} />
                    <p className="text-xs text-neutral-500 font-body italic">Everything is quiet...</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-4 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer group relative ${!n.read ? 'bg-primary-400/5' : ''}`}
                    >
                      {!n.read && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-400" />
                      )}
                      <div className="flex gap-3">
                        <div className="shrink-0 mt-0.5">
                          {getIcon(n.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xs font-bold ${!n.read ? 'text-neutral-100' : 'text-neutral-400'}`}>
                            {n.title}
                          </h4>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                            {n.message}
                          </p>
                          <span className="text-[9px] text-neutral-600 font-mono mt-2 block">
                            {format(n.timestamp, 'HH:mm')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 bg-white/5 text-center border-t border-white/5">
                  <button className="text-[10px] font-bold text-primary-400 hover:text-primary-300 uppercase tracking-widest">
                    View All History
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
