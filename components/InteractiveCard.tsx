"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    CARD_ENTRY_VARIANTS,
    CARD_ENTRY_TRANSITION,
    HOVER_LIFT,
    HOVER_TRANSITION,
    TAP_FEEDBACK,
} from "@/lib/motion";

interface InteractiveCardProps {
    children: React.ReactNode;
    className?: string;
    /** Delay for the entry reveal animation (seconds) */
    entryDelay?: number;
    /** Whether to animate on scroll-into-view (true) or immediately (false) */
    revealOnScroll?: boolean;
    /** Disable hover depth effect ΓÇö for purely presentational cards */
    noHover?: boolean;
    /** Disable the press/tap feedback */
    noTap?: boolean;
    /** Additional inline style */
    style?: React.CSSProperties;
    /** Click handler */
    onClick?: () => void;
}

/**
 * InteractiveCard
 * ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
 * Reusable motion wrapper for AEGIS cards.
 * Provides:
 *   - Scroll-triggered entry reveal (fade + rise + deblur)
 *   - Hover depth lift (subtle Y shift + glow bloom)
 *   - Click/tap confirmatory press feedback
 *
 * Wraps children without altering visual design.
 * Apply className/style to preserve the AEGIS box-dna system.
 */
export function InteractiveCard({
    children,
    className = "",
    entryDelay = 0,
    revealOnScroll = true,
    noHover = false,
    noTap = false,
    style,
    onClick,
}: InteractiveCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    const shouldReveal = revealOnScroll ? isInView : true;

    return (
        <motion.div
            ref={ref}
            // ΓöÇΓöÇ Entry animation ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
            variants={CARD_ENTRY_VARIANTS}
            initial="hidden"
            animate={shouldReveal ? "visible" : "hidden"}
            transition={{ ...CARD_ENTRY_TRANSITION, delay: entryDelay }}
            // ΓöÇΓöÇ Hover depth ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
            whileHover={noHover ? undefined : HOVER_LIFT.hover}
            // ΓöÇΓöÇ Press feedback ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
            whileTap={noTap ? undefined : TAP_FEEDBACK}
            // ΓöÇΓöÇ Reset after hover ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
            style={{ ...style, willChange: "transform, opacity" }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}