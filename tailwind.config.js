/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Roboto', 'ui-sans-serif', 'system-ui', "Rubik", "cursive"],
      cursive: ['"Dancing Script"', 'cursive'],
      tomorrow: ['"Tomorrow"', 'sans-serif'],
      nova: ['"Nova Square"', 'sans-serif'],
      league: ['"League Gothic"', 'sans-serif'], 
      },
      colors: {
        primary: '#ff5722', 
        secondary: '#009688', 
        greybg: '#1a1919',
        'custom-bg': 'rgba(7,11,21,255)',
        'terminal-green': '#00ff00',
        'terminal-green-light': '#66ff66',
        'cust-green': 'rgba(144,184,80)'
      },
      spacing: {
        '128': '32rem',
      },
      screens: {
        'custom': '767px',
        'custom-md': '1007px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
};


