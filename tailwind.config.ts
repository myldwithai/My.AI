import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        rose: {
          DEFAULT: "#f72585",
          100: "#37021a",
          200: "#6e0434",
          300: "#a5064e",
          400: "#dc0868",
          500: "#f72585",
          600: "#f9529d",
          700: "#fa7db5",
          800: "#fca8ce",
          900: "#fdd4e6",
        },
        grape: {
          DEFAULT: "#7209b7",
          100: "#170225",
          200: "#2e034a",
          300: "#45056f",
          400: "#5c0794",
          500: "#7209b7",
          600: "#980df4",
          700: "#b14af6",
          800: "#cb86f9",
          900: "#e5c3fc",
        },
        zaffre: {
          DEFAULT: "#3a0ca3",
          100: "#0b0220",
          200: "#170541",
          300: "#220761",
          400: "#2e0a81",
          500: "#3a0ca3",
          600: "#4f11e0",
          700: "#7743f1",
          800: "#a582f6",
          900: "#d2c0fa",
        },
        neon_blue: {
          DEFAULT: "#4361ee",
          100: "#050f38",
          200: "#0a1d70",
          300: "#102ca8",
          400: "#153ae0",
          500: "#4361ee",
          600: "#6a83f1",
          700: "#8fa2f5",
          800: "#b4c1f8",
          900: "#dae0fc",
        },
        vivid_sky_blue: {
          DEFAULT: "#4cc9f0",
          100: "#052e3a",
          200: "#095c75",
          300: "#0e8aaf",
          400: "#13b8ea",
          500: "#4cc9f0",
          600: "#70d5f3",
          700: "#93dff6",
          800: "#b7eaf9",
          900: "#dbf4fc",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
