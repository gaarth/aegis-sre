"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Global Footer ΓÇö Contact & Information
 * 
 * Design: Minimalist, clean separator, Deep Space palette.
 * L-02 compliant: Has its own background, no bleed into Architecture.
 * L-06 compliant: Not a bento ΓÇö uses asymmetric 2-column split.
 */
export function Footer() {
    const [inquiry, setInquiry] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inquiry.trim()) {
            setSubmitted(true);
            setInquiry("");
            setTimeout(() => setSubmitted(false), 3000);
        }
    };

    return (
        <footer id="contact" className="relative w-full text-white overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        linear-gradient(180deg, #05030A 0%, #08060E 40%, #0A0812 100%)
                    `,
                    zIndex: 0,
                }}
            />

            {/* Top separator */}
            <div className="relative z-10 max-w-7xl mx-auto px-8">
                <div
                    className="h-px w-full"
                    style={{
                        background: "linear-gradient(90deg, transparent 0%, rgba(139, 159, 232, 0.15) 30%, rgba(139, 159, 232, 0.15) 70%, transparent 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column ΓÇö Contact */}
                    <div>
                        <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/60 mb-6">
                            Get in Touch
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 header-glow">
                            Contact Us
                        </h2>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(139, 159, 232, 0.1)", border: "1px solid rgba(139, 159, 232, 0.15)" }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B9FE8" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,4 12,13 2,4" /></svg>
                                </div>
                                <span className="text-muted text-sm tracking-wide">contact@aegis-sre.dev</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(139, 159, 232, 0.1)", border: "1px solid rgba(139, 159, 232, 0.15)" }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B9FE8" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <span className="text-muted text-sm tracking-wide">Cloud-Native ΓÇó Globally Distributed</span>
                            </div>
                        </div>

                        {/* Quick Inquiry */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 block">
                                Quick Inquiry
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={inquiry}
                                    onChange={(e) => setInquiry(e.target.value)}
                                    placeholder="Ask us anything..."
                                    className="flex-1 px-5 py-3 rounded-xl text-sm text-white placeholder:text-gray-600 transition-all focus:outline-none focus:ring-1 focus:ring-[#8B9FE8]/30"
                                    style={{
                                        background: "rgba(15, 17, 23, 0.6)",
                                        border: "1px solid rgba(255, 255, 255, 0.06)",
                                        backdropFilter: "blur(12px)",
                                    }}
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 rounded-xl text-sm font-medium tracking-wide transition-all cursor-pointer"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(139, 159, 232, 0.15) 0%, rgba(79, 70, 229, 0.2) 100%)",
                                        border: "1px solid rgba(139, 159, 232, 0.25)",
                                        color: "#8B9FE8",
                                    }}
                                >
                                    {submitted ? "Sent Γ£ô" : "Send"}
                                </motion.button>
                            </div>
                        </form>
                    </div>

                    {/* Right Column ΓÇö Information */}
                    <div className="grid grid-cols-2 gap-12">
                        {/* Sitemap */}
                        <div>
                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-5">
                                Sitemap
                            </div>
                            <ul className="space-y-3">
                                {[
                                    { label: "Overview", href: "#overview" },
                                    { label: "Capabilities", href: "#capabilities" },
                                    { label: "Architecture", href: "#architecture" },
                                    { label: "Contact", href: "#contact" },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: "smooth" });
                                            }}
                                            className="text-sm text-gray-400 hover:text-white transition-colors tracking-wide cursor-pointer"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Project & Social */}
                        <div>
                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-5">
                                Project
                            </div>
                            <ul className="space-y-3">
                                <li>
                                    <span className="text-sm text-gray-400 tracking-wide">AEGIS SRE Platform</span>
                                </li>
                                <li>
                                    <span className="text-sm text-gray-400 tracking-wide">College Project 2026</span>
                                </li>
                                <li>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors tracking-wide inline-flex items-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        GitHub
                                    </a>
                                </li>
                            </ul>

                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mt-8 mb-5">
                                Connect
                            </div>
                            <div className="flex gap-3">
                                {["LinkedIn", "Twitter"].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-white transition-all"
                                        style={{
                                            background: "rgba(255, 255, 255, 0.03)",
                                            border: "1px solid rgba(255, 255, 255, 0.06)",
                                        }}
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)" }}>
                    <div className="flex items-center gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#8B9FE8]/40">
                            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                            <path d="M12 7L7 10v4l5 3 5-3v-4l-5-3z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.15" />
                        </svg>
                        <span className="text-xs text-gray-600 tracking-wide">AEGIS SRE ΓÇö Autonomous Reliability Engineering</span>
                    </div>
                    <span className="text-xs text-gray-600 tracking-wide">┬⌐ 2026 AEGIS Project. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}