/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F07C32',
        primaryHover: '#F59450',
        secondary: '#E8A681',
      },
    },
  },
  plugins: [],
};
