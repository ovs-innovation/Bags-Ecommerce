import axios from 'axios';

/**
 * Base Axios Client for Admin Console
 * Connected directly to the centralized Node.js/Express backend API.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (attaches Admin JWT token when configured in Phase 9)
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('kosha_admin_token');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred while communicating with the backend API.';

    return Promise.reject(new Error(message));
  }
);

/**
 * Health check service
 */
export const healthService = {
  checkHealth: async () => {
    const res = await api.get('/health');
    return res.data;
  },
};

export default api;
