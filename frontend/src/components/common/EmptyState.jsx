import React from 'react';
import { motion } from 'framer-motion';

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  color = "primary" 
}) => {
  const colorMap = {
    primary: "text-primary-400 bg-primary-400/10 border-primary-400/20",
    plasma: "text-plasma-400 bg-plasma-400/10 border-plasma-400/20",
    green: "text-green-400 bg-green-400/10 border-green-400/20",
    orange: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  };

  const btnMap = {
    primary: "bg-primary-500 hover:bg-primary-600 shadow-primary-500/20",
    plasma: "bg-plasma-500 hover:bg-plasma-600 shadow-plasma-500/20",
    green: "bg-green-500 hover:bg-green-600 shadow-green-500/20",
    orange: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 border ${colorMap[color]}`}>
        <Icon size={40} strokeWidth={1.5} />
      </div>
      
      <h3 className="font-display font-bold text-xl text-neutral-100 mb-2 tracking-tight uppercase">
        {title}
      </h3>
      
      <p className="font-body text-neutral-500 max-w-sm mb-8 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={`px-6 py-3 rounded-xl font-body font-bold text-sm text-white transition-all shadow-lg hover:scale-105 active:scale-95 ${btnMap[color]}`}
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};
