"use client";

import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { UnicornScene } from "unicornstudio-react";
import { InteractiveCard } from "@/components/InteractiveCard";

export function LandingView({ onEnterAegis }: { onEnterAegis: () => void }) {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 1000], [0, -400]);

    // Completely remove Unicorn Studio badge ΓÇö DOM + MutationObserver
    useEffect(() => {
        const removeWatermark = () => {
            document.querySelectorAll('a[href*="unicorn.studio"]').forEach(node => node.remove());
            document.querySelectorAll('[class*="unicorn"]').forEach(node => {
                if (node.tagName === 'A' || (node.textContent && node.textContent.includes('unicorn'))) {
                    node.remove();
                }
            });
        };

        // Aggressive polling for initial load
        const interval = setInterval(removeWatermark, 200);
        setTimeout(() => clearInterval(interval), 8000);

        // MutationObserver for dynamic injection
        const observer = new MutationObserver(() => removeWatermark());
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            {/* ΓöÇΓöÇΓöÇ Landing Hero ΓöÇΓöÇΓöÇ */}
            <div className="relative w-full text-white">
                {/* Background - Unicorn Studio (Only in Hero) */}
                <div
                    className="fixed top-0 left-0 w-full h-[100vh] pointer-events-none"
                    style={{
                        zIndex: 0,
                        maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
                    }}
                >
                    <UnicornScene
                        projectId="ye7FVUbWpTAYh806M04d"
                        width="100%"
                        height="100vh"
                    />
                </div>

                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center w-full relative z-10 pt-20">
                    {/* Decorative triple-arrow cursor trail element (static representation) */}
                    <div className="absolute top-[30%] left-[20%] opacity-40 mix-blend-screen pointer-events-none hidden md:block" style={{ transform: "rotate(-15deg)" }}>
                        <svg width="40" height="120" viewBox="0 0 40 120" fill="none" className="text-[#8B9FE8]">
                            <path d="M20 0 L40 20 M20 0 L0 20" stroke="currentColor" strokeWidth="2" />
                            <path d="M20 20 L40 40 M20 20 L0 40" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                            <path d="M20 40 L40 60 M20 40 L0 60" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                            <line x1="20" y1="0" x2="20" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                        </svg>
                    </div>

                    <motion.div
                        style={{ y: yText }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        <h1
                            className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 drop-shadow-2xl relative header-glow aegis-logo"
                            style={{
                                background: "linear-gradient(to top right, rgba(139, 120, 255, 0.7) 0%, rgba(180, 170, 240, 0.3) 30%, #ffffff 55%, #ffffff 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            AEGIS SRE
                        </h1>
                        <p className="text-xl md:text-2xl text-muted max-w-2xl text-center mb-12 font-medium tracking-wide">
                            Enterprise Reliability Command System
                        </p>

                        <motion.button
                            onClick={onEnterAegis}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-4 box-dna neon-highlight text-lg font-semibold tracking-wider transition-all text-[#FAFAFA]"
                        >
                            Initialize Agent
                        </motion.button>
                    </motion.div>
                </section>

                {/* Hero -> Content Transition Bar */}
                <div
                    className="w-full h-[120px] relative z-10"
                    style={{
                        background: "linear-gradient(to bottom, rgba(15,17,23,0) 0%, rgba(15,17,23,0.6) 40%, #0F1117 100%)",
                        borderTop: "1px solid rgba(255,255,255,0.06)"
                    }}
                />
            </div>

            {/* ΓöÇΓöÇΓöÇ Overview Section ΓöÇΓöÇΓöÇ same background system as Capabilities/Architecture */}
            <section id="overview" className="relative z-10 w-full">
                {/* Background parity: same gradient, glow, grain, vignette as other sections */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            radial-gradient(ellipse 70% 50% at 50% 40%, rgba(80, 20, 110, 0.15) 0%, transparent 70%),
                            radial-gradient(ellipse 90% 70% at 50% 50%, rgba(12, 10, 20, 0.0) 0%, rgba(5, 3, 10, 0.7) 100%),
                            linear-gradient(180deg, #080510 0%, #0C0816 30%, #090610 70%, #05030A 100%)
                        `,
                        zIndex: 0,
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            radial-gradient(ellipse 40% 30% at 30% 20%, rgba(224, 176, 255, 0.03) 0%, transparent 70%),
                            radial-gradient(ellipse 35% 25% at 70% 60%, rgba(74, 14, 96, 0.05) 0%, transparent 70%)
                        `,
                        zIndex: 0,
                    }}
                />
                {/* Grain texture */}
                <div
                    className="absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
                        zIndex: 1,
                    }}
                />
                {/* Vignette */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                        zIndex: 1,
                    }}
                />

                <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
                    {/* Staggered vertical stack ΓÇö not a grid */}
                    <div className="flex flex-col gap-16">
                        {/* Section 1 ΓÇö full width band */}
                        <InteractiveCard
                            className="w-full p-10 lg:p-14 box-dna texture-c"
                            entryDelay={0}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                                <div className="flex-1">
                                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/80 mb-4">Observe</div>
                                    <h2 className="text-2xl md:text-3xl font-bold header-glow mb-3 tracking-tight text-white aegis-logo">Real-Time Telemetry</h2>
                                    <p className="text-muted leading-relaxed max-w-lg">
                                        Monitor telemetry, traces, and critical metrics across the entire architectural stack with sub-second precision.
                                    </p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <span className="text-xs font-mono uppercase tracking-wider text-[#8B9FE8] block neon-highlight">99.999% SLA Uptime</span>
                                </div>
                            </div>
                        </InteractiveCard>

                        {/* Section 2 ΓÇö two-column split, uneven */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <InteractiveCard
                                className="lg:col-span-7 p-10 lg:p-14 box-dna texture-b"
                                entryDelay={0.1}
                            >
                                <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/80 mb-4">Reason</div>
                                <h2 className="text-2xl md:text-3xl font-bold header-glow mb-3 tracking-tight text-white aegis-logo">LLM-Powered Root Cause Analysis</h2>
                                <p className="text-muted leading-relaxed max-w-lg">
                                    Automate root cause analysis with LLM-powered insights, correlating spikes and anomalies instantaneously.
                                </p>
                                <div className="mt-6">
                                    <span className="text-xs font-mono uppercase tracking-wider text-[#8B9FE8] neon-highlight">&lt; 200ms Inference</span>
                                </div>
                            </InteractiveCard>

                            <InteractiveCard
                                className="lg:col-span-5 p-10 flex flex-col justify-center box-dna texture-a"
                                entryDelay={0.2}
                            >
                                <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/80 mb-4">Act</div>
                                <h2 className="text-2xl font-bold header-glow mb-3 tracking-tight text-white aegis-logo">Autonomous Remediation</h2>
                                <p className="text-muted leading-relaxed">
                                    Execute remediation workflows, scale infrastructure, or rollback deployments seamlessly.
                                </p>
                                <div className="mt-6">
                                    <span className="text-xs font-mono uppercase tracking-wider text-[#8B9FE8] neon-highlight">0 Human Interventions</span>
                                </div>
                            </InteractiveCard>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}