const color = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: '475px',
      '3xl': '1920px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        gray: color.trueGray,
        primary: {
          deep: '#ff4400',
          moderate: '#ff6600',
          semi: '#f88704',
          light: '#ff8800'
        },
        secondary: { deep: '#863000', light: '#fde6aa' }
      },
      fontFamily: {
        sans: ["'Ubuntu'", ...defaultTheme.fontFamily.sans],
        serif: ["'Montserrat'", ...defaultTheme.fontFamily.serif]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
