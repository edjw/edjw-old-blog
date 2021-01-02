const colors = require("tailwindcss/colors");
module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.md",
    "./src/**/*.njk",
    "./src/**/**/*.njk",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.trueGray,
        gray: colors.gray,
        trueGray: colors.trueGray,
      },
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
