import api from './api';

export const pomodoroService = {
  logSession: async (sessionData) => {
    const response = await api.post('/pomodoro', sessionData);
    return response.data;
  },

  getDailyStats: async () => {
    const response = await api.get('/pomodoro/stats/daily');
    return response.data;
  }
};
