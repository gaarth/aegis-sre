import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
    variable: "--font-syne",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AEGIS SRE — Autonomous Reliability Command System",
    description: "AEGIS SRE Command Center — Agentic SRE Control Plane powered by Groq llama-3.3-70b-versatile",
    keywords: ["SRE", "AI", "Incident Management", "Groq", "LLM", "AEGIS"],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={`${syne.variable} font-sans antialiased text-[#EAEEF6] selection:bg-[#8B9FE8] selection:text-white`}>
                {/* Global Grain Texture Layer */}
                <div
                    className="pointer-events-none fixed inset-0 z-50 opacity-[0.01]"
                    style={{
                        backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/></svg>')",
                    }}
                />
                {children}
            </body>
        </html>
    );
}
