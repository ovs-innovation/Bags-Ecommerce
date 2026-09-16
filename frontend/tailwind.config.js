/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#FAF6F0', 100: '#F3ECE2', 200: '#E5D6C2',
          300: '#D2BC9D', 400: '#B89B74', 500: '#9B784E',
          600: '#7F5E38', 700: '#64482A', 800: '#4C351E',
          900: '#332313', 950: '#1F140A',
        },
        cognac:  { 500: '#9A3412', 600: '#7C2D12', 700: '#431407' },
        gold:    { 300: '#F3E5AB', 400: '#E6C687', 500: '#D4AF37', 600: '#A8861E', 700: '#7A600F' },
        onyx:    { 800: '#1F1E1D', 900: '#141413', 950: '#0C0C0B' },
        cream:   { DEFAULT: '#FAF8F5', dark: '#F0EBE3' },
      },
      fontFamily: {
        serif: ['Lora', '"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle:   '0 2px 12px rgba(28, 20, 10, 0.05)',
        card:     '0 4px 24px -4px rgba(28, 20, 10, 0.10)',
        elevated: '0 12px 40px -8px rgba(28, 20, 10, 0.16)',
        glow:     '0 0 30px rgba(196, 151, 66, 0.25)',
      },
      backgroundImage: {
        'leather-texture': "radial-gradient(circle at 20% 80%, rgba(155,120,78,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(100,72,42,0.06) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};
