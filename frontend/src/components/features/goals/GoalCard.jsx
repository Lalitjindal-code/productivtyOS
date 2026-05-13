import React from 'react';
import { Target, Calendar, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { useGoals } from '../../../hooks/useGoals';
import { format } from 'date-fns';

export const GoalCard = ({ goal }) => {
  const { toggleMilestone, deleteGoal } = useGoals();

  const totalMilestones = goal.milestones?.length || 0;
  const completedMilestones = goal.milestones?.filter(m => m.completed).length || 0;
  const progressPercent = totalMilestones === 0 ? 0 : Math.round((completedMilestones / totalMilestones) * 100);

  const isCompleted = goal.status === 'completed';

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 ${isCompleted ? 'opacity-70' : ''}`}
      glow={isCompleted ? 'secondary' : null}
    >
      {/* Background Progress Bar */}
      <div 
        className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out ${isCompleted ? 'bg-plasma-400' : 'bg-primary-400'}`}
        style={{ width: `${progressPercent}%` }}
      />

      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isCompleted ? 'bg-plasma-400/20 text-plasma-400' : 'bg-primary-400/20 text-primary-400'}`}>
            <Target size={20} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-neutral-50">{goal.title}</h3>
            <Badge label={goal.category} size="sm" className="mt-1" />
          </div>
        </div>
        
        <button 
          onClick={() => deleteGoal(goal._id)}
          className="text-neutral-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mb-4">
        <p className="font-body text-sm text-neutral-300 italic border-l-2 border-white/10 pl-3">
          "{goal.why}"
        </p>
      </div>

      {/* Boss Battle Section */}
      {!isCompleted && goal.boss && (
        <div className="mb-6 p-3 rounded-xl bg-neutral-900/50 border border-white/5 relative overflow-hidden group/boss">
          <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12 group-hover/boss:scale-175 group-hover/boss:rotate-0 transition-transform">
            <span className="text-4xl">{goal.boss.avatar}</span>
          </div>
          
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <span className="text-2xl animate-bounce-slow">{goal.boss.avatar}</span>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-1">
                <h4 className="text-xs font-display font-bold text-neutral-400 uppercase tracking-wider">Boss: {goal.boss.name}</h4>
                <span className="text-[10px] font-mono text-red-400 font-bold">{goal.boss.hp}/{goal.boss.maxHP} HP</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                  style={{ width: `${(goal.boss.hp / goal.boss.maxHP) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Calendar size={12} />
          <span>Target: {format(new Date(goal.timeline.end), 'MMM d, yyyy')}</span>
        </div>
        <div className="font-mono text-sm font-bold text-neutral-200">
          {progressPercent}% <span className="text-neutral-500 text-xs font-medium">COMPLETED</span>
        </div>
      </div>

      {/* Milestones */}
      {totalMilestones > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
          {goal.milestones.map(milestone => (
            <div 
              key={milestone._id}
              onClick={() => toggleMilestone({ goalId: goal._id, milestoneId: milestone._id })}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group/ms"
            >
              <div className={`transition-colors ${milestone.completed ? 'text-plasma-400' : 'text-neutral-500 group-hover/ms:text-neutral-400'}`}>
                {milestone.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              </div>
              <span className={`font-body text-sm flex-1 ${milestone.completed ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>
                {milestone.title}
              </span>
              {milestone.targetDate && (
                <span className="text-xs font-mono text-neutral-500">
                  {format(new Date(milestone.targetDate), 'MMM d')}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
