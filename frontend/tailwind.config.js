/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── New Design System ──
        ink:    '#0A0A0A',
        paper:  '#FAFAF8',
        fog:    '#F7F5F2',
        muted:  '#8A8A8A',
        border: '#E8E6E3',
        accent: '#C8F376',
        'accent-dark': '#1C3A27',
        'accent-mid': '#4A6B3D',
        gold:   '#D4A853',
        // ── Legacy (kept for backward compat) ──
        brand: {
          50:  '#FAF6F0', 100: '#F3ECE2', 200: '#E5D6C2',
          300: '#D2BC9D', 400: '#B89B74', 500: '#9B784E',
          600: '#7F5E38', 700: '#64482A', 800: '#4C351E',
          900: '#332313', 950: '#1F140A',
        },
        cognac:  { 500: '#9A3412', 600: '#7C2D12', 700: '#431407' },
        avya: {
          dark: '#1C3A27',
          sage: '#6B8255',
          leaf: '#4A6B3D',
          lime: '#C8F376',
          cream: '#FAFAF8',
          matcha: '#F2F6ED',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'system-ui', 'sans-serif'],
        serif:   ['Lora', '"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle:   '0 1px 8px rgba(10,10,10,0.04)',
        card:     '0 4px 24px -4px rgba(10,10,10,0.08)',
        elevated: '0 12px 48px -8px rgba(10,10,10,0.14)',
        glow:     '0 0 40px rgba(200,243,118,0.3)',
        'ink':    '4px 4px 0px #0A0A0A',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fadeIn 0.4s ease both',
        'slide-up':   'slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'marquee':    'marquee 28s linear infinite',
        'spin-slow':  'spin 8s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
