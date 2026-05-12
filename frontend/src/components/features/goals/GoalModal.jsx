import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useGoals } from '../../../hooks/useGoals';
import { ButtonPrimary, ButtonGhost } from '../../common/Button';

export const GoalModal = ({ isOpen, onClose }) => {
  const { createGoal, isCreating } = useGoals();
  
  const [formData, setFormData] = useState({
    title: '',
    why: '',
    category: 'career',
    endDate: '',
  });

  const [milestones, setMilestones] = useState([{ title: '', targetDate: '' }]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...milestones];
    newMilestones[index][field] = value;
    setMilestones(newMilestones);
  };

  const addMilestoneField = () => setMilestones([...milestones, { title: '', targetDate: '' }]);
  const removeMilestoneField = (index) => setMilestones(milestones.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clean up empty milestones
    const validMilestones = milestones.filter(m => m.title.trim() !== '');

    createGoal({
      title: formData.title,
      why: formData.why,
      category: formData.category,
      timeline: { end: formData.endDate },
      milestones: validMilestones
    }, {
      onSuccess: () => {
        setFormData({ title: '', why: '', category: 'career', endDate: '' });
        setMilestones([{ title: '', targetDate: '' }]);
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-xl bg-surface border border-white/10 rounded-2xl shadow-modal overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-elevated/50 sticky top-0 z-10">
          <h2 className="font-display text-xl font-bold text-neutral-50 tracking-wide">Establish New Goal</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Core Info */}
          <div>
            <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Goal Title <span className="text-primary-400">*</span></label>
            <input 
              type="text" name="title" required value={formData.title} onChange={handleChange}
              placeholder="e.g., Launch SaaS MVP"
              className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body placeholder:text-neutral-600 focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Your 'Why' (Motivation) <span className="text-primary-400">*</span></label>
            <textarea 
              name="why" required value={formData.why} onChange={handleChange} rows={2}
              placeholder="Why is this important to you? What happens if you achieve it?"
              className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body placeholder:text-neutral-600 focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Category</label>
              <select 
                name="category" value={formData.category} onChange={handleChange}
                className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 appearance-none"
              >
                <option value="career">Career</option>
                <option value="health">Health</option>
                <option value="finance">Finance</option>
                <option value="learning">Learning</option>
                <option value="project">Project</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Target Date <span className="text-primary-400">*</span></label>
              <input 
                type="date" name="endDate" required value={formData.endDate} onChange={handleChange}
                className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 style-color-scheme-dark"
              />
            </div>
          </div>

          {/* Milestones */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <label className="font-body text-sm font-medium text-neutral-300">Milestones (Break it down)</label>
              <button type="button" onClick={addMilestoneField} className="text-xs font-body text-primary-400 flex items-center gap-1 hover:text-primary-300">
                <Plus size={14} /> Add Milestone
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {milestones.map((ms, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <input 
                    type="text" 
                    value={ms.title} 
                    onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                    placeholder={`Milestone ${index + 1}`}
                    className="flex-1 bg-base border border-white/10 rounded-lg px-3 py-2 text-sm text-neutral-100 font-body placeholder:text-neutral-600 focus:outline-none focus:border-primary-400/50"
                  />
                  <input 
                    type="date" 
                    value={ms.targetDate} 
                    onChange={(e) => handleMilestoneChange(index, 'targetDate', e.target.value)}
                    className="w-36 bg-base border border-white/10 rounded-lg px-2 py-2 text-sm text-neutral-100 font-body focus:outline-none focus:border-primary-400/50"
                  />
                  {milestones.length > 1 && (
                    <button type="button" onClick={() => removeMilestoneField(index)} className="p-2 text-neutral-500 hover:text-red-400 mt-0.5">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
            <ButtonGhost type="button" onClick={onClose}>Cancel</ButtonGhost>
            <ButtonPrimary type="submit" disabled={isCreating}>
              {isCreating ? 'Establishing...' : 'Establish Goal'}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};
