"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { InteractiveCard } from "@/components/InteractiveCard";

/* ΓöÇΓöÇΓöÇ Types ΓöÇΓöÇΓöÇ */
interface TierData {
    id: string;
    label: string;
    title: string;
    desc: string;
    align: "left" | "right";
    synopsis: string[];
}

/* ΓöÇΓöÇΓöÇ Detail Tile ΓÇö Glassmorphism Synopsis Panel ΓöÇΓöÇΓöÇ */
function DetailTile({ tier, index }: { tier: TierData; index: number }) {
    /*
     * GLASSMORPHISM SPEC:
     * - Background: translucent dark purple (rgba(20, 8, 40, 0.85))
     * - Backdrop blur: 28px (heavy smoked glass)
     * - Border: subtle translucent white inner bevel (inset box-shadow + border)
     * - Position: floats to the right of the card, offset ~12px outward on entrance
     *
     * frontend-design skill: "Layered translucency" with "narrative intent" shadows.
     * canvas-design skill: "Painstaking attention" to beveled edge detail.
     * scroll-experience skill: Not scroll-driven, purely hover ΓÇö no hijacking risk.
     */
    return (
        <motion.div
            initial={{ opacity: 0, x: -12, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.98 }}
            transition={{
                duration: 0.3,
                ease: [0.33, 1, 0.68, 1],
            }}
            style={{
                position: "absolute",
                // Position: to the right of the card, vertically centered
                left: `calc(${index * 13}% + 46%)`,
                top: `calc(${index * 19}% + 20px)`,
                width: "min(340px, 40%)",
                zIndex: 100,
                pointerEvents: "none",
            }}
            className="hidden lg:block"
        >
            {/* Smoked purple glass panel */}
            <div
                style={{
                    background: "linear-gradient(135deg, rgba(20, 8, 40, 0.88) 0%, rgba(12, 4, 28, 0.92) 100%)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    boxShadow: `
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.02),
                        inset 1px 0 0 rgba(255, 255, 255, 0.04),
                        inset -1px 0 0 rgba(255, 255, 255, 0.04),
                        0 8px 32px rgba(0, 0, 0, 0.5),
                        0 0 60px rgba(60, 70, 140, 0.15)
                    `,
                    padding: "24px 28px",
                }}
            >
                {/* Tier badge */}
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
                        style={{
                            background: "linear-gradient(135deg, rgba(139, 159, 232, 0.25) 0%, rgba(79, 70, 229, 0.2) 100%)",
                            border: "1px solid rgba(139, 159, 232, 0.3)",
                            color: "#8B9FE8",
                        }}
                    >
                        {tier.label}
                    </div>
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#8B9FE8]/60">
                        Synopsis
                    </div>
                </div>

                {/* Synopsis content ΓÇö high contrast for legibility */}
                <ul className="space-y-2.5">
                    {tier.synopsis.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: "rgba(139, 159, 232, 0.5)" }}
                            />
                            <span className="text-[13px] leading-relaxed text-[#D0D8F0]/90">
                                {point}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

/* ΓöÇΓöÇΓöÇ Staircase Card Component ΓöÇΓöÇΓöÇ */
function StaircaseCard({
    tier,
    index,
    total,
    isExpanded,
    isHovered,
    onHoverStart,
    onHoverEnd,
}: {
    tier: TierData;
    index: number;
    total: number;
    isExpanded: boolean;
    isHovered: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}) {
    // Collapsed: tight stack with 4px peek-offset per card
    const collapsedLeft = index * 4;
    const collapsedTop = index * 4;

    // Expanded: wide diagonal fan
    const expandedLeft = `${index * 13}%`;
    const expandedTop = `${index * 19}%`;

    // Stagger: later tiers start moving slightly later
    const delay = index * 0.12;

    return (
        <motion.div
            animate={{
                left: isExpanded ? expandedLeft : collapsedLeft,
                top: isExpanded ? expandedTop : collapsedTop,
            }}
            transition={{
                left: { type: "tween", ease: [0.33, 1, 0.68, 1], duration: 1.0, delay },
                top: { type: "tween", ease: [0.33, 1, 0.68, 1], duration: 1.0, delay },
            }}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            style={{
                position: "absolute",
                width: "44%",
                // Hovered card lifts to foreground; otherwise Tier 05 stays highest
                zIndex: isHovered ? total + 20 : index + 10,
                borderRadius: "28px",
                border: "1px solid transparent",
                // Active glow when hovered
                boxShadow: isHovered
                    ? "0 0 24px rgba(139, 159, 232, 0.3), 0 0 60px rgba(60, 70, 140, 0.15)"
                    : "none",
                borderColor: isHovered
                    ? "rgba(139, 159, 232, 0.4)"
                    : "transparent",
                transition: "box-shadow 0.25s ease, border-color 0.25s ease",
            }}
            className="bg-[#05020A]"
        >
            <div className={`w-full h-full min-h-[250px] p-8 md:p-10 lg:p-14 box-dna ${index % 2 === 0 ? "texture-c" : "texture-b"}`}>
                <div className="relative z-10 pointer-events-none">
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-4">
                        {tier.label} ΓÇö Tier
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 header-glow aegis-logo">
                        {tier.title}
                    </h3>
                    <p className="text-muted text-sm md:text-base leading-relaxed max-w-lg">
                        {tier.desc}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ΓöÇΓöÇΓöÇ Tier data with synopsis ΓöÇΓöÇΓöÇ */
const tiers: TierData[] = [
    {
        id: "sources",
        label: "01",
        title: "Data Sources",
        desc: "Application logs, infrastructure metrics, distributed traces, deployment events, and configuration state changes stream continuously from your production environment.",
        align: "left" as const,
        synopsis: [
            "Structured & unstructured application logs with contextual metadata tagging",
            "Infrastructure metrics: CPU, memory, disk I/O, network throughput at 10s granularity",
            "Distributed traces spanning microservice call graphs with span-level latency attribution",
            "Deployment events: git SHA, rollout percentage, canary health signals",
            "Configuration drift detection via state snapshot diffing across clusters",
        ],
    },
    {
        id: "ingestion",
        label: "02",
        title: "Ingestion & Streaming",
        desc: "High-throughput ingestion pipeline normalizes, enriches, and routes signals through a real-time streaming mesh. Schema-aware parsing ensures consistency across heterogeneous telemetry formats.",
        align: "right" as const,
        synopsis: [
            "High-throughput ingestion at 2M+ events/sec with back-pressure flow control",
            "Real-time streaming mesh with exactly-once delivery guarantees",
            "Schema-aware parsing: auto-detects OpenTelemetry, Prometheus, and custom formats",
            "Signal enrichment: geo-tagging, service topology mapping, ownership attribution",
            "Dynamic routing rules with priority lanes for critical signal classes",
        ],
    },
    {
        id: "reasoning",
        label: "03",
        title: "Reasoning & Correlation",
        desc: "LLM-powered reasoning engine performs multi-hop causal inference across correlated signal clusters. Temporal pattern matching and topological analysis isolate root causes within milliseconds.",
        align: "left" as const,
        synopsis: [
            "LLM-powered causal reasoning with multi-hop inference chains across signal clusters",
            "Temporal pattern matching: detects anomaly precursors up to 15 minutes before impact",
            "Topological analysis maps blast radius across service dependency graphs",
            "Correlation engine links metrics, logs, traces into unified incident narratives",
            "Confidence-scored root cause hypotheses with explainable reasoning chains",
        ],
    },
    {
        id: "execution",
        label: "04",
        title: "Execution & Control",
        desc: "Validated remediation plans dispatch through an execution gateway with configurable approval policies. Infrastructure-as-code operations execute atomically with automatic rollback safety nets.",
        align: "right" as const,
        synopsis: [
            "Validated remediation plans with dry-run simulation before live execution",
            "Configurable approval policies: auto-approve, single-reviewer, or multi-party consensus",
            "Infrastructure-as-code operations execute atomically with transaction-style rollback",
            "Blast radius containment: progressive rollout with automatic halt on degradation",
            "Cryptographic audit trail with provenance chain for every automated action",
        ],
    },
    {
        id: "feedback",
        label: "05",
        title: "Feedback & Observability Loop",
        desc: "Post-action effectiveness is measured against baseline SLIs. Outcomes feed back into the reasoning model, continuously improving accuracy and reducing false-positive rates over time.",
        align: "left" as const,
        synopsis: [
            "Post-action SLI measurement: compares pre/post-remediation error budgets",
            "Outcome telemetry feeds back into reasoning model for continuous calibration",
            "False-positive rate tracking with automated threshold adjustment per service",
            "Remediation effectiveness scoring: time-to-resolution, recurrence frequency, blast radius",
            "Weekly model accuracy reports with drift detection and retraining triggers",
        ],
    },
];

/**
 * Architecture section ΓÇö rendered inline on the single page.
 * Stacked Staircase gallery with glassmorphism Detail Tiles.
 */
export function ArchitectureSection() {
    const staircaseRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    /*
     * ONE-WAY EXIT LOGIC:
     * - EXPAND when 30% of the staircase container is visible (scrolling down).
     * - STAY EXPANDED as long as user is at or below the section.
     * - RETRACT only when user scrolls UP past the section header (top of section
     *   is below the viewport ΓÇö i.e., user has scrolled above the section).
     */
    useEffect(() => {
        const onScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const windowH = window.innerHeight;

            // Section top is above viewport bottom by at least 30% of section height
            const hasEnteredEnough = rect.top < windowH * 0.7;
            // User has scrolled back UP above the section (section top is below viewport top)
            const hasScrolledAbove = rect.top > windowH * 0.5;

            if (hasEnteredEnough && !hasScrolledAbove) {
                setIsExpanded(true);
            } else if (hasScrolledAbove) {
                setIsExpanded(false);
            }
            // If user is BELOW the section (rect.bottom < 0), keep expanded
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <section id="architecture" ref={sectionRef} className="relative w-full text-white overflow-x-hidden">
            {/* Section-specific background ΓÇö not merged with other sections */}
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
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gradient mb-6 drop-shadow-2xl header-glow aegis-logo">
                        Architecture
                    </h1>
                    <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto tracking-wide font-medium">
                        Five-tier autonomous reliability pipeline ΓÇö from raw signal to closed-loop healing
                    </p>
                </div>
            </ScrollReveal>

            {/* SYSTEM FLOW ΓÇö "Stacked Staircase" Gallery + Detail Tiles */}
            <div className="relative z-10 px-8 mb-24">
                <div
                    ref={staircaseRef}
                    className="max-w-6xl mx-auto relative w-full h-[1200px] md:h-[1400px] lg:h-[1600px]"
                >
                    {tiers.map((tier, index) => (
                        <StaircaseCard
                            key={tier.id}
                            tier={tier}
                            index={index}
                            total={tiers.length}
                            isExpanded={isExpanded}
                            isHovered={hoveredIndex === index}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                        />
                    ))}

                    {/* Glassmorphism Detail Tile ΓÇö only one visible at a time */}
                    <AnimatePresence mode="wait">
                        {hoveredIndex !== null && isExpanded && (
                            <DetailTile
                                key={tiers[hoveredIndex].id}
                                tier={tiers[hoveredIndex]}
                                index={hoveredIndex}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* SUPPLEMENTAL ΓÇö Bento-style architecture summary */}
            <ScrollReveal delay={0.15} className="relative z-10 px-8 mb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary/60 mb-6 px-2">System Overview</div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Main bento card */}
                        <InteractiveCard
                            className="lg:col-span-8 p-12 lg:p-14 min-h-[350px] flex flex-col justify-between box-dna texture-a"
                            entryDelay={0.1}
                        >
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-5 leading-[1.15] header-glow aegis-logo">
                                    Closed-Loop<br />
                                    <span className="text-gray-500">Reliability Engine</span>
                                </h2>
                                <p className="text-muted leading-relaxed max-w-xl">
                                    AEGIS operates as a continuous feedback system. Every remediation
                                    outcome refines the reasoning model. Anomaly baselines adapt to
                                    infrastructure drift. The platform becomes more precise with every
                                    incident it processes ΓÇö converging toward zero human intervention
                                    for known failure modes.
                                </p>
                            </div>
                            <div className="relative z-10 flex gap-10 mt-8 text-sm font-mono">
                                <div>
                                    <div className="text-primary text-xl font-bold mb-1 neon-highlight">5</div>
                                    <div className="text-gray-500 uppercase tracking-wider text-xs">Processing Tiers</div>
                                </div>
                                <div>
                                    <div className="text-primary text-xl font-bold mb-1 neon-highlight">Γê₧</div>
                                    <div className="text-gray-500 uppercase tracking-wider text-xs">Feedback Loops</div>
                                </div>
                                <div>
                                    <div className="text-primary text-xl font-bold mb-1 neon-highlight">&lt;12s</div>
                                    <div className="text-gray-500 uppercase tracking-wider text-xs">End-to-End Cycle</div>
                                </div>
                            </div>
                        </InteractiveCard>

                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <InteractiveCard
                                className="p-10 flex-[1.4] flex flex-col justify-center box-dna texture-b"
                                entryDelay={0.2}
                            >
                                <h3 className="text-xl font-bold text-white mb-3 header-glow aegis-logo">Extensible Pipeline</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    Every tier exposes plugin interfaces ΓÇö custom anomaly
                                    detectors, bespoke reasoning modules, and organization-specific
                                    remediation playbooks integrate seamlessly.
                                </p>
                            </InteractiveCard>

                            <InteractiveCard
                                className="p-10 flex-[0.6] flex flex-col justify-center box-dna texture-c"
                                entryDelay={0.3}
                            >
                                <h3 className="text-xl font-bold text-white mb-3 header-glow aegis-logo">Zero-Trust Execution</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    All remediation actions traverse an audit gateway with
                                    cryptographic provenance and approval chain verification.
                                </p>
                            </InteractiveCard>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            <div className="relative z-10 h-32" />
        </section>
    );
}