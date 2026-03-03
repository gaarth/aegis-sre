"use client";

import React, { useState, useEffect, useCallback } from "react";

const navLinks = [
    { label: "Overview", anchor: "overview" },
    { label: "Capabilities", anchor: "capabilities" },
    { label: "Architecture", anchor: "architecture" },
];

export function Navigation() {
    const [activeSection, setActiveSection] = useState("overview");

    const handleClick = useCallback((anchor: string) => {
        const el = document.getElementById(anchor);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    /* Scroll-position-aware active state */
    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY + 120; // offset for nav height
            let current = "overview";
            for (const link of navLinks) {
                const el = document.getElementById(link.anchor);
                if (el && el.offsetTop <= scrollY) {
                    current = link.anchor;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 bg-[#0F1117]/60 backdrop-blur-[16px] border-b border-white/5">
            <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#A0B4F0]">
                    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <path d="M12 7L7 10v4l5 3 5-3v-4l-5-3z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.15" />
                </svg>
                <button
                    onClick={() => handleClick("overview")}
                    className="font-bold tracking-widest text-lg text-white hover:text-white cursor-pointer bg-transparent border-none"
                >
                    AEGIS SRE
                </button>
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-400">
                {navLinks.map((link) => {
                    const isActive = activeSection === link.anchor;
                    return (
                        <button
                            key={link.anchor}
                            onClick={() => handleClick(link.anchor)}
                            className={`relative cursor-pointer transition-colors hover:text-white bg-transparent border-none ${isActive ? "text-white" : ""}`}
                        >
                            {link.label}
                            {isActive && (
                                <div className="absolute -bottom-7 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A0B4F0] to-transparent" />
                            )}
                        </button>
                    );
                })}
            </div>
            {/* No Launch Console button ΓÇö clean navigation */}
            <div className="w-[120px]" />
        </nav>
    );
}