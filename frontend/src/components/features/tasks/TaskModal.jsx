import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../../../hooks/useTasks';
import { useGoals } from '../../../hooks/useGoals';
import { ButtonPrimary, ButtonGhost } from '../../common/Button';

export const TaskModal = ({ isOpen, onClose }) => {
  const { createTask, isCreating } = useTasks();
  const { goals } = useGoals();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'work',
    priority: 'medium',
    estimatedDuration: 30,
    deadline: '',
    goalId: ''
  });

  if (!isOpen) return null;

  const activeGoals = goals?.filter(g => g.status === 'active') || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({
      ...formData,
      goalId: formData.goalId || undefined // Remove if empty string
    }, {
      onSuccess: () => {
        setFormData({ title: '', description: '', category: 'work', priority: 'medium', estimatedDuration: 30, deadline: '', goalId: '' });
        onClose();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface border border-white/10 rounded-2xl shadow-modal overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-elevated/50">
          <h2 className="font-display text-xl font-bold text-neutral-50 tracking-wide">Create New Task</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Task Title <span className="text-primary-400">*</span></label>
            <input 
              type="text" 
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Finalize Q3 Report"
              className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body placeholder:text-neutral-600 focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 transition-all"
            />
          </div>

          <div>
            <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Description (Optional)</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add details, links, or notes..."
              className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body placeholder:text-neutral-600 focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 transition-all resize-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 transition-all appearance-none"
              >
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="gym">Gym</option>
                <option value="personal">Personal</option>
                <option value="creative">Creative</option>
                <option value="finance">Finance</option>
                <option value="health">Health</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Priority</label>
              <select 
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 transition-all appearance-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Deadline</label>
              <input 
                type="datetime-local" name="deadline" value={formData.deadline} onChange={handleChange}
                className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 style-color-scheme-dark"
              />
            </div>
            <div className="flex-1">
              <label className="block font-body text-sm font-medium text-neutral-300 mb-1.5">Link Goal</label>
              <select 
                name="goalId" value={formData.goalId} onChange={handleChange}
                className="w-full bg-base border border-white/10 rounded-lg px-4 py-2.5 text-neutral-100 font-body focus:outline-none focus:border-primary-400/50 focus:ring-1 focus:ring-primary-400/50 appearance-none"
              >
                <option value="">None</option>
                {activeGoals.map(goal => (
                  <option key={goal._id} value={goal._id}>{goal.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <ButtonGhost type="button" onClick={onClose}>Cancel</ButtonGhost>
            <ButtonPrimary type="submit" disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Task'}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};
