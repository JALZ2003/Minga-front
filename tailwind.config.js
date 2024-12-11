/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
      './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
      extend: {
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
          roboto: ['Roboto', 'sans-serif']
        },
        colors: {
          'gray-light': '#EBEBEB',
          'gray-border': '#424242',
          'gray-dark': '#222222',
          'orange-secondary': '#FF5722',
          'orange-primary': '#F97316',
        }
      }
  },
  variants: {},
  plugins: []
}

