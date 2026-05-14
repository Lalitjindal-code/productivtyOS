import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API = '/api/journal';

export const useJournal = ({ page = 1, mood, tag, search } = {}) => {
  return useQuery({
    queryKey: ['journal', page, mood, tag, search],
    queryFn: async () => {
      const params = { page, limit: 20 };
      if (mood) params.mood = mood;
      if (tag) params.tag = tag;
      if (search) params.search = search;
      const { data } = await axios.get(API, { params });
      return data;
    },
    staleTime: 60_000,
  });
};

export const useTodayEntry = () => {
  return useQuery({
    queryKey: ['journal-today'],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/today`);
      return data.entry;
    },
    staleTime: 30_000,
  });
};

export const useOnThisDay = () => {
  return useQuery({
    queryKey: ['journal-on-this-day'],
    queryFn: async () => {
      const { data } = await axios.get(`${API}/on-this-day`);
      return data.memories;
    },
    staleTime: 3_600_000, // 1hr
  });
};

export const useUpsertEntry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(API, payload);
      return data.entry;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['journal'] });
      qc.invalidateQueries({ queryKey: ['journal-today'] });
    },
  });
};

export const useDeleteEntry = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => axios.delete(`${API}/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['journal'] });
      qc.invalidateQueries({ queryKey: ['journal-today'] });
    },
  });
};
