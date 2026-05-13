import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Trash2, Save, Play, 
  Timer, ChevronRight, Search, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getExercises, logWorkout } from '../../../services/gymService';
import toast from 'react-hot-toast';

export const WorkoutLogger = ({ isOpen, onClose, onComplete }) => {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [restTimer, setRestTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (isOpen) {
      loadExercises();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (restTimer && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setRestTimer(false);
      toast('Rest over! Get to work.', { icon: '💪' });
    }
    return () => clearInterval(interval);
  }, [restTimer, timeLeft]);

  const loadExercises = async () => {
    try {
      const data = await getExercises();
      setExercises(data);
    } catch (error) {
      toast.error('Failed to load exercises');
    }
  };

  const addExercise = (ex) => {
    setSelectedExercises([
      ...selectedExercises,
      { 
        ...ex, 
        exerciseId: ex._id,
        sets: [{ reps: 10, weight: 0, completed: false }] 
      }
    ]);
    setIsSearching(false);
    setSearch('');
  };

  const addSet = (exIndex) => {
    const updated = [...selectedExercises];
    const lastSet = updated[exIndex].sets[updated[exIndex].sets.length - 1];
    updated[exIndex].sets.push({ 
      reps: lastSet.reps, 
      weight: lastSet.weight, 
      completed: false 
    });
    setSelectedExercises(updated);
  };

  const updateSet = (exIndex, setIndex, field, value) => {
    const updated = [...selectedExercises];
    updated[exIndex].sets[setIndex][field] = value;
    setSelectedExercises(updated);
  };

  const toggleSet = (exIndex, setIndex) => {
    const updated = [...selectedExercises];
    const isNowCompleted = !updated[exIndex].sets[setIndex].completed;
    updated[exIndex].sets[setIndex].completed = isNowCompleted;
    setSelectedExercises(updated);

    if (isNowCompleted) {
      startRest(60);
    }
  };

  const removeExercise = (index) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const startRest = (seconds) => {
    setTimeLeft(seconds);
    setRestTimer(true);
  };

  const handleSave = async () => {
    if (selectedExercises.length === 0) {
      return toast.error('Add at least one exercise');
    }

    try {
      const payload = {
        exercises: selectedExercises.map(ex => ({
          exerciseId: ex.exerciseId,
          name: ex.name,
          sets: ex.sets.filter(s => s.completed)
        }))
      };

      if (payload.exercises.every(ex => ex.sets.length === 0)) {
        return toast.error('Log at least one completed set');
      }

      await logWorkout(payload);
      toast.success('Workout logged! Strength +1');
      onComplete();
      onClose();
    } catch (error) {
      toast.error('Failed to save workout');
    }
  };

  const filteredExercises = (Array.isArray(exercises) ? exercises : []).filter(ex => 
    ex.name?.toLowerCase().includes(search.toLowerCase()) ||
    ex.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl h-[90vh] bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-neutral-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-lime-500/20 text-lime-400 rounded-lg">
                  <Play size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Active Session</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-500">
                <X size={20} />
              </button>
            </div>

            {/* Rest Timer Banner */}
            {restTimer && (
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                className="bg-lime-500 text-black px-6 py-2 flex items-center justify-between font-bold overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <Timer size={16} />
                  <span>REST TIMER ACTIVE</span>
                </div>
                <span className="font-mono text-xl">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </motion.div>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {selectedExercises.map((ex, exIdx) => (
                <div key={exIdx} className="bg-white/5 border border-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lime-400">{ex.name}</h3>
                    <button onClick={() => removeExercise(exIdx)} className="text-neutral-600 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-2">
                      <div className="col-span-2">Set</div>
                      <div className="col-span-4 text-center">Weight (kg)</div>
                      <div className="col-span-4 text-center">Reps</div>
                      <div className="col-span-2"></div>
                    </div>

                    {ex.sets.map((set, setIdx) => (
                      <div key={setIdx} className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl transition-colors ${set.completed ? 'bg-lime-500/10' : 'hover:bg-white/5'}`}>
                        <div className="col-span-2 text-sm font-mono text-neutral-400">{setIdx + 1}</div>
                        <div className="col-span-4">
                          <input 
                            type="number" 
                            value={set.weight}
                            onChange={(e) => updateSet(exIdx, setIdx, 'weight', parseFloat(e.target.value))}
                            className="w-full bg-neutral-800 border-none rounded-lg p-2 text-center text-sm font-mono text-white focus:ring-1 ring-lime-500"
                          />
                        </div>
                        <div className="col-span-4">
                          <input 
                            type="number" 
                            value={set.reps}
                            onChange={(e) => updateSet(exIdx, setIdx, 'reps', parseInt(e.target.value))}
                            className="w-full bg-neutral-800 border-none rounded-lg p-2 text-center text-sm font-mono text-white focus:ring-1 ring-lime-500"
                          />
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <button 
                            onClick={() => toggleSet(exIdx, setIdx)}
                            className={`p-2 rounded-lg transition-all ${set.completed ? 'bg-lime-500 text-black' : 'bg-neutral-800 text-neutral-600'}`}
                          >
                            <CheckCircle2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => addSet(exIdx)}
                      className="w-full py-2 mt-2 border border-dashed border-white/10 rounded-xl text-xs text-neutral-500 hover:text-white hover:border-white/20 transition-all"
                    >
                      + Add Set
                    </button>
                  </div>
                </div>
              ))}

              <button 
                onClick={() => setIsSearching(true)}
                className="w-full py-8 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 text-neutral-500 hover:text-lime-400 hover:border-lime-500/20 hover:bg-lime-500/5 transition-all group"
              >
                <div className="p-3 bg-neutral-900 rounded-2xl group-hover:bg-lime-500 group-hover:text-black transition-all">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-sm">Add Exercise</span>
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 bg-neutral-900/80 border-t border-white/5 flex gap-4">
              <button 
                onClick={handleSave}
                className="flex-1 py-4 bg-lime-500 hover:bg-lime-400 text-black font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/10 active:scale-95"
              >
                <Save size={20} />
                FINISH WORKOUT
              </button>
            </div>

            {/* Exercise Search Overlay */}
            <AnimatePresence>
              {isSearching && (
                <motion.div 
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  className="absolute inset-0 bg-[#0d0d0d] z-20 flex flex-col"
                >
                  <div className="p-6 border-b border-white/5 flex items-center gap-4">
                    <button onClick={() => setIsSearching(false)} className="p-2 hover:bg-white/5 rounded-full text-neutral-400">
                      <X size={20} />
                    </button>
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <input 
                        autoFocus
                        type="text" 
                        placeholder="Search exercises or muscle groups..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-neutral-900 border-none rounded-2xl py-3 pl-10 pr-4 text-white focus:ring-1 ring-lime-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div className="grid grid-cols-1 gap-2">
                      {filteredExercises.map(ex => (
                        <button 
                          key={ex._id}
                          onClick={() => addExercise(ex)}
                          className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-left group"
                        >
                          <div>
                            <div className="font-bold text-white group-hover:text-lime-400 transition-colors">{ex.name}</div>
                            <div className="text-xs text-neutral-500">{ex.category} • {ex.equipment}</div>
                          </div>
                          <ChevronRight size={18} className="text-neutral-700 group-hover:text-lime-400 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
