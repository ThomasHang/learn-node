import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 会走 Vite 的代理
});

// 拦截请求，自动加上 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
