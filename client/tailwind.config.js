/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5F1F',
        accent: '#FF1F3D',
        dark: {
          900: '#000000',
          800: '#0a0a0a',
          700: '#111111',
          600: '#1a1a1a',
          500: '#222222',
          400: '#2a2a2a',
          300: '#333333',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF5F1F, #FF1F3D)',
        'gradient-primary-hover': 'linear-gradient(135deg, #FF1F3D, #FF5F1F)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 95, 31, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 95, 31, 0.4)',
        'glow-accent': '0 0 20px rgba(255, 31, 61, 0.3)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(255, 95, 31, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 31, 61, 0.5)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
