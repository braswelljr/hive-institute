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
          cheese: '#ffa600',
          deep: '#ff4400',
          moderate: '#ff6600',
          semi: '#f88704',
          light: '#ff8800',
          thin: '#fff5cb'
        },
        secondary: { deep: '#863000', light: '#fde6aa' }
      },
      fontFamily: {
        sans: ["'Ubuntu'", ...defaultTheme.fontFamily.sans],
        serif: ["'Montserrat'", ...defaultTheme.fontFamily.serif]
      },
      shadow: {
        'custom-def': '2.4px 2.4px 3.2px rgba(0, 0, 0, 0.15)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
