import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // { success, token, user }
  },

  register: async (email, password, displayName) => {
    const response = await api.post('/auth/register', { email, password, displayName });
    return response.data; // { success, token, user }
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data; // { success, user }
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};
