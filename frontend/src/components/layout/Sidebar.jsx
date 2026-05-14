import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Target, 
  Timer, 
  Dumbbell, 
  BookOpen, 
  BarChart2, 
  UserCircle,
  Settings,
  Skull
} from 'lucide-react';
import { useStats } from '../../hooks/useStats';

export const Sidebar = () => {
  const { data: stats, isLoading } = useStats();
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/tasks", icon: CheckSquare, label: "Tasks" },
    { to: "/goals", icon: Target, label: "Goals" },
    { to: "/timer", icon: Timer, label: "Pomodoro" },
    { to: "/gym", icon: Dumbbell, label: "Gym" },
    { to: "/journal", icon: BookOpen, label: "Journal" },
    { to: "/analytics", icon: BarChart2, label: "Analytics" },
    { to: "/rpg", icon: UserCircle, label: "Character" },
    { to: "/settings", icon: Settings, label: "Settings" },
    { to: "/shame", icon: Skull, label: "Wall of Shame" },
  ];

  return (
    <aside className="w-64 fixed left-0 top-0 h-screen bg-surface border-r border-white/10 flex flex-col z-20">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <h1 className="font-display text-xl font-bold tracking-widest text-primary-400 uppercase">
          ProductivityOS
        </h1>
      </div>
      
      <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              font-body font-medium text-sm
              ${isActive 
                ? 'bg-primary-400/10 text-primary-400 border border-primary-400/20 shadow-inner-glow' 
                : 'text-neutral-400 hover:text-neutral-100 hover:bg-white/5 border border-transparent'
              }
            `}
          >
            <item.icon size={20} className="shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-elevated border border-white/5">
          <div className="w-8 h-8 rounded-full bg-void_purple-500/20 flex items-center justify-center text-void_purple-400 font-bold font-display">
            {stats?.character?.avatar || '👤'}
          </div>
          <div>
            <div className="font-body text-sm font-semibold text-neutral-100">
              {isLoading ? '...' : `Level ${stats?.rpgStats?.level ?? 1}`}
            </div>
            <div className="font-body text-xs text-neutral-500">
              {isLoading ? '...' : (stats?.character?.class ?? 'No Class')}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
