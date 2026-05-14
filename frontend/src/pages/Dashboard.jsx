import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Activity, Flame, CheckCircle, Target, Timer, Zap, TrendingUp, Loader2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import api from '../services/api';
import { Card } from '../components/common/Card';
import { MainCalendar } from '../components/features/calendar/MainCalendar';
import { useStats } from '../hooks/useStats';
import { useGoals } from '../hooks/useGoals';
import { StatsSkeleton, ChartSkeleton } from '../components/common/Skeleton';
import { Skeleton } from '../components/common/Skeleton';

// ---------- Activity Heatmap ----------
const ActivityHeatmap = ({ heatmapData = [] }) => {
  const days = 90;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dataMap = useMemo(() => {
    const m = {};
    heatmapData.forEach(({ date, count }) => { m[date] = count; });
    return m;
  }, [heatmapData]);

  const cells = useMemo(() => {
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (days - 1 - i));
      const key = d.toISOString().split('T')[0];
      const count = dataMap[key] || 0;
      return { key, count, label: `${key}: ${count} task${count !== 1 ? 's' : ''}` };
    });
  }, [dataMap, today]);

  const getColor = (count) => {
    if (count === 0) return 'bg-white/5';
    if (count === 1) return 'bg-primary-400/30';
    if (count === 2) return 'bg-primary-400/55';
    if (count === 3) return 'bg-primary-400/75';
    return 'bg-primary-400';
  };

  return (
    <div>
      <div className="flex gap-1 flex-wrap">
        {cells.map(cell => (
          <div
            key={cell.key}
            title={cell.label}
            className={`w-3 h-3 rounded-sm ${getColor(cell.count)} transition-colors hover:ring-1 hover:ring-primary-400/50 cursor-default`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="font-body text-xs text-neutral-600">Less</span>
        {['bg-white/5', 'bg-primary-400/30', 'bg-primary-400/55', 'bg-primary-400/75', 'bg-primary-400'].map(c => (
          <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span className="font-body text-xs text-neutral-600">More</span>
      </div>
    </div>
  );
};

// ---------- Weekly Bar Chart ----------
const WeeklyBarChart = ({ weeklyChart = [] }) => {
  const max = Math.max(...weeklyChart.map(d => d.count), 1);
  return (
    <div className="flex items-end gap-2 h-20">
      {weeklyChart.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex items-end justify-center" style={{ height: '64px' }}>
            <div
              className="w-full bg-primary-400/60 hover:bg-primary-400 rounded-t transition-all duration-300"
              style={{ height: `${Math.max((d.count / max) * 100, 4)}%` }}
              title={`${d.label}: ${d.count}`}
            />
          </div>
          <span className="font-mono text-[10px] text-neutral-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ---------- Category Breakdown ----------
const CategoryBreakdown = ({ breakdown = {} }) => {
  const entries = Object.entries(breakdown);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  const colors = ['bg-primary-400', 'bg-plasma-400', 'bg-purple-400', 'bg-green-400', 'bg-rose-400', 'bg-orange-400', 'bg-blue-400'];
  if (total === 0) return <p className="font-body text-sm text-neutral-500">No data this week yet.</p>;

  return (
    <div className="space-y-2.5">
      {entries.map(([cat, count], i) => (
        <div key={cat}>
          <div className="flex justify-between mb-1">
            <span className="font-body text-xs text-neutral-400 capitalize">{cat}</span>
            <span className="font-mono text-xs text-neutral-300">{count}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className={`h-full ${colors[i % colors.length]} rounded-full transition-all duration-500`}
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- Status Feed ----------
const StatusFeed = () => {
  const { data: feed, isLoading } = useQuery({
    queryKey: ['activity-feed'],
    queryFn: async () => {
      const res = await api.get('/user/feed');
      return res.data;
    }
  });

  if (isLoading) return <div className="flex justify-center py-10"><Loader2 className="animate-spin text-neutral-600" size={24} /></div>;
  if (!feed?.length) return <p className="text-neutral-500 text-sm text-center py-10 italic">No recent activity logged.</p>;

  return (
    <div className="space-y-4">
      {feed.map((item, i) => (
        <div key={i} className="flex gap-4 group">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-lg bg-surface border border-white/5 flex items-center justify-center text-base shadow-glow-sm relative z-10 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            {i < feed.length - 1 && <div className="w-0.5 flex-1 bg-white/5 my-1" />}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-display font-bold text-sm text-neutral-100">{item.title}</h4>
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-tighter">
                {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- Main Dashboard ----------
export const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { goals } = useGoals();
  const activeGoals = goals?.filter(g => g.status === 'active')?.length || 0;

  if (statsLoading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <Skeleton className="w-48 h-8 mb-2" />
            <Skeleton className="w-64 h-4" />
          </div>
        </div>
        <StatsSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
          <div className="space-y-8">
            <ChartSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Current Streak',
      value: `${stats?.streak?.current ?? 0}`,
      unit: 'days',
      icon: <Flame size={20} />,
      sub: `Longest: ${stats?.streak?.longest ?? 0} days`,
      color: 'text-primary-400',
      bg: 'bg-primary-400/10',
    },
    {
      title: 'Tasks Today',
      value: `${stats?.tasksToday?.completed ?? 0}/${stats?.tasksToday?.total ?? 0}`,
      icon: <CheckCircle size={20} />,
      sub: 'Completed / Total',
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      title: 'Week Completion',
      value: `${stats?.weekCompletion?.rate ?? 0}%`,
      icon: <TrendingUp size={20} />,
      sub: `${stats?.weekCompletion?.completed ?? 0} of ${stats?.weekCompletion?.total ?? 0} tasks`,
      color: 'text-plasma-400',
      bg: 'bg-plasma-400/10',
    },
    {
      title: 'Pomodoros Today',
      value: `${stats?.pomodorosToday ?? 0}`,
      icon: <Timer size={20} />,
      sub: 'Focus sessions',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
    },
    {
      title: 'Active Goals',
      value: activeGoals,
      icon: <Target size={20} />,
      sub: 'In progress',
      color: 'text-orange-400',
      bg: 'bg-orange-400/10',
    },
    {
      title: 'RPG Level',
      value: `LVL ${stats?.rpgStats?.level ?? 1}`,
      icon: <Zap size={20} />,
      sub: `${stats?.character?.class ?? 'None'} Class`,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display font-bold text-3xl text-neutral-50 tracking-tight">Command Center</h1>
          <p className="font-body text-neutral-400 mt-1">Operational overview of your productivity life.</p>
        </div>
        <div className="hidden sm:block text-right">
          <div className="flex items-center gap-6">
            {/* HP Bar */}
            <div className="text-right">
              <div className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1 flex justify-between">
                <span>Vitality</span>
                <span>{stats?.rpgStats?.hp} HP</span>
              </div>
              <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-pink-600 shadow-glow-sm" 
                  style={{ width: `${(stats?.rpgStats?.hp / stats?.rpgStats?.maxHP) * 100}%` }} 
                />
              </div>
            </div>
            
            {/* XP Bar */}
            <div className="text-right">
              <div className="text-[9px] font-black text-primary-400 uppercase tracking-widest mb-1 flex justify-between">
                <span>Experience</span>
                <span>LVL {stats?.rpgStats?.level}</span>
              </div>
              <div className="h-1.5 w-40 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-glow-sm" 
                  style={{ width: `${(stats?.rpgStats?.currentXP / stats?.rpgStats?.nextLevelXP) * 100}%` }} 
                />
              </div>
            </div>

            <div className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-2xl shadow-glow-sm hover:scale-110 transition-transform cursor-pointer">
              {stats?.character?.avatar}
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((s, i) => (
          <Card key={i} className="p-4 flex flex-col gap-3 group hover:border-white/20 transition-all">
            <div className="flex justify-between items-center">
              <span className="font-body text-[10px] font-black text-neutral-500 uppercase tracking-widest">{s.title}</span>
              <div className={`${s.bg} ${s.color} p-1.5 rounded-lg group-hover:scale-110 transition-transform`}>{s.icon}</div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl text-neutral-50 tracking-tight">{s.value}</span>
                {s.unit && <span className="font-body text-xs text-neutral-600">{s.unit}</span>}
              </div>
              <p className="font-body text-[10px] text-neutral-600 mt-0.5 font-medium uppercase tracking-tighter">{s.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts + Status Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content — Calendar */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-lg text-neutral-50 flex items-center gap-2">
                <Activity size={18} className="text-primary-400" /> Operational Calendar
              </h2>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <div className="w-2 h-2 rounded-full bg-primary-500/50" />
                <div className="w-2 h-2 rounded-full bg-plasma-500/50" />
              </div>
            </div>
            <MainCalendar />
          </Card>
        </div>

        {/* Right column — Status Feed + Analytics */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-display font-bold text-sm text-neutral-200 mb-6 uppercase tracking-widest flex items-center gap-2">
              <Activity size={14} className="text-primary-400" /> Status Feed
            </h2>
            <StatusFeed />
          </Card>

          <Card className="p-5">
            <h2 className="font-display font-semibold text-xs text-neutral-500 mb-4 uppercase tracking-widest">Performance Metrics</h2>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-3 block text-center">Weekly Completion</span>
                <WeeklyBarChart weeklyChart={stats?.weeklyChart} />
              </div>
              <div className="pt-6 border-t border-white/5">
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-3 block text-center">Category Breakdown</span>
                <CategoryBreakdown breakdown={stats?.categoryBreakdown} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Activity Heatmap */}
      <Card className="p-6 bg-gradient-to-r from-surface to-elevated">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-semibold text-base text-neutral-50 flex items-center gap-2">
            <Flame size={16} className="text-primary-400" /> Strategic Momentum — 90 Day Heatmap
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Total Ops: {stats?.heatmapData?.reduce((s, d) => s + d.count, 0) || 0}</div>
          </div>
        </div>
        <ActivityHeatmap heatmapData={stats?.heatmapData} />
      </Card>
    </div>
  );
};
