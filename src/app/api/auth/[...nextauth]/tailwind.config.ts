import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ubuntu-yellow-light': '#FFCE79',
        'ubuntu-yellow': '#facc15', // Cor amarela principal da marca
        'ubuntu-brown': '#663333',
      },
      fontFamily: {
        sans: ['var(--font-bebas)', 'sans-serif'], // Definindo Bebas Neue como padrão para parágrafos
        bebas: ['var(--font-bebas)'],
      },
      textShadow: {
        'default': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'outline': '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow') // Adicionando o plugin para text-shadow
  ],
};
export default config;