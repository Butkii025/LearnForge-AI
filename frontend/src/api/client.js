import axios from 'axios';

// Resolve URL for Railway or local fallback
const API_URL = import.meta.env.VITE_API_URL || '';

const client = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token automatically to all outbound requests
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('learnforge_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept unauthorized errors to trigger clean logouts
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('learnforge_token');
      localStorage.removeItem('learnforge_username');
      // Redirect or force reload to auth state if appropriate
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default client;
