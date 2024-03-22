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
        color1: "#5E35B1",
        color2: "#FF89BA",
        color3: "#FFC17C",
        gold: "#FFD700",
        primary: "#E5E5E5",
        lavender: "#F25E62",
        myblue: "#7DF9FF",
        myblack: "#151515",
        black:"#0F0A0A",
        // agreeColor: "#913BD2",
        // disagreeColor: "#2779A7",
        agreeColor: "#FF6B6B",
        disagreeColor: "#4ECDC4",
        lpurple: "#F5EDFC",
        lblue: "#E9F1F6",
        lorange:"#FCF2EA",
        lgreen: "#E6F2EB",
        dgreen: "#0b843e",
        dorange: "#e0822f",
        dblue: "#2779a7",
        dpurple: "#9b51e0",
        bannerColor: "#622569",
        primaryColor: "#FC5757",
        nextColor:"#007BFF"
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        fredoka:['Fredoka', 'cursive'],
        TestCalibre: ['TestCalibre', 'sans-serif'],
      },
    },
    backgroundImage: {
      'my-image': "url('/public/holdinghands.svg')",
    },
    
  },
  plugins: [],
}
