/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '500-gradient-start': '#5D52FF',
          '500-gradient-end': '#2BC0FF',
        },
        accent: '#7C61FF',
        midnight: '#0B1020',
        surface: 'rgba(255,255,255,0.04)',
        'ring-glow': 'rgba(124,97,255,0.15)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(124,97,255,0.15), 0 0 40px rgba(124,97,255,0.1), 0 0 80px rgba(124,97,255,0.05)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(124,97,255,0.25), 0 0 60px rgba(124,97,255,0.15), 0 0 120px rgba(124,97,255,0.1)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
