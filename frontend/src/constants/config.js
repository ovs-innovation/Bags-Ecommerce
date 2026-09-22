/**
 * Central Brand and Application Configuration
 * To update the brand name, contact, currency, or navigation, modify values here.
 * DO NOT hardcode these strings inside React components.
 */
export const BRAND_CONFIG = {
  name: 'Avya Store',
  tagline: 'More Than Trends',
  slogan: 'Trends Today • Trends Tomorrow • Old Is Gold',
  signature: '— More Than Trends —',
  logo: '/logo.png',
  description:
    'Trends Today, Trends Tomorrow, Old is Gold. Discover curated Gen-Z luxury, artisanal handcrafted leather bags, tech folios, and everyday statement accessories crafted to outlast the hype.',
  currency: '₹',
  currencyCode: 'INR',
  contact: {
    email: 'support@avyastore.com',
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
    { label: 'Creations', path: '/products' },
    { label: 'Men', path: '/category/men' },
    { label: 'Women', path: '/category/women' },
    { label: 'About', path: '/about' },
  ],
};

export default BRAND_CONFIG;
