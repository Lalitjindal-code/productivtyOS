import api from './api';

export const getUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const getRPGStatus = async () => {
  const response = await api.get('/user/rpg-status');
  return response.data;
};

export const selectClass = async (charClass) => {
  const response = await api.post('/user/select-class', { charClass });
  return response.data;
};

export const getUserStats = async () => {
  const response = await api.get('/user/stats');
  return response.data;
};
