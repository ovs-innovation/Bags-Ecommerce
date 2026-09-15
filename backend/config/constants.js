/**
 * Centralized Application & Brand Constants for KOSHA Server
 * All brand metadata, currency defaults, and system enumerations are configured here.
 */
const BRAND_CONFIG = {
  brandName: 'KOSHA',
  tagline: 'Handcrafted Luxury Leather Purses & Accessories',
  supportEmail: 'care@koshaleather.com',
  supportPhone: '+91 98765 43210',
  currency: 'INR',
  currencySymbol: '₹',
};

const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
};

module.exports = {
  BRAND_CONFIG,
  ORDER_STATUS,
  PAYMENT_STATUS,
  USER_ROLES,
};
