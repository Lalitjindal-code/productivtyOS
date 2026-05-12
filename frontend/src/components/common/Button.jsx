import React from 'react';

export const ButtonPrimary = ({ children, className = '', ...props }) => (
  <button
    className={`
      relative inline-flex items-center justify-center gap-2
      px-5 py-2.5 rounded-lg
      font-body font-semibold text-sm text-void
      bg-gradient-to-r from-primary-400 to-primary-600
      shadow-[0_0_0_0_rgba(255,173,0,0)]
      hover:shadow-[0_0_20px_rgba(255,173,0,0.40)]
      hover:scale-[1.02]
      active:scale-[0.98]
      transition-all duration-200 ease-out
      overflow-hidden
      before:absolute before:inset-0
      before:bg-white/0 hover:before:bg-white/10
      before:transition-colors before:duration-200
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export const ButtonSecondary = ({ children, className = '', ...props }) => (
  <button
    className={`
      inline-flex items-center justify-center gap-2
      px-5 py-2.5 rounded-lg
      font-body font-medium text-sm text-primary-400
      bg-transparent
      border border-primary-400/30
      hover:border-primary-400/70
      hover:bg-primary-400/10
      hover:shadow-[0_0_12px_rgba(255,173,0,0.20)]
      active:scale-[0.98]
      transition-all duration-200
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export const ButtonGhost = ({ children, className = '', ...props }) => (
  <button
    className={`
      inline-flex items-center justify-center gap-2
      px-4 py-2 rounded-lg
      font-body font-medium text-sm text-neutral-300
      hover:text-neutral-100 hover:bg-white/5
      active:scale-[0.98]
      transition-all duration-150
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export const ButtonDanger = ({ children, className = '', ...props }) => (
  <button
    className={`
      inline-flex items-center justify-center gap-2
      px-5 py-2.5 rounded-lg
      font-body font-semibold text-sm text-white
      bg-gradient-to-r from-danger-500 to-danger-700
      hover:shadow-[0_0_16px_rgba(239,68,68,0.35)]
      hover:scale-[1.02] active:scale-[0.98]
      transition-all duration-200
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export const ButtonIcon = ({ icon: Icon, size = 18, className = '', ...props }) => (
  <button
    className={`
      flex items-center justify-center
      w-9 h-9 rounded-lg
      text-neutral-400 hover:text-neutral-100
      hover:bg-white/10
      active:scale-[0.92]
      transition-all duration-150
      ${className}
    `}
    {...props}
  >
    <Icon size={size} />
  </button>
);
