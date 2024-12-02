import axios from 'axios';

// Configuração da baseURL para o backend
const api = axios.create({
  baseURL: 'http://localhost:3000', // Certifique-se de que esta URL está correta
});

// Interceptador para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Pegue o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
