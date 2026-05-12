import React, { useMemo } from 'react';
import {
  Activity, Flame, CheckCircle, Target, Timer, Zap, TrendingUp
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { MainCalendar } from '../components/features/calendar/MainCalendar';
import { useStats } from '../hooks/useStats';
import { useGoals } from '../hooks/useGoals';

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

// ---------- Main Dashboard ----------
export const Dashboard = () => {
  const { stats, isLoading } = useStats();
  const { goals } = useGoals();
  const activeGoals = goals?.filter(g => g.status === 'active')?.length || 0;

  const statCards = [
    {
      title: 'Current Streak',
      value: isLoading ? '—' : `${stats?.streak?.current ?? 0}`,
      unit: 'days',
      icon: <Flame size={20} />,
      sub: `Longest: ${stats?.streak?.longest ?? 0} days`,
      color: 'text-primary-400',
      bg: 'bg-primary-400/10',
    },
    {
      title: 'Tasks Today',
      value: isLoading ? '—' : `${stats?.tasksToday?.completed ?? 0}/${stats?.tasksToday?.total ?? 0}`,
      icon: <CheckCircle size={20} />,
      sub: 'Completed / Total',
      color: 'text-green-400',
      bg: 'bg-green-400/10',
    },
    {
      title: 'Week Completion',
      value: isLoading ? '—' : `${stats?.weekCompletion?.rate ?? 0}%`,
      icon: <TrendingUp size={20} />,
      sub: `${stats?.weekCompletion?.completed ?? 0} of ${stats?.weekCompletion?.total ?? 0} tasks`,
      color: 'text-plasma-400',
      bg: 'bg-plasma-400/10',
    },
    {
      title: 'Pomodoros Today',
      value: isLoading ? '—' : `${stats?.pomodorosToday ?? 0}`,
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
      title: 'Total XP',
      value: isLoading ? '—' : (stats?.totalXP ?? 0),
      icon: <Zap size={20} />,
      sub: 'Lifetime earned',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-neutral-50">Command Center</h1>
        <p className="font-body text-neutral-400 mt-1">Your operational overview at a glance.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((s, i) => (
          <Card key={i} className="p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-body text-xs font-medium text-neutral-500">{s.title}</span>
              <div className={`${s.bg} ${s.color} p-1.5 rounded-lg`}>{s.icon}</div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-2xl text-neutral-50">{s.value}</span>
                {s.unit && <span className="font-body text-xs text-neutral-500">{s.unit}</span>}
              </div>
              <p className="font-body text-xs text-neutral-600 mt-0.5">{s.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts + Calendar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar — takes 2 cols */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="p-5">
            <h2 className="font-display font-semibold text-lg text-neutral-50 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-primary-400" /> Master Calendar
            </h2>
            <MainCalendar />
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="font-display font-semibold text-base text-neutral-50 mb-4">Weekly Completions</h2>
            <WeeklyBarChart weeklyChart={stats?.weeklyChart} />
          </Card>

          <Card className="p-5">
            <h2 className="font-display font-semibold text-base text-neutral-50 mb-4">Category Breakdown</h2>
            <CategoryBreakdown breakdown={stats?.categoryBreakdown} />
          </Card>
        </div>
      </div>

      {/* Activity Heatmap */}
      <Card className="p-5">
        <h2 className="font-display font-semibold text-base text-neutral-50 mb-4 flex items-center gap-2">
          <Flame size={16} className="text-primary-400" /> Activity — Last 90 Days
        </h2>
        <ActivityHeatmap heatmapData={stats?.heatmapData} />
      </Card>
    </div>
  );
};
