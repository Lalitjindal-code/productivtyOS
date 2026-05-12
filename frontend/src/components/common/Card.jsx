import React from 'react';

export const Card = ({ children, glow = null, className = '', ...props }) => (
  <div
    className={`
      relative rounded-xl p-5
      bg-surface
      border border-white/10
      ${glow === 'primary' ? 'shadow-[0_0_20px_rgba(255,173,0,0.12)] border-primary-400/20' : ''}
      ${glow === 'secondary' ? 'shadow-[0_0_20px_rgba(0,200,224,0.10)] border-plasma-400/20' : ''}
      transition-all duration-300
      ${className}
    `}
    {...props}
  >
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-xl" />
    {children}
  </div>
);

export const StatCard = ({ label, value, unit = '', icon: Icon, color = 'primary', trend = null }) => {
  const colors = {
    primary: 'bg-primary-400/15 text-primary-400',
    plasma: 'bg-plasma-400/15 text-plasma-400',
    success: 'bg-green-400/15 text-green-400',
    accent: 'bg-void_purple-400/15 text-void_purple-400',
  };

  return (
    <Card className="group hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${colors[color]}`}>
          {Icon && <Icon size={18} />}
        </div>
        {trend !== null && (
          <span className={`text-xs font-mono font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div className="font-mono text-3xl font-bold text-neutral-50 tabular-nums mb-1">
        {value}<span className="text-lg text-neutral-500 ml-1">{unit}</span>
      </div>
      <div className="font-body text-xs text-neutral-500 tracking-wider uppercase">{label}</div>
    </Card>
  );
};

export const GlassCard = ({ children, className = '', ...props }) => (
  <div
    className={`
      relative rounded-2xl p-6
      bg-white/[0.04]
      backdrop-blur-xl
      border border-white/10
      shadow-[0_8px_32px_rgba(0,0,0,0.5)]
      ${className}
    `}
    {...props}
  >
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl" />
    {children}
  </div>
);
