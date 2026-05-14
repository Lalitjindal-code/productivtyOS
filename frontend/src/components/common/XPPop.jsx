import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const XPPop = ({ amount, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -40, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed z-[9999] pointer-events-none font-display font-black text-primary-400 text-xl italic"
          style={{ 
            left: '50%', 
            top: '50%', 
            textShadow: '0 0 20px rgba(var(--primary-400-rgb), 0.5)' 
          }}
        >
          +{amount} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
};
