import React from 'react';

export const Badge = ({ label, color = 'default', size = 'md', className = '' }) => {
  const colors = {
    default: 'bg-white/10 text-neutral-300 border-white/20',
    primary: 'bg-primary-400/15 text-primary-400 border-primary-400/30',
    plasma: 'bg-plasma-400/15 text-plasma-400 border-plasma-400/30',
    success: 'bg-green-400/15 text-green-400 border-green-400/30',
    danger: 'bg-red-400/15 text-red-400 border-red-400/30',
    warning: 'bg-amber-400/15 text-amber-400 border-amber-400/30',
    accent: 'bg-void_purple-400/15 text-void_purple-400 border-void_purple-400/30',
  };
  
  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px] rounded',
    md: 'px-2.5 py-1 text-xs rounded-md',
    lg: 'px-3 py-1.5 text-sm rounded-lg',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center gap-1
        font-body font-medium tracking-wide uppercase
        border
        ${colors[color]} ${sizes[size]}
        ${className}
      `}
    >
      {label}
    </span>
  );
};

export const PriorityBadge = ({ priority, className = '' }) => {
  const map = {
    critical: { label: 'CRITICAL', color: 'danger', dot: '●' },
    high: { label: 'HIGH', color: 'warning', dot: '●' },
    medium: { label: 'MEDIUM', color: 'primary', dot: '●' },
    low: { label: 'LOW', color: 'default', dot: '○' },
  };
  
  const config = map[priority] || map.low;
  
  return (
    <Badge 
      label={`${config.dot} ${config.label}`} 
      color={config.color} 
      size="sm" 
      className={className} 
    />
  );
};
