import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Zap, BarChart3, Loader2 } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { axiosInstance } from '../../../utils/axios'; // Assuming axiosInstance or use axios
import axios from 'axios';
import { format } from 'date-fns';

export const ExerciseStatsModal = ({ isOpen, onClose, exercise }) => {
  const { data: progress, isLoading } = useQuery({
    queryKey: ['exerciseProgress', exercise?._id],
    queryFn: async () => {
      const res = await axios.get(`/api/gym/exercises/${exercise._id}/progress`);
      return res.data;
    },
    enabled: !!exercise && isOpen
  });

  if (!exercise) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* Left Sidebar: Exercise Info */}
            <div className="md:w-1/3 bg-neutral-900/50 p-8 border-r border-white/5 flex flex-col">
              <div className="p-3 bg-lime-500/20 text-lime-400 rounded-2xl w-fit mb-6">
                <BarChart3 size={24} />
              </div>
              <h2 className="text-2xl font-black text-white leading-tight mb-2">{exercise.name}</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-widest mb-8">
                <span className="px-2 py-1 bg-white/5 rounded-md">{exercise.category}</span>
                <span>•</span>
                <span>{exercise.equipment}</span>
              </div>

              <div className="space-y-4 mt-auto">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter mb-1">Estimated 1RM</div>
                  <div className="text-2xl font-black text-white">
                    {progress?.length > 0 ? `${Math.max(...progress.map(p => p.maxWeight))}kg` : '—'}
                  </div>
                </div>
                <div className="p-4 bg-lime-500/10 rounded-2xl border border-lime-500/10">
                  <div className="text-[10px] font-black text-lime-500 uppercase tracking-tighter mb-1">Total Sessions</div>
                  <div className="text-2xl font-black text-white">{progress?.length || 0}</div>
                </div>
              </div>
            </div>

            {/* Right Content: Charts */}
            <div className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={16} className="text-lime-500" /> Performance History
                </h3>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-500">
                  <X size={20} />
                </button>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <Loader2 className="animate-spin text-lime-500" />
                </div>
              ) : progress?.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-neutral-500 gap-4">
                  <Zap size={32} />
                  <p className="font-medium italic">No history logged for this exercise yet.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Max Weight Chart */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-neutral-500">Max Weight (kg)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={progress}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(str) => format(new Date(str), 'MMM d')}
                            tick={{ fill: '#666', fontSize: 10 }}
                          />
                          <YAxis tick={{ fill: '#666', fontSize: 10 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '12px' }}
                            labelFormatter={(str) => format(new Date(str), 'MMMM do, yyyy')}
                          />
                          <Area type="monotone" dataKey="maxWeight" stroke="#84cc16" fill="#84cc16" fillOpacity={0.1} strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Volume Chart */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-neutral-500">Total Volume (kg × reps)</h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={progress}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(str) => format(new Date(str), 'MMM d')}
                            tick={{ fill: '#666', fontSize: 10 }}
                          />
                          <YAxis tick={{ fill: '#666', fontSize: 10 }} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0d0d0d', border: '1px solid #333', borderRadius: '12px' }}
                            labelFormatter={(str) => format(new Date(str), 'MMMM do, yyyy')}
                          />
                          <Area type="monotone" dataKey="volume" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
