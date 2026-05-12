import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const fetchStats = async () => {
  const res = await api.get('/user/stats');
  return res.data;
};

const fetchProfile = async () => {
  const res = await api.get('/user/profile');
  return res.data;
};

const updateProfile = async (data) => {
  const res = await api.put('/user/profile', data);
  return res.data;
};

export const useStats = () => {
  const query = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 30_000, // refresh every 30s
  });

  return {
    stats: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export const useUserProfile = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  return {
    profile: query.data,
    isLoading: query.isLoading,
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
