const tailwindcss = require("tailwindcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [
    tailwindcss,
    process.env.NODE_ENV === 'production' ? autoprefixer : null,
    process.env.NODE_ENV === 'production'
      ? cssnano({ preset: 'default' })
      : null
  ],
};