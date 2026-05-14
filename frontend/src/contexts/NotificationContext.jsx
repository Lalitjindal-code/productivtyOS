import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { XPPop } from '../components/common/XPPop';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [xpGain, setXpGain] = useState({ amount: 0, visible: false });

  const addNotification = useCallback((notification) => {
    const id = uuidv4();
    const newNotification = {
      id,
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const triggerXP = useCallback((amount) => {
    setXpGain({ amount, visible: true });
    setTimeout(() => setXpGain(prev => ({ ...prev, visible: false })), 2000);
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    addNotification,
    triggerXP,
    markAsRead,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <XPPop amount={xpGain.amount} isVisible={xpGain.visible} />
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
