module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.md",
    "./src/**/*.njk",
    "./src/**/**/*.njk",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // scale: ['hover', 'focus', 'active', 'group-hover'],
      gridTemplateColumns: {
        full: "100%",
      },
      gridTemplateRows: {
        "auto-1-auto": "auto 1fr auto",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
  important: true,
};
