/**
 * AEGIS Motion System
 * ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
 * Central configuration for all animation behavior.
 * Inspired by card entry, hover depth, and selection semantics
 * from professional Framer interaction patterns ΓÇö translated into
 * pure Framer Motion (no Framer runtime dependency).
 *
 * RULES:
 *  - All animations are subtle, short, and interaction-driven
 *  - No continuous loops outside the hero
 *  - Motion communicates system state: reveal, focus, selection
 *  - Global intensity multiplier allows future A/B tuning
 */

// ΓöÇΓöÇ Global Tuning ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
export const MOTION_INTENSITY = 1; // 0 = off, 0.5 = half, 1 = full

// ΓöÇΓöÇ Easing Curves ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// "System Ease" ΓÇö communicates agent precision, not playfulness
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;
export const EASE_SPRING = { type: "spring", stiffness: 280, damping: 26 } as const;

// ΓöÇΓöÇ Duration Scale ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
export const DURATION = {
    instant: 0.08,
    fast: 0.18,
    moderate: 0.32,
    slow: 0.55,
    cinematic: 0.85,
} as const;

// ΓöÇΓöÇ Card Entry (Reveal) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Semantics: "data becoming available" ΓÇö clean upward emergence
export const CARD_ENTRY_VARIANTS = {
    hidden: {
        opacity: 0,
        y: 18 * MOTION_INTENSITY,
        filter: "blur(2px)",
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
    },
} as const;

export const CARD_ENTRY_TRANSITION = {
    duration: DURATION.cinematic,
    ease: EASE_OUT_EXPO,
} as const;

// ΓöÇΓöÇ Stagger Children (Sequential Appearance) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Semantics: "agent workflow progression"
export const STAGGER_CONTAINER = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0,
        },
    },
} as const;

// ΓöÇΓöÇ Hover Depth (Mouse-Driven Parallax Feel) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Semantics: "indicates interactivity" ΓÇö restrained 3D tilt
export const HOVER_LIFT = {
    rest: {
        y: 0,
        scale: 1,
        boxShadow: "0 0 0 0 rgba(192, 132, 252, 0)",
    },
    hover: {
        y: -3 * MOTION_INTENSITY,
        scale: 1.005,
        boxShadow: `0 0 24px rgba(192, 132, 252, ${0.07 * MOTION_INTENSITY})`,
    },
} as const;

export const HOVER_TRANSITION = {
    duration: DURATION.moderate,
    ease: EASE_OUT_EXPO,
} as const;

// ΓöÇΓöÇ Click / Selection Feedback ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Semantics: "action focus" ΓÇö brief, confirmatory press
export const TAP_FEEDBACK = {
    scale: 1 - (0.006 * MOTION_INTENSITY),
} as const;

// ΓöÇΓöÇ Row Focus (Table / Timeline entries) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Semantics: "selectable action" ΓÇö restrained border illuminate
export const ROW_FOCUS_VARIANTS = {
    rest: {
        backgroundColor: "rgba(255,255,255,0)",
        borderLeft: "2px solid rgba(192, 132, 252, 0)",
        paddingLeft: "0px",
    },
    hover: {
        backgroundColor: "rgba(192, 132, 252, 0.03)",
        borderLeft: "2px solid rgba(192, 132, 252, 0.4)",
        paddingLeft: "6px",
    },
} as const;

export const ROW_FOCUS_TRANSITION = {
    duration: DURATION.fast,
    ease: EASE_IN_OUT_QUART,
} as const;

// ΓöÇΓöÇ Timeline Entry ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
// Sequential appearance with slight x-axis origin
export const TIMELINE_ENTRY_VARIANTS = {
    hidden: { opacity: 0, x: -10 * MOTION_INTENSITY },
    visible: { opacity: 1, x: 0 },
} as const;

export const TIMELINE_ENTRY_TRANSITION = {
    duration: DURATION.slow,
    ease: EASE_OUT_EXPO,
} as const;

// ΓöÇΓöÇ Panel Update (Gentle Data Transition) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
export const PANEL_UPDATE_TRANSITION = {
    duration: DURATION.moderate,
    ease: EASE_IN_OUT_QUART,
} as const;

// ΓöÇΓöÇ Signal Reveal ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
export const SIGNAL_VARIANTS = {
    hidden: { opacity: 0, x: 8 * MOTION_INTENSITY },
    visible: { opacity: 1, x: 0 },
} as const;

export const SIGNAL_TRANSITION = {
    duration: DURATION.fast,
    ease: EASE_OUT_EXPO,
} as const;