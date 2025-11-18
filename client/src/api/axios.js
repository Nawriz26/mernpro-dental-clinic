import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // uses CRA proxy -> http://localhost:4000/api
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
