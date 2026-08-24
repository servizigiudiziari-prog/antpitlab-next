/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          void: '#000000',
          deep: '#0a0a12',
          twilight: '#1a1a2e',
          steel: '#3a3a4a',
          frost: '#b8c1d9',
          light: '#e8eaf6'
        }
      },
      fontFamily: {
        cosmic: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 1s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}
