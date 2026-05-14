import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, CheckSquare, 
  Dumbbell, Book, BarChart3, 
  UserCircle 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Home' },
  { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { path: '/gym', icon: Dumbbell, label: 'Gym' },
  { path: '/journal', icon: Book, label: 'Journal' },
  { path: '/analytics', icon: BarChart3, label: 'Brain' },
];

export const MobileNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-white/5 pb-safe">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 min-w-[60px] h-full transition-all relative
              ${isActive ? 'text-primary-400' : 'text-neutral-500 hover:text-neutral-300'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-400 shadow-glow-sm rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
        <NavLink
          to="/rpg"
          className={({ isActive }) => `
            flex flex-col items-center justify-center gap-1 min-w-[60px] h-full transition-all relative
            ${isActive ? 'text-plasma-400' : 'text-neutral-500 hover:text-neutral-300'}
          `}
        >
          {({ isActive }) => (
            <>
              <UserCircle size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-black uppercase tracking-tighter">
                You
              </span>
              {isActive && (
                <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-0.5 bg-plasma-400 shadow-glow-sm rounded-full" />
              )}
            </>
          )}
        </NavLink>
      </nav>
    </div>
  );
};
