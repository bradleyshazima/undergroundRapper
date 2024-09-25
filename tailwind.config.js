/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'max': '480px'}, //(Mobile phones)
        'sm': {'min': '481px', 'max': '768px'}, //(Tablets)
        'md': {'min': '769px', 'max': '1024px'}, //(Small Desktops)
        'lg': {'min': '1025px', 'max': '1200px'}, //(Desktops)
        'xl': {'min': '1201px'}, //(Large Desktops)
      },
    },
  },
  plugins: [],
}
