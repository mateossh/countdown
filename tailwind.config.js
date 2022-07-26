/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'testsize': '.825rem',
      },
      colors: {
        'primary': {
          '400': '#81A1C1',
          '500': '#5E81AC',
        },
        'grey': '#6e778a', // so this doesn't override default 'gray' heheh
        'norddarkgray': '#2e3440',
        'nordlightgray': '#eceff4',
        'nordred': '#bf616a',
      },
    },
  },
  plugins: [],
}
