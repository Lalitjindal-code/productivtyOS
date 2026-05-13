import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar, Check } from 'lucide-react';
import { getGymPlan, updateGymPlan } from '../../../services/gymService';
import toast from 'react-hot-toast';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WORKOUT_TYPES = [
  'Rest', 'Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core', 'Push', 'Pull', 'Upper Body', 'Lower Body', 'Full Body', 'Cardio'
];

export const GymPlanEditor = ({ isOpen, onClose }) => {
  const [plan, setPlan] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadPlan();
    }
  }, [isOpen]);

  const loadPlan = async () => {
    try {
      const data = await getGymPlan();
      setPlan(data || {});
    } catch (error) {
      toast.error('Failed to load plan');
    }
  };

  const handleUpdate = (day, value) => {
    setPlan({ ...plan, [day]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateGymPlan(plan);
      toast.success('Weekly plan updated!');
      onClose();
    } catch (error) {
      toast.error('Failed to save plan');
    } finally {
      setIsSaving(false);
    }
  };

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
            className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-lime-500/20 text-lime-400 rounded-lg">
                  <Calendar size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Weekly Training Plan</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-500">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {DAYS.map(day => (
                <div key={day} className="flex items-center justify-between gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                  <span className="font-bold text-neutral-400 w-24">{day}</span>
                  <select 
                    value={plan[day] || 'Rest'}
                    onChange={(e) => handleUpdate(day, e.target.value)}
                    className="flex-1 bg-neutral-900 border-none rounded-xl py-2 px-4 text-white text-sm focus:ring-1 ring-lime-500 outline-none appearance-none cursor-pointer"
                  >
                    {WORKOUT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="p-6 bg-neutral-900/50 border-t border-white/5 flex gap-4">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 py-4 bg-lime-500 hover:bg-lime-400 disabled:opacity-50 text-black font-black rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                {isSaving ? <Check className="animate-bounce" /> : <Save size={20} />}
                SAVE WEEKLY SCHEDULE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
