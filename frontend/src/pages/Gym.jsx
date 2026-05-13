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

export const Gym = () => {
  const queryClient = useQueryClient();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const { data: workouts, isLoading } = useQuery({
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

  const muscleData = [
    { subject: 'Chest', A: 80, fullMark: 100 },
    { subject: 'Back', A: 70, fullMark: 100 },
    { subject: 'Shoulders', A: 60, fullMark: 100 },
    { subject: 'Legs', A: 50, fullMark: 100 },
    { subject: 'Arms', A: 85, fullMark: 100 },
    { subject: 'Core', A: 40, fullMark: 100 },
  ];

  if (isLoading) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-lime-500" size={32} />
    </div>
  );

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
                <div className="text-2xl font-black text-white">12.4t</div>
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-tighter">Monthly Vol</div>
              </div>
              <div className="w-px h-8 bg-white/5 mt-2"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-lime-500">14</div>
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
                <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-3xl">
                  <Dumbbell size={48} className="text-neutral-800 mx-auto mb-4" />
                  <p className="text-neutral-500 font-medium italic">No iron has been moved yet.</p>
                </div>
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
            { title: 'Current PR', value: '140kg', sub: 'Deadlift', icon: <Sparkles className="text-yellow-400" /> },
            { title: 'Weekly Volume', value: '3,240kg', sub: '+12% from last week', icon: <TrendingUp className="text-blue-400" /> },
            { title: 'Consistency', value: '4 days', sub: 'Current weekly streak', icon: <Activity className="text-lime-400" /> },
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
