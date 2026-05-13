import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { goalService } from '../services/goalService';

export const useGoals = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['goals'],
    queryFn: goalService.getGoals,
  });

  const createMutation = useMutation({
    mutationFn: goalService.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
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
    },
  });

  const toggleMilestoneMutation = useMutation({
    mutationFn: ({ goalId, milestoneId }) => goalService.toggleMilestone(goalId, milestoneId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['rpg-status'] });
      
      if (data.bossRewards?.bossDefeated) {
        import('react-hot-toast').then(({ default: toast }) => {
          toast.success(`VICTORY! ${data.bossRewards.xpGained} XP GAINED!`, {
            icon: '⚔️',
            duration: 5000,
            style: {
              background: '#991b1b',
              color: '#fff',
              fontWeight: 'bold'
            }
          });
        });
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
