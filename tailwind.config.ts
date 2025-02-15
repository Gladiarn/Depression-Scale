import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      boxShadow: {
        soft: '1.95px 1.95px 2.6px rgba(0, 0, 0, 0.15)',
      },
  		colors: {
  			accent: '#4A90E2',
  			primary: '#EAEAEA',
  			secondary: '#B0B0B0',
  			background: '#FFFFFF',
  			surface: '#493D9E',
  			success: '#4CAF50',
  			warning: '#FF9800',
  			error: '#E53935'
  		},
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
} satisfies Config;
