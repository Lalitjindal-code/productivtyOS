import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Swords, BookOpen, Cpu, Leaf, 
  Trophy, Heart, Zap, Star,
  Shield, Brain, Sparkles, Compass
} from 'lucide-react';
import { getRPGStatus, selectClass } from '../services/userService';
import toast from 'react-hot-toast';

export const Character = () => {
  const queryClient = useQueryClient();
  const [isSelectingClass, setIsSelectingClass] = useState(false);

  const { data: rpg, isLoading, error } = useQuery({
    queryKey: ['rpg-status'],
    queryFn: getRPGStatus
  });

  const mutation = useMutation({
    mutationFn: selectClass,
    onSuccess: () => {
      queryClient.invalidateQueries(['rpg-status']);
      toast.success('Class selected! Your journey begins.');
      setIsSelectingClass(false);
    },
    onError: () => {
      toast.error('Failed to select class. Try again.');
    }
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen bg-[#0a0a0a]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-12 h-12 text-indigo-500" />
      </motion.div>
    </div>
  );

  if (error) return <div className="p-8 text-red-500">Error loading RPG status.</div>;

  const { character, rpgStats, achievements } = rpg;
  const isNoClass = character.class === 'None';

  const classes = [
    { name: 'Warrior', icon: <Swords />, color: 'from-red-500 to-orange-600', desc: 'Focus on Strength and HP. Perfect for gym goers.' },
    { name: 'Scholar', icon: <BookOpen />, color: 'from-blue-500 to-cyan-600', desc: 'Focus on Intelligence and Wisdom. For the lifelong learners.' },
    { name: 'Cyborg', icon: <Cpu />, color: 'from-purple-500 to-pink-600', desc: 'Balanced Intelligence and Strength. For the tech-driven.' },
    { name: 'Monk', icon: <Leaf />, color: 'from-emerald-500 to-teal-600', desc: 'Focus on Wisdom and Charisma. For the mindful soul.' }
  ];

  const StatBar = ({ label, value, max = 100, icon: Icon, color }) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-neutral-400">
          <Icon size={18} />
          <span className="text-sm font-medium uppercase tracking-wider">{label}</span>
        </div>
        <span className="text-sm font-bold text-white">{value} / {max}</span>
      </div>
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden border border-neutral-700/50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );

  const StatBox = ({ label, value, icon: Icon }) => (
    <div className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl flex flex-col items-center justify-center hover:border-indigo-500/50 transition-colors group">
      <Icon className="w-6 h-6 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
      <span className="text-xs text-neutral-500 font-medium mb-1">{label}</span>
      <span className="text-xl font-bold text-white">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 p-8 pt-24 lg:pt-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-8 bg-neutral-900/30 border border-neutral-800 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        
        {/* Avatar */}
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center text-6xl shadow-2xl shadow-indigo-500/20 group-hover:rotate-3 transition-transform cursor-pointer border-4 border-white/5">
            {character.avatar}
          </div>
          <div className="absolute -bottom-4 -right-4 bg-neutral-800 border-2 border-indigo-500 p-3 rounded-2xl shadow-xl">
            <span className="text-xl font-bold text-indigo-400">LVL {rpgStats.level}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
            {character.class !== 'None' ? character.class : 'The Nameless'}
          </h1>
          <p className="text-neutral-400 mb-6 max-w-lg">
            {character.class !== 'None' 
              ? `You are a legendary ${character.class}. Every task completed forges your destiny.`
              : 'You have not yet chosen your path. Select a class to begin your progression.'}
          </p>
          
          {isNoClass ? (
            <button 
              onClick={() => setIsSelectingClass(true)}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              CHOOSE YOUR PATH
            </button>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <div className="px-4 py-2 bg-neutral-800 rounded-xl border border-neutral-700 text-xs font-bold tracking-widest text-neutral-300">
                LIFETIME XP: {rpg.totalXP}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats & XP */}
        <div className="lg:col-span-7 space-y-8">
          {/* Vitals & XP */}
          <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-3xl">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-400" /> VITALS & PROGRESS
            </h3>
            
            <StatBar 
              label="Experience" 
              value={rpgStats.currentXP} 
              max={rpgStats.nextLevelXP} 
              icon={Star} 
              color="from-indigo-500 to-purple-600"
            />
            
            <StatBar 
              label="Hit Points" 
              value={rpgStats.hp} 
              max={rpgStats.maxHP} 
              icon={Heart} 
              color="from-red-500 to-pink-600"
            />
          </section>

          {/* Stats Grid */}
          <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-3xl">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" /> CHARACTER ATTRIBUTES
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <StatBox label="STRENGTH" value={rpgStats.strength} icon={Swords} />
              <StatBox label="INTEL" value={rpgStats.intelligence} icon={Brain} />
              <StatBox label="CHARISMA" value={rpgStats.charisma} icon={Sparkles} />
              <StatBox label="WISDOM" value={rpgStats.wisdom} icon={Compass} />
              <StatBox label="LUCK" value={rpgStats.luck} icon={Zap} />
            </div>
          </section>
        </div>

        {/* Right Column: Achievements */}
        <div className="lg:col-span-5">
          <section className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-3xl h-full">
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" /> TROPHY ROOM
            </h3>
            
            {achievements.length === 0 ? (
              <div className="text-center py-12 px-4 border-2 border-dashed border-neutral-800 rounded-2xl">
                <Trophy className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
                <p className="text-neutral-500 text-sm">No achievements yet. Keep working to fill your trophy room!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {achievements.map(achievement => (
                  <motion.div 
                    key={achievement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl group hover:border-indigo-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500/20 transition-colors">
                      <Trophy size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{achievement.title}</h4>
                      <p className="text-xs text-neutral-400">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Class Selection Modal */}
      <AnimatePresence>
        {isSelectingClass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSelectingClass(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 p-8 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black mb-2">CHOOSE YOUR DESTINY</h2>
                <p className="text-neutral-400">Select a class to define your growth path and starting stats.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {classes.map(cls => (
                  <button
                    key={cls.name}
                    onClick={() => mutation.mutate(cls.name)}
                    disabled={mutation.isPending}
                    className="p-6 bg-neutral-800/50 border border-neutral-700 rounded-2xl text-left hover:border-white transition-all group active:scale-95 disabled:opacity-50"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${cls.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                      {cls.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-1">{cls.name}</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">{cls.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
