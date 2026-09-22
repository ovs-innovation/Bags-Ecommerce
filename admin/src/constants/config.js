/**
 * Central Configuration for Avyastore.in Admin Console
 * Keep brand name and core metadata synchronized with backend constants.
 */
export const ADMIN_CONFIG = {
  brandName: 'Avyastore.in',
  portalName: 'Admin Control Center',
  currency: '₹',
  currencyCode: 'INR',
  storefrontUrl: import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:5173',
  navLinks: [
    { label: 'Dashboard', path: '/', exact: true },
    { label: 'Products', path: '/products' },
    { label: 'Categories', path: '/categories' },
    { label: 'Orders', path: '/orders' },
    { label: 'Customers', path: '/customers' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Settings', path: '/settings' },
  ],
};

export default ADMIN_CONFIG;
