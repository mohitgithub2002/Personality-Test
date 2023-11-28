/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-80': 'linear-gradient(80deg, var(--tw-gradient-stops))'
      },
      colors: {
        color1: "#B67DFD",
        color2: "#FF89BA",
        color3: "#FFC17C"
      }
    },
    fontFamily: {
      quicksand: ['Quicksand', 'sans-serif'],
    },
    
  },
  plugins: [],
}
