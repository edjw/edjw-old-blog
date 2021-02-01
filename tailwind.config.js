const colors = require("tailwindcss/colors");
module.exports = {
  purge: [
    "./src/**/*.html",
    "./src/**/*.md",
    "./src/**/*.njk",
    "./src/**/**/*.njk",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        trueGray: colors.trueGray,
      },
      gridTemplateColumns: {
        full: "100%",
      },
      gridTemplateRows: {
        "auto-1-auto": "auto 1fr auto",
      },
      typography: (theme) => ({
        light: {
          css: [
            {
              color: theme('colors.gray.100'),
              '[class~="lead"]': {
                color: theme('colors.gray.300'),
              },
              a: {
                color: theme('colors.white'),
              },
              'a:hover': {
                backgroundColor: theme('colors.yellow.200'),
                color: theme("colors.trueGray.800")
              },
              button: {
                color: theme('colors.white'),
              },
              strong: {
                color: theme('colors.white'),
              },
              'ol > li::before': {
                color: theme('colors.gray.400'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600'),
              },
              hr: {
                borderColor: theme('colors.gray.200'),
              },
              blockquote: {
                color: theme('colors.gray.200'),
                borderLeftColor: theme('colors.gray.600'),
              },
              h1: {
                color: theme('colors.white'),
              },
              h2: {
                color: theme('colors.white'),
              },
              h3: {
                color: theme('colors.white'),
              },
              h4: {
                color: theme('colors.white'),
              },
              'figure figcaption': {
                color: theme('colors.gray.400'),
              },
              code: {
                color: theme('colors.white'),
              },
              'a code': {
                color: theme('colors.white'),
              },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require("@tailwindcss/typography")],
  important: true,
};
