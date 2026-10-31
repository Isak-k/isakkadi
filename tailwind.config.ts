import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0B1120',
          secondary: '#111827',
          card: '#172033',
        },
        blue: {
          primary: '#2563EB',
          bright: '#3B82F6',
          light: '#60A5FA',
        },
        text: {
          primary: '#F8FAF',
          secondary: '#CBD5E1',
          muted: '#94A3B8',
        },
        border: {
          default: '#263449',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      animation: {
        blob: 'blob 7s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
} satisfies Config
