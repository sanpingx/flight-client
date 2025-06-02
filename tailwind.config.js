/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4da6ff',
          DEFAULT: '#0078ff',
          dark: '#0057b8',
        },
        gray: {
          100: '#f2f2f4',
          200: '#e5e8ea',
          300: '#dde0e2',
          400: '#6b7782',
          900: '#111416',
        },
        blue: {
          100: '#b2d1e5',
        }
      },
      fontFamily: {
        'plus-jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}