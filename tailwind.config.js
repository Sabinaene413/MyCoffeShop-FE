/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-datepicker/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        latte: {
          100: '#8a553e',
          200: '#d0a074',
          300: '#e2cebd',
          400: '#3c2621',
          500: '#eae6e6'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
  }),
  ],
}

