import React, { useState, useEffect, useMemo } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  RefreshCw,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { productService } from '../services/productService';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'tote', label: 'Tote Bags' },
  { id: 'crossbody', label: 'Crossbody Bags' },
  { id: 'clutch', label: 'Clutches' },
  { id: 'wallet', label: 'Wallets & Cardholders' },
  { id: 'briefcase', label: 'Briefcases & Messengers' },
  { id: 'sling', label: 'Sling Bags' },
];

const INITIAL_FORM_STATE = {
  name: '',
  category: 'tote',
  gender: 'unisex',
  price: '',
  compareAtPrice: '',
  stock: 10,
  sku: '',
  color: 'Cognac',
  material: 'Full-Grain Vegetable-Tanned Leather',
  dimensions: '',
  images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'],
  description: '',
  shortDescription: '',
};

export const ProductsPage = () => {
  // Data state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Filter & search state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Quick Seed state
  const [seeding, setSeeding] = useState(false);

  // Show auto-dismissing toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch products from backend API
  const fetchProducts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const data = await productService.getProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch products from backend');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search
      const matchesSearch =
        !search.trim() ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.sku && item.sku.toLowerCase().includes(search.toLowerCase())) ||
        (item.color && item.color.toLowerCase().includes(search.toLowerCase()));

      // Category
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Stock status
      let matchesStock = true;
      if (stockFilter === 'in_stock') matchesStock = item.stock > 5;
      else if (stockFilter === 'low_stock') matchesStock = item.stock > 0 && item.stock <= 5;
      else if (stockFilter === 'out_of_stock') matchesStock = item.stock <= 0;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, selectedCategory, stockFilter]);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setFormData(INITIAL_FORM_STATE);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (product) => {
    setModalMode('edit');
    setCurrentProductId(product._id);
    setFormData({
      name: product.name || '',
      category: product.category || 'tote',
      gender: product.gender || 'unisex',
      price: product.price ?? '',
      compareAtPrice: product.compareAtPrice ?? '',
      stock: product.stock ?? 10,
      sku: product.sku || '',
      color: product.color || 'Cognac',
      material: product.material || 'Full-Grain Vegetable-Tanned Leather',
      dimensions: product.dimensions || '',
      images: Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'],
      description: product.description || '',
      shortDescription: product.shortDescription || '',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Handle Form Change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Image URL input
  const handleImageUrlChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      images: [value],
    }));
  };

  // Submit Create or Edit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setFormError('Please enter a valid price greater than 0.');
      return;
    }

    setFormSubmitting(true);
    try {
      if (modalMode === 'create') {
        const res = await productService.createProduct(formData);
        showToast(res.message || 'Product created successfully!');
      } else {
        const res = await productService.updateProduct(currentProductId, formData);
        showToast(res.message || 'Product updated successfully!');
      }
      setIsModalOpen(false);
      fetchProducts(true);
    } catch (err) {
      setFormError(err.message || 'Operation failed');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Open Delete Confirmation
  const handleOpenDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  // Execute Delete
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);

    try {
      const res = await productService.deleteProduct(productToDelete._id);
      showToast(res.message || 'Product deleted from catalog!');
      setDeleteModalOpen(false);
      setProductToDelete(null);
      fetchProducts(true);
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Execute 1-Click Demo Seed
  const handleSeedDemoProducts = async () => {
    setSeeding(true);
    try {
      const res = await productService.seedDemoProducts(true);
      showToast(res.message || 'Seeded demo luxury bags into database!');
      fetchProducts(true);
    } catch (err) {
      showToast(err.message || 'Failed to seed database', 'error');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-md shadow-lg transition-all text-xs font-semibold ${
            toast.type === 'error'
              ? 'bg-red-900 text-white border border-red-700'
              : 'bg-stone-900 text-white border border-stone-700'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-stone-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-serif text-2xl font-bold text-stone-900">
              Product Studio & Inventory
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200">
              {products.length} Products
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Create, update, inspect, and remove luxury handcrafted leather purses and accessories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {products.length === 0 && !loading && (
            <button
              onClick={handleSeedDemoProducts}
              disabled={seeding}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 rounded transition-colors"
            >
              <Sparkles className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Seeding...' : 'Seed Demo Bags'}</span>
            </button>
          )}

          <button
            onClick={() => fetchProducts(true)}
            disabled={refreshing}
            className="p-2 text-stone-600 hover:text-stone-900 bg-white border border-stone-200 hover:border-stone-300 rounded transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-black rounded shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, SKU, color..."
            className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200 focus:border-stone-900 focus:bg-white text-xs text-stone-900 rounded focus:outline-none transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 text-xs font-medium text-stone-700 rounded focus:outline-none focus:border-stone-900"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-3 py-2 bg-stone-50 border border-stone-200 text-xs font-medium text-stone-700 rounded focus:outline-none focus:border-stone-900"
          >
            <option value="all">All Inventory</option>
            <option value="in_stock">In Stock (&gt;5)</option>
            <option value="low_stock">Low Stock (1-5)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Error state banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => fetchProducts()}
            className="underline font-bold hover:text-red-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 text-center text-stone-500 space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-stone-400" />
            <p className="text-xs">Loading products from MongoDB...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center space-y-4 max-w-md mx-auto px-4">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-500">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900">No products found</h3>
              <p className="text-xs text-stone-500 mt-1">
                {products.length === 0
                  ? 'Your database is currently empty. Seed initial luxury demo bags or click "Add Product" above.'
                  : 'No items match your active search or filters.'}
              </p>
            </div>
            {products.length === 0 ? (
              <button
                onClick={handleSeedDemoProducts}
                disabled={seeding}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-black rounded shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>{seeding ? 'Populating...' : 'Seed Initial Demo Bags'}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('all');
                  setStockFilter('all');
                }}
                className="text-xs font-semibold text-stone-800 underline hover:text-black"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Inventory</th>
                  <th className="py-3 px-4">Color & Material</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs text-stone-700">
                {filteredProducts.map((p) => {
                  const hasDiscount = p.compareAtPrice && p.compareAtPrice > p.price;
                  const discountPercent = hasDiscount
                    ? Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)
                    : 0;

                  return (
                    <tr key={p._id} className="hover:bg-stone-50/60 transition-colors">
                      {/* Product Name & Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-md overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                            <img
                              src={
                                Array.isArray(p.images) && p.images[0]
                                  ? p.images[0]
                                  : 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80'
                              }
                              alt={p.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <p className="font-semibold text-stone-900 truncate hover:text-stone-700">
                              {p.name}
                            </p>
                            <p className="text-[11px] font-mono text-stone-400 mt-0.5">
                              {p.sku || 'NO-SKU'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 capitalize">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-stone-900">
                          ₹{p.price?.toLocaleString('en-IN')}
                        </div>
                        {hasDiscount && (
                          <div className="flex items-center gap-1.5 text-[10.5px] mt-0.5">
                            <span className="line-through text-stone-400">
                              ₹{p.compareAtPrice?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-emerald-700 font-bold">
                              -{discountPercent}%
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4">
                        {p.stock > 5 ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>In Stock ({p.stock})</span>
                          </span>
                        ) : p.stock > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>Low Stock ({p.stock})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-700 border border-red-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span>Out of Stock (0)</span>
                          </span>
                        )}
                      </td>

                      {/* Color & Material */}
                      <td className="py-3 px-4">
                        <p className="font-medium text-stone-800">{p.color || 'Cognac'}</p>
                        <p className="text-[10.5px] text-stone-500 truncate max-w-[160px]">
                          {p.material || 'Genuine Leather'}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteModal(p)}
                            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── CREATE / EDIT PRODUCT MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {modalMode === 'create' ? 'Add New Luxury Bag' : 'Edit Product Details'}
                </h3>
                <p className="text-xs text-stone-500">
                  {modalMode === 'create'
                    ? 'Enter the specifications to publish this product into MongoDB.'
                    : `Updating inventory and catalog metadata for ${formData.name}.`}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Aria Structured Leather Tote"
                    required
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900 capitalize"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Gender Collection *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900 capitalize"
                  >
                    <option value="unisex">Unisex (Both Men & Women)</option>
                    <option value="women">Women's Collection</option>
                    <option value="men">Men's Collection</option>
                  </select>
                </div>
              </div>

              {/* Price, Compare Price, Stock, SKU */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="8499"
                    required
                    min="0"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Compare (₹)
                  </label>
                  <input
                    type="number"
                    name="compareAtPrice"
                    value={formData.compareAtPrice}
                    onChange={handleFormChange}
                    placeholder="11999"
                    min="0"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleFormChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleFormChange}
                    placeholder="Auto if blank"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 uppercase focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Color & Material */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Leather Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleFormChange}
                    placeholder="e.g. Cognac, Espresso, Tan, Black"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                    Leather Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleFormChange}
                    placeholder="e.g. Full-Grain Vegetable-Tanned Leather"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              {/* Image URL with live preview */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Product Image URL
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="url"
                      value={formData.images[0] || ''}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div className="w-10 h-10 rounded border border-stone-200 bg-stone-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {formData.images[0] ? (
                      <img
                        src={formData.images[0]}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-stone-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Short & Detailed Description */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Description & Craftsmanship Details
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Describe the silhouette, tanning technique, interior lining, and hardware..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1">
                  Dimensions (L × H × W)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleFormChange}
                  placeholder="e.g. 38 × 28 × 14 cm"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-900"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-black rounded shadow-xs transition-colors disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to MongoDB...</span>
                    </>
                  ) : (
                    <span>{modalMode === 'create' ? 'Create Product' : 'Save Changes'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION DIALOG ── */}
      {deleteModalOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-md p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Delete "{productToDelete.name}"?
              </h3>
              <p className="text-xs text-stone-500">
                This will permanently delete this item from your database inventory. Customers will no longer be able to view or purchase it.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleting}
                className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
              >
                Keep Product
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow-xs transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
