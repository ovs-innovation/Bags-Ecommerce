import axios from 'axios';

/**
 * Base Axios Client instance
 * Configured with environment base URL and standard headers.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (attaches JWT tokens when authentication is added in Phase 3)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kosha_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (standardizes error messages and handles session expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred. Please try again.';

    // Check for 401 Unauthorized
    if (error.response?.status === 401) {
      // Future Phase 3: trigger token refresh or clear session
    }

    return Promise.reject(new Error(message));
  }
);

/**
 * Helper API methods
 */
export const healthCheckService = {
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  getProductBySlug: async (identifier) => {
    const response = await api.get(`/products/${identifier}`);
    return response.data;
  },
};

export default api;
