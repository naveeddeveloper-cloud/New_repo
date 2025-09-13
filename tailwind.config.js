/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",              // <-- ADD THIS LINE

  ],
  theme: {
    extend: {},
  },
  // This is the correct and stable place for the forms plugin
  plugins: [
    require('@tailwindcss/forms'),
  ],
}