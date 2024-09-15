module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'mainBackgroundColor': '#0D1117',
        'columnBackgroundColor': '#161C22',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-default': {
          'scrollbar-width': 'auto',
          '&::-webkit-scrollbar': {
            display: 'block',
          },
        }
      });
    }
  ],
  variants: {
    scrollbar: ['rounded'],
  },
};
