/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF6F0',
          100: '#F3ECE2',
          200: '#E5D6C2',
          300: '#D2BC9D',
          400: '#B89B74',
          500: '#9B784E',
          600: '#7F5E38',
          700: '#64482A',
          800: '#4C351E',
          900: '#332313',
          950: '#1F140A',
        },
        gold: {
          400: '#E6C687',
          500: '#D4AF37',
        },
        admin: {
          sidebar: '#161514',
          bg: '#F9F8F6',
          card: '#FFFFFF',
          border: '#E8E5DF',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
