const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
      },
      lineHeight: {
        chill: '1.78571429',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
}
