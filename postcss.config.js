// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- THIS IS THE FIX. Use the new package name.
    autoprefixer: {},
  },
}