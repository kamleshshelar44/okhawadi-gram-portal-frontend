import axios from 'axios';

const api = axios.create({
  baseURL: 'https://okhawadi-gram-portal-backend.vercel.app/api',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Only set multipart/form-data if FormData is used
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    // Add language param
    const language = localStorage.getItem('i18nextLng') || 'mr';
    if (config.method === 'get') {
      config.params = { ...(config.params || {}), lang: language };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
