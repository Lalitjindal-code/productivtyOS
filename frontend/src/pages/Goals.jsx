import React, { useState } from 'react';
import { Target, Loader2 } from 'lucide-react';
import { ButtonPrimary } from '../components/common/Button';
import { GoalCard } from '../components/features/goals/GoalCard';
import { GoalModal } from '../components/features/goals/GoalModal';
import { useGoals } from '../hooks/useGoals';

export const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { goals, isLoading, isError } = useGoals();

  const activeGoals = goals.filter(g => g.status !== 'completed');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-neutral-50 flex items-center gap-3">
            <Target className="text-primary-400" size={32} />
            Strategic Goals
          </h1>
          <p className="font-body text-neutral-400 mt-2">
            Establish long-term objectives and break them down into actionable milestones.
          </p>
        </div>
        
        <ButtonPrimary onClick={() => setIsModalOpen(true)} className="shrink-0">
          Establish New Goal
        </ButtonPrimary>
      </div>

      {/* Content */}
      <div className="flex-1">
        {isLoading ? (
          <div className="flex justify-center py-20 text-primary-400">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-400 font-body">
            Failed to load goals. Please try again.
          </div>
        ) : goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-surface/50">
            <Target size={48} className="text-neutral-600 mb-4" />
            <h3 className="font-display font-semibold text-xl text-neutral-200 mb-2">No Goals Set</h3>
            <p className="font-body text-neutral-400 max-w-md mb-6">
              Vision without execution is hallucination. Start by establishing a new high-level goal and defining your milestones.
            </p>
            <ButtonPrimary onClick={() => setIsModalOpen(true)}>
              Establish First Goal
            </ButtonPrimary>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Active Goals Grid */}
            {activeGoals.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-lg text-neutral-300 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                  Active Objectives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeGoals.map(goal => (
                    <GoalCard key={goal._id} goal={goal} />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Goals Grid */}
            {completedGoals.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-lg text-neutral-500 mb-4">
                  Achieved
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {completedGoals.map(goal => (
                    <GoalCard key={goal._id} goal={goal} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <GoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
