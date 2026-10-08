export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: '#05070d',
        night: '#0a1124',
        midnight: '#101b36',
        sky: '#75aadb',
        bone: '#f2efe8',
        silver: '#9aa1ad',
        gold: '#c9a45c',
        garnet: '#8a2443',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
