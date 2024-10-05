/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('./src/images/bg.png')",
        'ralph': "url('./src/images/ralph.png')",
        'player': "url('./src/images/player.png')",
      },
    },
  },
  plugins: [],
};

