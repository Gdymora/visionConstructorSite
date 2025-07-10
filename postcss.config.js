module.exports = {
  plugins: {
    plugins: [
      require('postcss-nesting'), // Додайте цей рядок
      require('tailwindcss'),
      require('autoprefixer'),
    ]
  },
};
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
  }
}
