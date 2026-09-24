/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#d6e0fd',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
        },
        neon: {
          DEFAULT: '#CCFF00',
          hover: '#BAE600',
          light: '#F4FFD0',
          muted: '#D8FF4D'
        }
      },
    },
  },
  plugins: [],
}
