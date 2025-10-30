import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001', // Puerto de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});
-
// Interceptor para agregar el token de autenticación
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;