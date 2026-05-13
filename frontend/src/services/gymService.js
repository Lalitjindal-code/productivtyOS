import axios from 'axios';

const API_URL = '/api/gym';

export const getExercises = async () => {
  const response = await axios.get(`${API_URL}/exercises`);
  return response.data;
};

export const getWorkouts = async () => {
  const response = await axios.get(`${API_URL}/workouts`);
  return response.data;
};

export const logWorkout = async (workoutData) => {
  const response = await axios.post(`${API_URL}/workouts`, workoutData);
  return response.data;
};

export const getGymPlan = async () => {
  const response = await axios.get(`${API_URL}/plan`);
  return response.data;
};

export const updateGymPlan = async (planData) => {
  const response = await axios.put(`${API_URL}/plan`, planData);
  return response.data;
};

