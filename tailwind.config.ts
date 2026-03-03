import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                mono: ["JetBrains Mono", "Fira Code", "monospace"],
            },
            colors: {
                // SG-1 design system tokens
                background: "#0a0a0f",
                surface: "#12121a",
                "surface-2": "#1a1a26",
                "surface-3": "#22223a",
                border: "#2a2a40",
                "border-bright": "#3a3a5c",

                // Accent
                primary: "#6366f1",       // Indigo
                "primary-glow": "#818cf8",
                secondary: "#06b6d4",     // Cyan
                "secondary-glow": "#22d3ee",

                // Status
                critical: "#ef4444",
                "critical-glow": "#f87171",
                warning: "#f59e0b",
                "warning-glow": "#fbbf24",
                safe: "#10b981",
                "safe-glow": "#34d399",
                pending: "#8b5cf6",
                "pending-glow": "#a78bfa",

                // Risk tiers
                "risk-high": "#ef4444",
                "risk-medium": "#f97316",
                "risk-low": "#3b82f6",
                "action-resolved": "#10b981",
                "action-pending": "#eab308",

                // Text
                "text-primary": "#f1f5f9",
                "text-secondary": "#94a3b8",
                "text-muted": "#475569",
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "fade-in": "fadeIn 0.3s ease-out",
                "slide-up": "slideUp 0.4s ease-out",
                "glow": "glow 2s ease-in-out infinite alternate",
                "thought-stream": "thoughtStream 0.5s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px rgba(99,102,241,0.3)" },
                    "100%": { boxShadow: "0 0 20px rgba(99,102,241,0.8), 0 0 40px rgba(99,102,241,0.4)" },
                },
                thoughtStream: {
                    "0%": { opacity: "0", transform: "translateX(-5px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
            },
            backgroundImage: {
                "grid-pattern": "radial-gradient(ellipse at center, #6366f120 0%, transparent 70%), linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            backgroundSize: {
                "grid": "100% 100%, 40px 40px, 40px 40px",
            },
            boxShadow: {
                "glow-primary": "0 0 20px rgba(99,102,241,0.4)",
                "glow-critical": "0 0 20px rgba(239,68,68,0.4)",
                "glow-safe": "0 0 20px rgba(16,185,129,0.4)",
                "card": "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            },
        },
    },
    plugins: [],
};

export default config;
