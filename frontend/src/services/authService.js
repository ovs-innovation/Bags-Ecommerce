import api from './api';

/**
 * Authentication service communicating with KOSHA Backend Auth API
 */
export const authService = {
  /**
   * Register a new customer
   * @param {Object} userData - { name, email, password, phone }
   * @returns {Promise<Object>} { token, user }
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Sign in an existing user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} { token, user }
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Fetch current authenticated user profile
   * @returns {Promise<Object>} { user }
   */
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Update profile details and optional password
   * @param {Object} updateData - { name, phone, currentPassword, newPassword }
   * @returns {Promise<Object>} { user, token }
   */
  updateProfile: async (updateData) => {
    const response = await api.put('/auth/profile', updateData);
    return response.data;
  },

  /**
   * Sign out (optional backend notification)
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Best-effort logout notification
    }
  },

  /**
   * Fetch patron's saved item IDs
   */
  getSaved: async () => {
    const response = await api.get('/auth/saved');
    return response.data;
  },

  /**
   * Toggle saved item on backend
   */
  toggleSaved: async (itemId) => {
    const response = await api.post('/auth/saved/toggle', { itemId });
    return response.data;
  },

  /**
   * Sync local guest saved items with backend
   */
  syncSaved: async (itemIds) => {
    const response = await api.post('/auth/saved/sync', { itemIds });
    return response.data;
  },
};

export default authService;
