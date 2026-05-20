import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Dumbbell, Play, History, Activity, 
  TrendingUp, Calendar, ArrowRight, Loader2, Sparkles 
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip 
} from 'recharts';
import { getWorkouts, getGymPlan, getExercises } from '../services/gymService';
import { WorkoutLogger } from '../components/features/gym/WorkoutLogger';
import { GymPlanEditor } from '../components/features/gym/GymPlanEditor';
import { ExerciseStatsModal } from '../components/features/gym/ExerciseStatsModal';
import { format } from 'date-fns';
import { EmptyState } from '../components/common/EmptyState';

export const Gym = () => {
  const queryClient = useQueryClient();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const { data: workouts, isLoading: isWorkoutsLoading } = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts
  });

  const { data: plan } = useQuery({
    queryKey: ['gymPlan'],
    queryFn: getGymPlan
  });

  const { data: allExercises } = useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises
  });

  const today = format(new Date(), 'EEEE');
  const todayTarget = plan ? plan[today] : 'Rest';

  // Dynamic calculations:
  const getMuscleData = () => {
    const categories = { Chest: 0, Back: 0, Shoulders: 0, Legs: 0, Arms: 0, Core: 0 };
    if (workouts && Array.isArray(workouts)) {
      workouts.forEach(w => {
        w.exercises?.forEach(ex => {
          const fullEx = allExercises?.find(e => e._id === ex.exerciseId || e.name === ex.name);
          const cat = fullEx?.category || 'Chest';
          if (categories[cat] !== undefined) {
            categories[cat] += ex.sets?.length || 0;
          }
        });
      });
    }
    const maxVal = Math.max(...Object.values(categories), 10);
    return Object.entries(categories).map(([subject, val]) => ({
      subject,
      A: Math.round((val / maxVal) * 100),
      fullMark: 100
    }));
  };

  const getMonthlyVolume = () => {
    if (!workouts || !Array.isArray(workouts)) return '0.0kg';
    const now = new Date();
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();
    const vol = workouts
      .filter(w => {
        const d = new Date(w.date);
        return d.getMonth() === curMonth && d.getFullYear() === curYear;
      })
      .reduce((acc, curr) => acc + (curr.totalVolume || 0), 0);
    return vol >= 1000 ? `${(vol / 1000).toFixed(1)}t` : `${vol}kg`;
  };

  const getMonthlySessions = () => {
    if (!workouts || !Array.isArray(workouts)) return 0;
    const now = new Date();
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();
    return workouts.filter(w => {
      const d = new Date(w.date);
      return d.getMonth() === curMonth && d.getFullYear() === curYear;
    }).length;
  };

  const getMaxWeightPR = () => {
    if (!workouts || !Array.isArray(workouts)) return { value: '0kg', sub: 'No lifts yet' };
    let maxWeight = 0;
    let maxExercise = 'No lifts yet';
    workouts.forEach(w => {
      w.exercises?.forEach(ex => {
        ex.sets?.forEach(s => {
          if (s.weight > maxWeight) {
            maxWeight = s.weight;
            maxExercise = ex.name || 'Lift';
          }
        });
      });
    });
    return { value: `${maxWeight}kg`, sub: maxExercise };
  };

  const getWeeklyVolume = () => {
    if (!workouts || !Array.isArray(workouts)) return { value: '0kg', sub: 'No lifts this week' };
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const thisWeekVol = workouts
      .filter(w => new Date(w.date) >= sevenDaysAgo)
      .reduce((acc, curr) => acc + (curr.totalVolume || 0), 0);

    const lastWeekVol = workouts
      .filter(w => {
        const d = new Date(w.date);
        return d >= fourteenDaysAgo && d < sevenDaysAgo;
      })
      .reduce((acc, curr) => acc + (curr.totalVolume || 0), 0);

    let subText = 'First week of lifting';
    if (lastWeekVol > 0) {
      const diff = ((thisWeekVol - lastWeekVol) / lastWeekVol) * 100;
      subText = `${diff >= 0 ? '+' : ''}${diff.toFixed(0)}% from last week`;
    }
    return {
      value: thisWeekVol >= 1000 ? `${(thisWeekVol / 1000).toFixed(1)}t` : `${thisWeekVol}kg`,
      sub: subText
    };
  };

  const getConsistency = () => {
    if (!workouts || !Array.isArray(workouts)) return { value: '0 days', sub: 'Weekly streak' };
    const dates = workouts.map(w => {
      const d = new Date(w.date);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    });
    const uniqueDates = [...new Set(dates)].sort((a, b) => b - a);

    let streak = 0;
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    let checkDate = todayMidnight.getTime();
    if (!uniqueDates.includes(checkDate)) {
      const yesterday = new Date(todayMidnight);
      yesterday.setDate(yesterday.getDate() - 1);
      checkDate = yesterday.getTime();
    }

    while (uniqueDates.includes(checkDate)) {
      streak++;
      const nextCheck = new Date(checkDate);
      nextCheck.setDate(nextCheck.getDate() - 1);
      checkDate = nextCheck.getTime();
    }
    return {
      value: `${streak} Day${streak !== 1 ? 's' : ''}`,
      sub: streak > 0 ? 'Active workout streak' : 'Log a workout today'
    };
  };

  if (isWorkoutsLoading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-lime-500" size={32} />
    </div>
  );

  const muscleData = getMuscleData();
  const monthlyVol = getMonthlyVolume();
  const monthlySessions = getMonthlySessions();
  const maxWeightPR = getMaxWeightPR();
  const weeklyVol = getWeeklyVolume();
  const consistency = getConsistency();

  return (
    <div className="h-full overflow-y-auto px-6 py-8 custom-scrollbar">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black text-white flex items-center gap-3">
              <Dumbbell className="text-lime-500" size={36} />
              Hypertrophy Center
            </h1>
            <p className="text-neutral-500 mt-2 font-medium flex items-center gap-2">
              Today's Target: <span className="text-lime-400 font-bold uppercase tracking-widest">{todayTarget}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPlanOpen(true)}
              className="p-4 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-2xl transition-all border border-white/5"
              title="Edit Weekly Schedule"
            >
              <Calendar size={24} />
            </button>
            <button 
              onClick={() => setIsLoggerOpen(true)}
              className="group relative px-8 py-4 bg-lime-500 hover:bg-lime-400 text-black font-black rounded-2xl transition-all shadow-xl shadow-lime-500/20 flex items-center gap-3 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              <Play size={20} fill="black" />
              START NEW SESSION
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Radar Chart: Muscle Balance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 bg-neutral-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Activity size={120} />
            </div>
            <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <TrendingUp size={16} className="text-lime-500" /> Muscle Group Balance
            </h3>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={muscleData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} />
                  <Radar
                    name="Muscle Level"
                    dataKey="A"
                    stroke="#84cc16"
                    fill="#84cc16"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex justify-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-black text-white">{monthlyVol}</div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">Monthly Vol</div>
              </div>
              <div className="w-px h-8 bg-white/5 mt-2"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-lime-500">{monthlySessions}</div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">Sessions</div>
              </div>
            </div>
          </motion.div>

          {/* Training Volume Area Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-12 bg-neutral-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl"
          >
            <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Activity size={16} className="text-lime-500" /> Progressive Overload (Total Volume)
            </h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={Array.isArray(workouts) && workouts.length > 0 ? [...workouts].reverse() : [{ totalVolume: 0 }]}>
                  <defs>
                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#84cc16', fontWeight: 'bold' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalVolume" 
                    stroke="#84cc16" 
                    fillOpacity={1} 
                    fill="url(#colorVol)" 
                    strokeWidth={3}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent History */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-neutral-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <History size={16} className="text-lime-500" /> Training Log
              </h3>
              <button className="text-xs font-bold text-lime-500 hover:text-white transition-colors">VIEW ALL HISTORY</button>
            </div>

            <div className="space-y-4">
              {(!Array.isArray(workouts) || workouts.length === 0) ? (
                <EmptyState
                  icon={Dumbbell}
                  title="Iron Void"
                  description="No iron has been moved yet. Start your first session to begin your transformation."
                  actionLabel="Start New Session"
                  onAction={() => setIsLoggerOpen(true)}
                  color="green"
                />
              ) : (
                workouts.slice(0, 4).map(workout => (
                  <div key={workout._id} className="group flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-lime-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center text-lime-500 group-hover:scale-110 transition-transform">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-lime-400 transition-colors">
                          {workout.name}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium">
                          {workout.date ? format(new Date(workout.date), 'MMMM do') : 'Unknown Date'} | {workout.exercises?.length || 0} Exercises
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-white font-mono">{workout.totalVolume}kg</div>
                      <div className="text-[10px] font-bold text-lime-500 uppercase tracking-tighter">+{workout.xpEarned} XP</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Current PR', value: maxWeightPR.value, sub: maxWeightPR.sub, icon: <Sparkles className="text-yellow-400" /> },
            { title: 'Weekly Volume', value: weeklyVol.value, sub: weeklyVol.sub, icon: <TrendingUp className="text-blue-400" /> },
            { title: 'Consistency', value: consistency.value, sub: consistency.sub, icon: <Activity className="text-lime-400" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="p-6 bg-neutral-900/50 border border-white/5 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg">{stat.icon}</div>
                <span className="text-xs font-black text-neutral-500 uppercase tracking-widest">{stat.title}</span>
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs font-medium text-neutral-400">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Exercise Library / PR Board */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={16} className="text-lime-500" /> Exercise Library
            </h3>
            <div className="flex gap-2">
              {['All', 'Chest', 'Back', 'Legs', 'Shoulders'].map(cat => (
                <button key={cat} className="px-3 py-1 bg-white/5 hover:bg-lime-500/10 hover:text-lime-400 rounded-lg text-[10px] font-bold text-neutral-500 transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allExercises?.slice(0, 12).map(ex => (
              <button 
                key={ex._id}
                onClick={() => setSelectedExercise(ex)}
                className="group p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-lime-500/30 hover:bg-lime-500/5 transition-all text-left"
              >
                <div className="text-xs font-bold text-white group-hover:text-lime-400 transition-colors mb-1 truncate">
                  {ex.name}
                </div>
                <div className="text-[10px] font-medium text-neutral-600 uppercase tracking-tighter">
                  {ex.category}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

      </div>

      <WorkoutLogger 
        isOpen={isLoggerOpen} 
        onClose={() => setIsLoggerOpen(false)} 
        onComplete={() => queryClient.invalidateQueries(['workouts'])}
      />

      <GymPlanEditor 
        isOpen={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
      />

      <ExerciseStatsModal 
        isOpen={!!selectedExercise}
        onClose={() => setSelectedExercise(null)}
        exercise={selectedExercise}
      />
    </div>
  );
};
