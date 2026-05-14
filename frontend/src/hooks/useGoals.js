import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { goalService } from '../services/goalService';
import { useNotifications } from '../contexts/NotificationContext';

export const useGoals = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  const query = useQuery({
    queryKey: ['goals'],
    queryFn: goalService.getGoals,
  });

  const createMutation = useMutation({
    mutationFn: goalService.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      addNotification({
        title: 'Strategy Updated',
        message: 'New high-level objective established.',
        type: 'success'
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }) => goalService.updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: goalService.deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      addNotification({
        title: 'Objective Abandoned',
        message: 'Goal has been purged from the system.',
        type: 'error'
      });
    },
  });

  const toggleMilestoneMutation = useMutation({
    mutationFn: ({ goalId, milestoneId }) => goalService.toggleMilestone(goalId, milestoneId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['rpg-status'] });
      
      if (data.bossRewards?.bossDefeated) {
        addNotification({
          title: 'VICTORY!',
          message: `Boss defeated! Gained ${data.bossRewards.xpGained} XP.`,
          type: 'achievement',
          autoClose: false // Keep it open for user to see
        });

        if (data.bossRewards.leveledUp) {
          addNotification({
            title: 'LEVEL UP!',
            message: 'Your powers have increased. Check your character sheet.',
            type: 'level_up'
          });
        }
      }
    },
  });

  return {
    goals: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    createGoal: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateGoal: updateMutation.mutate,
    deleteGoal: deleteMutation.mutate,
    toggleMilestone: toggleMilestoneMutation.mutate,
  };
};
