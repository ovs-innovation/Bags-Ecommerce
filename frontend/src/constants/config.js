/**
 * Central Brand and Application Configuration
 * To update the brand name, contact, currency, or navigation, modify values here.
 * DO NOT hardcode these strings inside React components.
 */
export const BRAND_CONFIG = {
  name: 'KOSHA',
  tagline: 'Handcrafted Luxury Leather',
  description:
    'Dedicated to timeless artisanal craftsmanship. Discover our heirloom-grade full-grain leather purses, handbags, wallets, and bespoke accessories tailored for discerning men and women.',
  currency: '₹',
  currencyCode: 'INR',
  contact: {
    email: 'care@koshaleather.com',
    phone: '+91 98765 43210',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM IST',
    address: 'Artisan Atelier, MG Road, New Delhi, 110001, India',
  },
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    pinterest: 'https://pinterest.com',
  },
  policy: {
    freeShippingThreshold: 1999,
    returnDays: 14,
    warrantyMonths: 12,
  },
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'Men', path: '/category/men' },
    { label: 'Women', path: '/category/women' },
    { label: 'About', path: '/about' },
  ],
};

export default BRAND_CONFIG;
