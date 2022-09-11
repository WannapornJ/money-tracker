/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      red: '#CD5D67',
      green: '#69B578',
      offWhite: '#F2F3F3',
      blue: {
        100: '#003566',
        200: '#001D3D',
        300: '#000814',
      },
      yellow: {
        100: '#FFD60A',
        200: '#FFC300',
      },
      gray: {
        100: '#D9D9D9',
        200: '#ACACAC',
      },
    },
    fontFamily: {
      Sansita: ['Sansita', '-apple-FileSystem', 'Segoe UI', 'Roboto'],
      Nunito: ['Nunito', '-apple-FileSystem', 'Segoe UI', 'Roboto'],
    },
  },
  plugins: [],
};
