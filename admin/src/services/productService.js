import api from './api';

/**
 * Service for Admin Product CRUD Operations
 * Connects directly to backend /api/products
 */
export const productService = {
  // READ: Fetch all products with optional filters
  getProducts: async (params = {}) => {
    const res = await api.get('/products', { params });
    return res.data;
  },

  // READ: Fetch single product by ID or slug
  getProductById: async (identifier) => {
    const res = await api.get(`/products/${identifier}`);
    return res.data;
  },

  // CREATE: Add new product
  createProduct: async (productData) => {
    const res = await api.post('/products', productData);
    return res.data;
  },

  // UPDATE: Edit existing product
  updateProduct: async (id, productData) => {
    const res = await api.put(`/products/${id}`, productData);
    return res.data;
  },

  // DELETE: Remove product from inventory
  deleteProduct: async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },

  // DEMO SEED: Quick 1-click seed for initial catalog
  seedDemoProducts: async (force = false) => {
    const res = await api.post(`/products/seed${force ? '?force=true' : ''}`);
    return res.data;
  },
};

export default productService;
