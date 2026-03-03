"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

/**
 * Capabilities section ΓÇö Interactive vertical timeline with expandable reveals.
 * No bento boxes ΓÇö uses timeline + progressive disclosure per L-06.
 * 
 * Design: "Deep Space" palette, clean vertical flow, hover/click reveals.
 */

interface Capability {
    id: string;
    phase: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    stats: { value: string; label: string }[];
}

const capabilities: Capability[] = [
    {
        id: "observe",
        phase: "01",
        title: "Telemetry Ingestion",
        subtitle: "& Anomaly Detection",
        description:
            "AEGIS absorbs millions of signals per second ΓÇö traces, metrics, logs, and events ΓÇö feeding them through a multi-layered anomaly detection mesh. Temporal pattern recognition surfaces deviations before they cascade into outages.",
        details: [
            "Multi-protocol ingestion: OpenTelemetry, Prometheus, StatsD, custom agents",
            "Temporal anomaly detection with sliding-window statistical baselines",
            "Topology-aware signal correlation across distributed microservices",
            "Sub-second detection pipeline from signal receipt to alert propagation",
        ],
        stats: [
            { value: "1.2M", label: "Events / sec" },
            { value: "<50ms", label: "Detection latency" },
            { value: "99.97%", label: "Precision" },
        ],
    },
    {
        id: "reason",
        phase: "02",
        title: "Root Cause Reasoning",
        subtitle: "& Signal Correlation",
        description:
            "LLM-powered reasoning engine cross-references telemetry streams, deployment manifests, and historical incident data to isolate root causes with surgical accuracy. Multi-hop causal inference chains replace manual runbook triage.",
        details: [
            "Multi-hop causal inference across correlated telemetry clusters",
            "Historical incident memory enrichment for every hypothesis",
            "Confidence-scored root cause hypotheses with explainable chains",
            "Temporal pattern matching for anomaly precursor detection",
        ],
        stats: [
            { value: "94%", label: "Accuracy" },
            { value: "<200ms", label: "Inference" },
        ],
    },
    {
        id: "act",
        phase: "03",
        title: "Autonomous Remediation",
        subtitle: "& Safe Execution",
        description:
            "AEGIS doesn't just diagnose ΓÇö it acts. Approved remediation workflows execute infrastructure-level operations: process termination, resource scaling, deployment rollbacks, and configuration hot-patches.",
        details: [
            "Process Lifecycle Management with graceful shutdown orchestration",
            "Horizontal & Vertical Scaling with capacity-aware scheduling",
            "Deployment Rollback Chains with canary verification gates",
            "Config Hot-Patch Execution with validation and instant rollback",
        ],
        stats: [
            { value: "0", label: "Human Interventions" },
            { value: "<4s", label: "Mean Time to Remediate" },
        ],
    },
];

function CapabilityNode({ cap, index }: { cap: Capability; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <ScrollReveal delay={index * 0.1} className="relative z-10">
            <div className="max-w-6xl mx-auto relative">
                {/* Timeline center line continuation */}
                <div
                    className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
                    style={{
                        background: "linear-gradient(180deg, rgba(139, 159, 232, 0.12) 0%, rgba(139, 159, 232, 0.04) 100%)",
                        transform: "translateX(-50%)",
                    }}
                />

                {/* Node indicator */}
                <div
                    className="absolute left-1/2 top-8 w-3 h-3 rounded-full hidden lg:block"
                    style={{
                        transform: "translateX(-50%)",
                        background: isOpen
                            ? "linear-gradient(135deg, #8B9FE8 0%, #4F46E5 100%)"
                            : "rgba(139, 159, 232, 0.25)",
                        border: "2px solid rgba(139, 159, 232, 0.3)",
                        boxShadow: isOpen ? "0 0 12px rgba(139, 159, 232, 0.4)" : "none",
                        transition: "all 0.4s ease",
                        zIndex: 5,
                    }}
                />

                {/* Content ΓÇö alternating left/right on desktop */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 ${isEven ? "" : "lg:direction-rtl"}`}>
                    <div className={`${isEven ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"}`}>
                        {/* Phase label */}
                        <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/60 mb-3">
                            {cap.phase} ΓÇö {cap.id.charAt(0).toUpperCase() + cap.id.slice(1)}
                        </div>

                        {/* Title ΓÇö clickable reveal */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`text-left ${isEven ? "lg:text-right lg:ml-auto" : ""} group cursor-pointer bg-transparent border-none w-full`}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 header-glow inline">
                                {cap.title}
                            </h2>
                            <span className="text-2xl md:text-3xl font-bold tracking-tight text-gray-500 block">
                                {cap.subtitle}
                            </span>
                            <div className="mt-3 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8B9FE8]/40 group-hover:text-[#8B9FE8]/80 transition-colors"
                                style={isEven ? { justifyContent: "flex-end" } : {}}>
                                <span>{isOpen ? "Collapse" : "Expand details"}</span>
                                <motion.span
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="inline-block"
                                >
                                    Γåô
                                </motion.span>
                            </div>
                        </button>

                        {/* Description ΓÇö always visible */}
                        <p className="text-muted leading-relaxed max-w-lg mt-4" style={isEven ? { marginLeft: "auto" } : {}}>
                            {cap.description}
                        </p>

                        {/* Stats bar ΓÇö always visible */}
                        <div className={`flex gap-8 mt-6 text-sm font-mono ${isEven ? "justify-end" : ""}`}>
                            {cap.stats.map((stat, i) => (
                                <div key={i}>
                                    <div className="text-[#A0B4F0] text-xl font-bold mb-1 neon-highlight">{stat.value}</div>
                                    <div className="text-gray-500 uppercase tracking-wider text-xs">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Expandable details */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(139, 159, 232, 0.08)" }}>
                                        <div className="space-y-3">
                                            {cap.details.map((detail, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.08, duration: 0.3 }}
                                                    className={`flex items-start gap-3 ${isEven ? "justify-end" : ""}`}
                                                >
                                                    {isEven && (
                                                        <span className="text-[13px] leading-relaxed text-gray-300 tracking-wide">
                                                            {detail}
                                                        </span>
                                                    )}
                                                    <span
                                                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                        style={{ background: "rgba(139, 159, 232, 0.4)" }}
                                                    />
                                                    {!isEven && (
                                                        <span className="text-[13px] leading-relaxed text-gray-300 tracking-wide">
                                                            {detail}
                                                        </span>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Decorative side ΓÇö visual flourish */}
                    <div className={`hidden lg:block relative ${isEven ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}`}>
                        <div className="absolute inset-0 flex items-start pt-8">
                            <div
                                className="w-full h-[200px] rounded-2xl"
                                style={{
                                    background: `radial-gradient(ellipse 80% 60% at ${isEven ? "30%" : "70%"} 50%, rgba(139, 159, 232, 0.04) 0%, transparent 70%)`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}

export function CapabilitiesSection() {
    return (
        <section id="capabilities" className="relative w-full text-white overflow-x-hidden">
            {/* Section-specific background ΓÇö not merged with other sections */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse 70% 50% at 50% 40%, rgba(60, 70, 140, 0.12) 0%, transparent 70%),
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
                        radial-gradient(ellipse 40% 30% at 30% 20%, rgba(160, 180, 240, 0.03) 0%, transparent 70%),
                        radial-gradient(ellipse 35% 25% at 70% 60%, rgba(60, 70, 140, 0.05) 0%, transparent 70%)
                    `,
                    zIndex: 0,
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/></svg>')",
                    zIndex: 1,
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                    zIndex: 1,
                }}
            />

            {/* ΓöÇΓöÇΓöÇ Hero ΓöÇΓöÇΓöÇ */}
            <ScrollReveal className="relative z-10 pt-24 pb-20 px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-gradient mb-6 drop-shadow-2xl header-glow">
                        Capabilities
                    </h1>
                    <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto tracking-wide font-medium">
                        Autonomous reliability ΓÇö from signal ingestion to self-healing infrastructure
                    </p>
                </div>
            </ScrollReveal>

            {/* ΓöÇΓöÇΓöÇ Central Timeline ΓöÇΓöÇΓöÇ */}
            <div className="relative z-10 px-8 pb-32">
                {/* Vertical timeline line */}
                <div
                    className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
                    style={{
                        background: "linear-gradient(180deg, transparent 0%, rgba(139, 159, 232, 0.1) 10%, rgba(139, 159, 232, 0.1) 90%, transparent 100%)",
                        transform: "translateX(-50%)",
                    }}
                />

                <div className="space-y-24">
                    {capabilities.map((cap, index) => (
                        <CapabilityNode key={cap.id} cap={cap} index={index} />
                    ))}
                </div>
            </div>

            <div className="relative z-10 h-8" />
        </section>
    );
}