/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "2xl": "1400px",
		},
	  },
	  extend: {
		colors: {
		  award: {
			gold: "#FFD700",
			blue: "#003366",
			silver: "#C0C0C0",
		  },
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  primary: {
			DEFAULT: "#FFD700",
			foreground: "#000000",
		  },
		  secondary: {
			DEFAULT: "#003366",
			foreground: "#FFFFFF",
		  },
		},
		fontFamily: {
		  cinzel: ["var(--font-cinzel)"],
		  poppins: ["var(--font-poppins)"],
		  sans: ["var(--font-poppins)"],
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  
  