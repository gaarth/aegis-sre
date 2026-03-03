module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/aegis_sre/components/Navigation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const navLinks = [
    {
        label: "Overview",
        anchor: "overview"
    },
    {
        label: "Capabilities",
        anchor: "capabilities"
    },
    {
        label: "Architecture",
        anchor: "architecture"
    }
];
function Navigation() {
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("overview");
    const handleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((anchor)=>{
        const el = document.getElementById(anchor);
        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }, []);
    /* Scroll-position-aware active state */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>{
            const scrollY = window.scrollY + 120; // offset for nav height
            let current = "overview";
            for (const link of navLinks){
                const el = document.getElementById(link.anchor);
                if (el && el.offsetTop <= scrollY) {
                    current = link.anchor;
                }
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        onScroll();
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 bg-[#0F1117]/60 backdrop-blur-[16px] border-b border-white/5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        className: "text-[#A0B4F0]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 2L3 7v10l9 5 9-5V7l-9-5z",
                                stroke: "currentColor",
                                strokeWidth: "1.5",
                                fill: "none"
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/Navigation.tsx",
                                lineNumber: 43,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M12 7L7 10v4l5 3 5-3v-4l-5-3z",
                                stroke: "currentColor",
                                strokeWidth: "1",
                                fill: "currentColor",
                                fillOpacity: "0.15"
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/Navigation.tsx",
                                lineNumber: 44,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/Navigation.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleClick("overview"),
                        className: "font-bold tracking-widest text-lg text-white hover:text-white cursor-pointer bg-transparent border-none",
                        children: "AEGIS SRE"
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/Navigation.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aegis_sre/components/Navigation.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-8 text-sm font-medium text-gray-400",
                children: navLinks.map((link)=>{
                    const isActive = activeSection === link.anchor;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleClick(link.anchor),
                        className: `relative cursor-pointer transition-colors hover:text-white bg-transparent border-none ${isActive ? "text-white" : ""}`,
                        children: [
                            link.label,
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -bottom-7 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#A0B4F0] to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/Navigation.tsx",
                                lineNumber: 64,
                                columnNumber: 33
                            }, this)
                        ]
                    }, link.anchor, true, {
                        fileName: "[project]/aegis_sre/components/Navigation.tsx",
                        lineNumber: 57,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/Navigation.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[120px]"
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/Navigation.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aegis_sre/components/Navigation.tsx",
        lineNumber: 40,
        columnNumber: 9
    }, this);
}
}),
"[project]/aegis_sre/lib/motion.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * AEGIS Motion System
 * ─────────────────────────────────────────────────────────────
 * Central configuration for all animation behavior.
 * Inspired by card entry, hover depth, and selection semantics
 * from professional Framer interaction patterns — translated into
 * pure Framer Motion (no Framer runtime dependency).
 *
 * RULES:
 *  - All animations are subtle, short, and interaction-driven
 *  - No continuous loops outside the hero
 *  - Motion communicates system state: reveal, focus, selection
 *  - Global intensity multiplier allows future A/B tuning
 */ // ── Global Tuning ──────────────────────────────────────────────
__turbopack_context__.s([
    "CARD_ENTRY_TRANSITION",
    ()=>CARD_ENTRY_TRANSITION,
    "CARD_ENTRY_VARIANTS",
    ()=>CARD_ENTRY_VARIANTS,
    "DURATION",
    ()=>DURATION,
    "EASE_IN_OUT_QUART",
    ()=>EASE_IN_OUT_QUART,
    "EASE_OUT_EXPO",
    ()=>EASE_OUT_EXPO,
    "EASE_SPRING",
    ()=>EASE_SPRING,
    "HOVER_LIFT",
    ()=>HOVER_LIFT,
    "HOVER_TRANSITION",
    ()=>HOVER_TRANSITION,
    "MOTION_INTENSITY",
    ()=>MOTION_INTENSITY,
    "PANEL_UPDATE_TRANSITION",
    ()=>PANEL_UPDATE_TRANSITION,
    "ROW_FOCUS_TRANSITION",
    ()=>ROW_FOCUS_TRANSITION,
    "ROW_FOCUS_VARIANTS",
    ()=>ROW_FOCUS_VARIANTS,
    "SIGNAL_TRANSITION",
    ()=>SIGNAL_TRANSITION,
    "SIGNAL_VARIANTS",
    ()=>SIGNAL_VARIANTS,
    "STAGGER_CONTAINER",
    ()=>STAGGER_CONTAINER,
    "TAP_FEEDBACK",
    ()=>TAP_FEEDBACK,
    "TIMELINE_ENTRY_TRANSITION",
    ()=>TIMELINE_ENTRY_TRANSITION,
    "TIMELINE_ENTRY_VARIANTS",
    ()=>TIMELINE_ENTRY_VARIANTS
]);
const MOTION_INTENSITY = 1; // 0 = off, 0.5 = half, 1 = full
const EASE_OUT_EXPO = [
    0.16,
    1,
    0.3,
    1
];
const EASE_IN_OUT_QUART = [
    0.76,
    0,
    0.24,
    1
];
const EASE_SPRING = {
    type: "spring",
    stiffness: 280,
    damping: 26
};
const DURATION = {
    instant: 0.08,
    fast: 0.18,
    moderate: 0.32,
    slow: 0.55,
    cinematic: 0.85
};
const CARD_ENTRY_VARIANTS = {
    hidden: {
        opacity: 0,
        y: 18 * MOTION_INTENSITY,
        filter: "blur(2px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)"
    }
};
const CARD_ENTRY_TRANSITION = {
    duration: DURATION.cinematic,
    ease: EASE_OUT_EXPO
};
const STAGGER_CONTAINER = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0
        }
    }
};
const HOVER_LIFT = {
    rest: {
        y: 0,
        scale: 1,
        boxShadow: "0 0 0 0 rgba(192, 132, 252, 0)"
    },
    hover: {
        y: -3 * MOTION_INTENSITY,
        scale: 1.005,
        boxShadow: `0 0 24px rgba(192, 132, 252, ${0.07 * MOTION_INTENSITY})`
    }
};
const HOVER_TRANSITION = {
    duration: DURATION.moderate,
    ease: EASE_OUT_EXPO
};
const TAP_FEEDBACK = {
    scale: 1 - 0.006 * MOTION_INTENSITY
};
const ROW_FOCUS_VARIANTS = {
    rest: {
        backgroundColor: "rgba(255,255,255,0)",
        borderLeft: "2px solid rgba(192, 132, 252, 0)",
        paddingLeft: "0px"
    },
    hover: {
        backgroundColor: "rgba(192, 132, 252, 0.03)",
        borderLeft: "2px solid rgba(192, 132, 252, 0.4)",
        paddingLeft: "6px"
    }
};
const ROW_FOCUS_TRANSITION = {
    duration: DURATION.fast,
    ease: EASE_IN_OUT_QUART
};
const TIMELINE_ENTRY_VARIANTS = {
    hidden: {
        opacity: 0,
        x: -10 * MOTION_INTENSITY
    },
    visible: {
        opacity: 1,
        x: 0
    }
};
const TIMELINE_ENTRY_TRANSITION = {
    duration: DURATION.slow,
    ease: EASE_OUT_EXPO
};
const PANEL_UPDATE_TRANSITION = {
    duration: DURATION.moderate,
    ease: EASE_IN_OUT_QUART
};
const SIGNAL_VARIANTS = {
    hidden: {
        opacity: 0,
        x: 8 * MOTION_INTENSITY
    },
    visible: {
        opacity: 1,
        x: 0
    }
};
const SIGNAL_TRANSITION = {
    duration: DURATION.fast,
    ease: EASE_OUT_EXPO
};
}),
"[project]/aegis_sre/components/InteractiveCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InteractiveCard",
    ()=>InteractiveCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/lib/motion.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function InteractiveCard({ children, className = "", entryDelay = 0, revealOnScroll = true, noHover = false, noTap = false, style, onClick }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-60px"
    });
    const shouldReveal = revealOnScroll ? isInView : true;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        // ── Entry animation ───────────────────────────────
        variants: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_ENTRY_VARIANTS"],
        initial: "hidden",
        animate: shouldReveal ? "visible" : "hidden",
        transition: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_ENTRY_TRANSITION"],
            delay: entryDelay
        },
        // ── Hover depth ───────────────────────────────────
        whileHover: noHover ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HOVER_LIFT"].hover,
        // ── Press feedback ────────────────────────────────
        whileTap: noTap ? undefined : __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TAP_FEEDBACK"],
        // ── Reset after hover ─────────────────────────────
        style: {
            ...style,
            willChange: "transform, opacity"
        },
        className: className,
        onClick: onClick,
        children: children
    }, void 0, false, {
        fileName: "[project]/aegis_sre/components/InteractiveCard.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, this);
}
}),
"[project]/aegis_sre/components/LandingView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingView",
    ()=>LandingView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$unicornstudio$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/unicornstudio-react/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/InteractiveCard.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function LandingView({ onEnterAegis }) {
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])();
    const yText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(scrollY, [
        0,
        1000
    ], [
        0,
        -400
    ]);
    // Completely remove Unicorn Studio badge — DOM + MutationObserver
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const removeWatermark = ()=>{
            document.querySelectorAll('a[href*="unicorn.studio"]').forEach((node)=>node.remove());
            document.querySelectorAll('[class*="unicorn"]').forEach((node)=>{
                if (node.tagName === 'A' || node.textContent && node.textContent.includes('unicorn')) {
                    node.remove();
                }
            });
        };
        // Aggressive polling for initial load
        const interval = setInterval(removeWatermark, 200);
        setTimeout(()=>clearInterval(interval), 8000);
        // MutationObserver for dynamic injection
        const observer = new MutationObserver(()=>removeWatermark());
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        return ()=>{
            clearInterval(interval);
            observer.disconnect();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed top-0 left-0 w-full h-[100vh] pointer-events-none",
                        style: {
                            zIndex: 0,
                            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$unicornstudio$2d$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UnicornScene"], {
                            projectId: "ye7FVUbWpTAYh806M04d",
                            width: "100%",
                            height: "100vh"
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/LandingView.tsx",
                            lineNumber: 50,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "h-screen flex flex-col items-center justify-center w-full relative z-10 pt-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-[30%] left-[20%] opacity-40 mix-blend-screen pointer-events-none hidden md:block",
                                style: {
                                    transform: "rotate(-15deg)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "40",
                                    height: "120",
                                    viewBox: "0 0 40 120",
                                    fill: "none",
                                    className: "text-[#8B9FE8]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M20 0 L40 20 M20 0 L0 20",
                                            stroke: "currentColor",
                                            strokeWidth: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                            lineNumber: 62,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M20 20 L40 40 M20 20 L0 40",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            opacity: "0.6"
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                            lineNumber: 63,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M20 40 L40 60 M20 40 L0 60",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            opacity: "0.3"
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                            lineNumber: 64,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "20",
                                            y1: "0",
                                            x2: "20",
                                            y2: "80",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeDasharray: "4 4",
                                            opacity: "0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                            lineNumber: 65,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                    lineNumber: 61,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                lineNumber: 60,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    y: yText
                                },
                                initial: {
                                    opacity: 0,
                                    scale: 0.95
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    duration: 0.8,
                                    ease: "easeOut"
                                },
                                className: "flex flex-col items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-7xl md:text-9xl font-extrabold tracking-tighter text-gradient mb-8 drop-shadow-2xl relative header-glow",
                                        children: "AEGIS SRE"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                        lineNumber: 76,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl md:text-2xl text-muted max-w-2xl text-center mb-12 font-medium tracking-wide",
                                        children: "Enterprise Reliability Command System"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                        lineNumber: 79,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: onEnterAegis,
                                        whileHover: {
                                            scale: 1.02
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        className: "px-10 py-4 box-dna neon-highlight text-lg font-semibold tracking-wider transition-all text-[#FAFAFA]",
                                        children: "Initialize Agent"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                        lineNumber: 83,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                lineNumber: 69,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-[120px] relative z-10",
                        style: {
                            background: "linear-gradient(to bottom, rgba(15,17,23,0) 0%, rgba(15,17,23,0.6) 40%, #0F1117 100%)",
                            borderTop: "1px solid rgba(255,255,255,0.06)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                        lineNumber: 95,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aegis_sre/components/LandingView.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "overview",
                className: "relative z-10 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none",
                        style: {
                            background: `
                            radial-gradient(ellipse 70% 50% at 50% 40%, rgba(80, 20, 110, 0.15) 0%, transparent 70%),
                            radial-gradient(ellipse 90% 70% at 50% 50%, rgba(12, 10, 20, 0.0) 0%, rgba(5, 3, 10, 0.7) 100%),
                            linear-gradient(180deg, #080510 0%, #0C0816 30%, #090610 70%, #05030A 100%)
                        `,
                            zIndex: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none",
                        style: {
                            background: `
                            radial-gradient(ellipse 40% 30% at 30% 20%, rgba(224, 176, 255, 0.03) 0%, transparent 70%),
                            radial-gradient(ellipse 35% 25% at 70% 60%, rgba(74, 14, 96, 0.05) 0%, transparent 70%)
                        `,
                            zIndex: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay",
                        style: {
                            backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')",
                            zIndex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                        lineNumber: 129,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none",
                        style: {
                            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                            zIndex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                        lineNumber: 137,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto px-6 py-24 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                    className: "w-full p-10 lg:p-14 box-dna texture-c",
                                    entryDelay: 0,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col lg:flex-row lg:items-center gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/80 mb-4",
                                                        children: "Observe"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl md:text-3xl font-bold header-glow mb-3 tracking-tight text-white",
                                                        children: "Real-Time Telemetry"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-muted leading-relaxed max-w-lg",
                                                        children: "Monitor telemetry, traces, and critical metrics across the entire architectural stack with sub-second precision."
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                lineNumber: 154,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "shrink-0 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-mono uppercase tracking-wider text-[#8B9FE8] block neon-highlight",
                                                    children: "99.999% SLA Uptime"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                lineNumber: 161,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                        lineNumber: 153,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                    lineNumber: 149,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                            className: "lg:col-span-7 p-10 lg:p-14 box-dna texture-b",
                                            entryDelay: 0.1,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/80 mb-4",
                                                    children: "Reason"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 173,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl md:text-3xl font-bold header-glow mb-3 tracking-tight text-white",
                                                    children: "LLM-Powered Root Cause Analysis"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 174,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted leading-relaxed max-w-lg",
                                                    children: "Automate root cause analysis with LLM-powered insights, correlating spikes and anomalies instantaneously."
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-mono uppercase tracking-wider text-[#8B9FE8] neon-highlight",
                                                        children: "< 200ms Inference"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                            lineNumber: 169,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                            className: "lg:col-span-5 p-10 flex flex-col justify-center box-dna texture-a",
                                            entryDelay: 0.2,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/80 mb-4",
                                                    children: "Act"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-2xl font-bold header-glow mb-3 tracking-tight text-white",
                                                    children: "Autonomous Remediation"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted leading-relaxed",
                                                    children: "Execute remediation workflows, scale infrastructure, or rollback deployments seamlessly."
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-6",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-mono uppercase tracking-wider text-[#8B9FE8] neon-highlight",
                                                        children: "0 Human Interventions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                            lineNumber: 183,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aegis_sre/components/LandingView.tsx",
                                    lineNumber: 168,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aegis_sre/components/LandingView.tsx",
                            lineNumber: 147,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/LandingView.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aegis_sre/components/LandingView.tsx",
                lineNumber: 105,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/aegis_sre/components/ScrollReveal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollReveal",
    ()=>ScrollReveal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function ScrollReveal({ children, delay = 0, className = "" }) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: "-80px"
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        initial: {
            opacity: 0,
            y: 40
        },
        animate: isInView ? {
            opacity: 1,
            y: 0
        } : {
            opacity: 0,
            y: 40
        },
        transition: {
            duration: 0.9,
            delay,
            ease: [
                0.22,
                1,
                0.36,
                1
            ]
        },
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/aegis_sre/components/ScrollReveal.tsx",
        lineNumber: 23,
        columnNumber: 9
    }, this);
}
}),
"[project]/aegis_sre/components/CapabilitiesSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CapabilitiesSection",
    ()=>CapabilitiesSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$ScrollReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/ScrollReveal.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const capabilities = [
    {
        id: "observe",
        phase: "01",
        title: "Telemetry Ingestion",
        subtitle: "& Anomaly Detection",
        description: "AEGIS absorbs millions of signals per second — traces, metrics, logs, and events — feeding them through a multi-layered anomaly detection mesh. Temporal pattern recognition surfaces deviations before they cascade into outages.",
        details: [
            "Multi-protocol ingestion: OpenTelemetry, Prometheus, StatsD, custom agents",
            "Temporal anomaly detection with sliding-window statistical baselines",
            "Topology-aware signal correlation across distributed microservices",
            "Sub-second detection pipeline from signal receipt to alert propagation"
        ],
        stats: [
            {
                value: "1.2M",
                label: "Events / sec"
            },
            {
                value: "<50ms",
                label: "Detection latency"
            },
            {
                value: "99.97%",
                label: "Precision"
            }
        ]
    },
    {
        id: "reason",
        phase: "02",
        title: "Root Cause Reasoning",
        subtitle: "& Signal Correlation",
        description: "LLM-powered reasoning engine cross-references telemetry streams, deployment manifests, and historical incident data to isolate root causes with surgical accuracy. Multi-hop causal inference chains replace manual runbook triage.",
        details: [
            "Multi-hop causal inference across correlated telemetry clusters",
            "Historical incident memory enrichment for every hypothesis",
            "Confidence-scored root cause hypotheses with explainable chains",
            "Temporal pattern matching for anomaly precursor detection"
        ],
        stats: [
            {
                value: "94%",
                label: "Accuracy"
            },
            {
                value: "<200ms",
                label: "Inference"
            }
        ]
    },
    {
        id: "act",
        phase: "03",
        title: "Autonomous Remediation",
        subtitle: "& Safe Execution",
        description: "AEGIS doesn't just diagnose — it acts. Approved remediation workflows execute infrastructure-level operations: process termination, resource scaling, deployment rollbacks, and configuration hot-patches.",
        details: [
            "Process Lifecycle Management with graceful shutdown orchestration",
            "Horizontal & Vertical Scaling with capacity-aware scheduling",
            "Deployment Rollback Chains with canary verification gates",
            "Config Hot-Patch Execution with validation and instant rollback"
        ],
        stats: [
            {
                value: "0",
                label: "Human Interventions"
            },
            {
                value: "<4s",
                label: "Mean Time to Remediate"
            }
        ]
    }
];
function CapabilityNode({ cap, index }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isEven = index % 2 === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$ScrollReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollReveal"], {
        delay: index * 0.1,
        className: "relative z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-1/2 top-0 bottom-0 w-px hidden lg:block",
                    style: {
                        background: "linear-gradient(180deg, rgba(139, 159, 232, 0.12) 0%, rgba(139, 159, 232, 0.04) 100%)",
                        transform: "translateX(-50%)"
                    }
                }, void 0, false, {
                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                    lineNumber: 90,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-1/2 top-8 w-3 h-3 rounded-full hidden lg:block",
                    style: {
                        transform: "translateX(-50%)",
                        background: isOpen ? "linear-gradient(135deg, #8B9FE8 0%, #4F46E5 100%)" : "rgba(139, 159, 232, 0.25)",
                        border: "2px solid rgba(139, 159, 232, 0.3)",
                        boxShadow: isOpen ? "0 0 12px rgba(139, 159, 232, 0.4)" : "none",
                        transition: "all 0.4s ease",
                        zIndex: 5
                    }
                }, void 0, false, {
                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                    lineNumber: 99,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 ${isEven ? "" : "lg:direction-rtl"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${isEven ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/60 mb-3",
                                    children: [
                                        cap.phase,
                                        " — ",
                                        cap.id.charAt(0).toUpperCase() + cap.id.slice(1)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsOpen(!isOpen),
                                    className: `text-left ${isEven ? "lg:text-right lg:ml-auto" : ""} group cursor-pointer bg-transparent border-none w-full`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 header-glow inline",
                                            children: cap.title
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                            lineNumber: 126,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl md:text-3xl font-bold tracking-tight text-gray-500 block",
                                            children: cap.subtitle
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                            lineNumber: 129,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8B9FE8]/40 group-hover:text-[#8B9FE8]/80 transition-colors",
                                            style: isEven ? {
                                                justifyContent: "flex-end"
                                            } : {},
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: isOpen ? "Collapse" : "Expand details"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    animate: {
                                                        rotate: isOpen ? 180 : 0
                                                    },
                                                    transition: {
                                                        duration: 0.3
                                                    },
                                                    className: "inline-block",
                                                    children: "↓"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                            lineNumber: 132,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                    lineNumber: 122,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted leading-relaxed max-w-lg mt-4",
                                    style: isEven ? {
                                        marginLeft: "auto"
                                    } : {},
                                    children: cap.description
                                }, void 0, false, {
                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                    lineNumber: 146,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex gap-8 mt-6 text-sm font-mono ${isEven ? "justify-end" : ""}`,
                                    children: cap.stats.map((stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[#A0B4F0] text-xl font-bold mb-1 neon-highlight",
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-gray-500 uppercase tracking-wider text-xs",
                                                    children: stat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                            lineNumber: 153,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                    lineNumber: 151,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        animate: {
                                            height: "auto",
                                            opacity: 1
                                        },
                                        exit: {
                                            height: 0,
                                            opacity: 0
                                        },
                                        transition: {
                                            duration: 0.4,
                                            ease: [
                                                0.33,
                                                1,
                                                0.68,
                                                1
                                            ]
                                        },
                                        className: "overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 pt-6",
                                            style: {
                                                borderTop: "1px solid rgba(139, 159, 232, 0.08)"
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: cap.details.map((detail, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            x: isEven ? 10 : -10
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            x: 0
                                                        },
                                                        transition: {
                                                            delay: i * 0.08,
                                                            duration: 0.3
                                                        },
                                                        className: `flex items-start gap-3 ${isEven ? "justify-end" : ""}`,
                                                        children: [
                                                            isEven && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[13px] leading-relaxed text-gray-300 tracking-wide",
                                                                children: detail
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                                lineNumber: 181,
                                                                columnNumber: 57
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0",
                                                                style: {
                                                                    background: "rgba(139, 159, 232, 0.4)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 53
                                                            }, this),
                                                            !isEven && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[13px] leading-relaxed text-gray-300 tracking-wide",
                                                                children: detail
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 57
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 49
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                                lineNumber: 171,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                            lineNumber: 170,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                        lineNumber: 163,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                    lineNumber: 161,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                            lineNumber: 115,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `hidden lg:block relative ${isEven ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-start pt-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-[200px] rounded-2xl",
                                    style: {
                                        background: `radial-gradient(ellipse 80% 60% at ${isEven ? "30%" : "70%"} 50%, rgba(139, 159, 232, 0.04) 0%, transparent 70%)`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                    lineNumber: 206,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                lineNumber: 205,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                            lineNumber: 204,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                    lineNumber: 114,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
            lineNumber: 88,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
        lineNumber: 87,
        columnNumber: 9
    }, this);
}
function CapabilitiesSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "capabilities",
        className: "relative w-full text-white overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: `
                        radial-gradient(ellipse 70% 50% at 50% 40%, rgba(60, 70, 140, 0.12) 0%, transparent 70%),
                        radial-gradient(ellipse 90% 70% at 50% 50%, rgba(12, 10, 20, 0.0) 0%, rgba(5, 3, 10, 0.7) 100%),
                        linear-gradient(180deg, #080510 0%, #0C0816 30%, #090610 70%, #05030A 100%)
                    `,
                    zIndex: 0
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                lineNumber: 224,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: `
                        radial-gradient(ellipse 40% 30% at 30% 20%, rgba(160, 180, 240, 0.03) 0%, transparent 70%),
                        radial-gradient(ellipse 35% 25% at 70% 60%, rgba(60, 70, 140, 0.05) 0%, transparent 70%)
                    `,
                    zIndex: 0
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                lineNumber: 235,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay",
                style: {
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/></svg>')",
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                lineNumber: 245,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                lineNumber: 252,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$ScrollReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollReveal"], {
                className: "relative z-10 pt-24 pb-20 px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-6xl md:text-8xl font-extrabold tracking-tighter text-gradient mb-6 drop-shadow-2xl header-glow",
                            children: "Capabilities"
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                            lineNumber: 263,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg md:text-xl text-muted max-w-2xl mx-auto tracking-wide font-medium",
                            children: "Autonomous reliability — from signal ingestion to self-healing infrastructure"
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                            lineNumber: 266,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                    lineNumber: 262,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                lineNumber: 261,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 px-8 pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-1/2 top-0 bottom-0 w-px hidden lg:block",
                        style: {
                            background: "linear-gradient(180deg, transparent 0%, rgba(139, 159, 232, 0.1) 10%, rgba(139, 159, 232, 0.1) 90%, transparent 100%)",
                            transform: "translateX(-50%)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                        lineNumber: 275,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-24",
                        children: capabilities.map((cap, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CapabilityNode, {
                                cap: cap,
                                index: index
                            }, cap.id, false, {
                                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                                lineNumber: 285,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                        lineNumber: 283,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                lineNumber: 273,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 h-8"
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
                lineNumber: 290,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aegis_sre/components/CapabilitiesSection.tsx",
        lineNumber: 222,
        columnNumber: 9
    }, this);
}
}),
"[project]/aegis_sre/components/ArchitectureSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArchitectureSection",
    ()=>ArchitectureSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$ScrollReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/ScrollReveal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/InteractiveCard.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
/* ─── Detail Tile — Glassmorphism Synopsis Panel ─── */ function DetailTile({ tier, index }) {
    /*
     * GLASSMORPHISM SPEC:
     * - Background: translucent dark purple (rgba(20, 8, 40, 0.85))
     * - Backdrop blur: 28px (heavy smoked glass)
     * - Border: subtle translucent white inner bevel (inset box-shadow + border)
     * - Position: floats to the right of the card, offset ~12px outward on entrance
     *
     * frontend-design skill: "Layered translucency" with "narrative intent" shadows.
     * canvas-design skill: "Painstaking attention" to beveled edge detail.
     * scroll-experience skill: Not scroll-driven, purely hover — no hijacking risk.
     */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            x: -12,
            scale: 0.97
        },
        animate: {
            opacity: 1,
            x: 0,
            scale: 1
        },
        exit: {
            opacity: 0,
            x: -8,
            scale: 0.98
        },
        transition: {
            duration: 0.3,
            ease: [
                0.33,
                1,
                0.68,
                1
            ]
        },
        style: {
            position: "absolute",
            // Position: to the right of the card, vertically centered
            left: `calc(${index * 13}% + 46%)`,
            top: `calc(${index * 19}% + 20px)`,
            width: "min(340px, 40%)",
            zIndex: 100,
            pointerEvents: "none"
        },
        className: "hidden lg:block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
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
                padding: "24px 28px"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold",
                            style: {
                                background: "linear-gradient(135deg, rgba(139, 159, 232, 0.25) 0%, rgba(79, 70, 229, 0.2) 100%)",
                                border: "1px solid rgba(139, 159, 232, 0.3)",
                                color: "#8B9FE8"
                            },
                            children: tier.label
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                            lineNumber: 72,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-mono uppercase tracking-[0.2em] text-[#8B9FE8]/60",
                            children: "Synopsis"
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                    lineNumber: 71,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-2.5",
                    children: tier.synopsis.map((point, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-start gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0",
                                    style: {
                                        background: "rgba(139, 159, 232, 0.5)"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                    lineNumber: 91,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[13px] leading-relaxed text-[#D0D8F0]/90",
                                    children: point
                                }, void 0, false, {
                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                    lineNumber: 95,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                            lineNumber: 90,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                    lineNumber: 88,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
            lineNumber: 52,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
/* ─── Staircase Card Component ─── */ function StaircaseCard({ tier, index, total, isExpanded, isHovered, onHoverStart, onHoverEnd }) {
    // Collapsed: tight stack with 4px peek-offset per card
    const collapsedLeft = index * 4;
    const collapsedTop = index * 4;
    // Expanded: wide diagonal fan
    const expandedLeft = `${index * 13}%`;
    const expandedTop = `${index * 19}%`;
    // Stagger: later tiers start moving slightly later
    const delay = index * 0.12;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        animate: {
            left: isExpanded ? expandedLeft : collapsedLeft,
            top: isExpanded ? expandedTop : collapsedTop
        },
        transition: {
            left: {
                type: "tween",
                ease: [
                    0.33,
                    1,
                    0.68,
                    1
                ],
                duration: 1.0,
                delay
            },
            top: {
                type: "tween",
                ease: [
                    0.33,
                    1,
                    0.68,
                    1
                ],
                duration: 1.0,
                delay
            }
        },
        onMouseEnter: onHoverStart,
        onMouseLeave: onHoverEnd,
        style: {
            position: "absolute",
            width: "44%",
            // Hovered card lifts to foreground; otherwise Tier 05 stays highest
            zIndex: isHovered ? total + 20 : index + 10,
            borderRadius: "28px",
            border: "1px solid transparent",
            // Active glow when hovered
            boxShadow: isHovered ? "0 0 24px rgba(139, 159, 232, 0.3), 0 0 60px rgba(60, 70, 140, 0.15)" : "none",
            borderColor: isHovered ? "rgba(139, 159, 232, 0.4)" : "transparent",
            transition: "box-shadow 0.25s ease, border-color 0.25s ease"
        },
        className: "bg-[#05020A]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full h-full min-h-[250px] p-8 md:p-10 lg:p-14 box-dna ${index % 2 === 0 ? "texture-c" : "texture-b"}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-mono uppercase tracking-[0.3em] text-primary/80 mb-4",
                        children: [
                            tier.label,
                            " — Tier"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                        lineNumber: 167,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 header-glow",
                        children: tier.title
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                        lineNumber: 170,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted text-sm md:text-base leading-relaxed max-w-lg",
                        children: tier.desc
                    }, void 0, false, {
                        fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                        lineNumber: 173,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 166,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
            lineNumber: 165,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
        lineNumber: 136,
        columnNumber: 9
    }, this);
}
/* ─── Tier data with synopsis ─── */ const tiers = [
    {
        id: "sources",
        label: "01",
        title: "Data Sources",
        desc: "Application logs, infrastructure metrics, distributed traces, deployment events, and configuration state changes stream continuously from your production environment.",
        align: "left",
        synopsis: [
            "Structured & unstructured application logs with contextual metadata tagging",
            "Infrastructure metrics: CPU, memory, disk I/O, network throughput at 10s granularity",
            "Distributed traces spanning microservice call graphs with span-level latency attribution",
            "Deployment events: git SHA, rollout percentage, canary health signals",
            "Configuration drift detection via state snapshot diffing across clusters"
        ]
    },
    {
        id: "ingestion",
        label: "02",
        title: "Ingestion & Streaming",
        desc: "High-throughput ingestion pipeline normalizes, enriches, and routes signals through a real-time streaming mesh. Schema-aware parsing ensures consistency across heterogeneous telemetry formats.",
        align: "right",
        synopsis: [
            "High-throughput ingestion at 2M+ events/sec with back-pressure flow control",
            "Real-time streaming mesh with exactly-once delivery guarantees",
            "Schema-aware parsing: auto-detects OpenTelemetry, Prometheus, and custom formats",
            "Signal enrichment: geo-tagging, service topology mapping, ownership attribution",
            "Dynamic routing rules with priority lanes for critical signal classes"
        ]
    },
    {
        id: "reasoning",
        label: "03",
        title: "Reasoning & Correlation",
        desc: "LLM-powered reasoning engine performs multi-hop causal inference across correlated signal clusters. Temporal pattern matching and topological analysis isolate root causes within milliseconds.",
        align: "left",
        synopsis: [
            "LLM-powered causal reasoning with multi-hop inference chains across signal clusters",
            "Temporal pattern matching: detects anomaly precursors up to 15 minutes before impact",
            "Topological analysis maps blast radius across service dependency graphs",
            "Correlation engine links metrics, logs, traces into unified incident narratives",
            "Confidence-scored root cause hypotheses with explainable reasoning chains"
        ]
    },
    {
        id: "execution",
        label: "04",
        title: "Execution & Control",
        desc: "Validated remediation plans dispatch through an execution gateway with configurable approval policies. Infrastructure-as-code operations execute atomically with automatic rollback safety nets.",
        align: "right",
        synopsis: [
            "Validated remediation plans with dry-run simulation before live execution",
            "Configurable approval policies: auto-approve, single-reviewer, or multi-party consensus",
            "Infrastructure-as-code operations execute atomically with transaction-style rollback",
            "Blast radius containment: progressive rollout with automatic halt on degradation",
            "Cryptographic audit trail with provenance chain for every automated action"
        ]
    },
    {
        id: "feedback",
        label: "05",
        title: "Feedback & Observability Loop",
        desc: "Post-action effectiveness is measured against baseline SLIs. Outcomes feed back into the reasoning model, continuously improving accuracy and reducing false-positive rates over time.",
        align: "left",
        synopsis: [
            "Post-action SLI measurement: compares pre/post-remediation error budgets",
            "Outcome telemetry feeds back into reasoning model for continuous calibration",
            "False-positive rate tracking with automated threshold adjustment per service",
            "Remediation effectiveness scoring: time-to-resolution, recurrence frequency, blast radius",
            "Weekly model accuracy reports with drift detection and retraining triggers"
        ]
    }
];
function ArchitectureSection() {
    const staircaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredIndex, setHoveredIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    /*
     * ONE-WAY EXIT LOGIC:
     * - EXPAND when 30% of the staircase container is visible (scrolling down).
     * - STAY EXPANDED as long as user is at or below the section.
     * - RETRACT only when user scrolls UP past the section header (top of section
     *   is below the viewport — i.e., user has scrolled above the section).
     */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onScroll = ()=>{
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
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        onScroll();
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "architecture",
        ref: sectionRef,
        className: "relative w-full text-white overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: `
                        radial-gradient(ellipse 70% 50% at 50% 40%, rgba(80, 20, 110, 0.15) 0%, transparent 70%),
                        radial-gradient(ellipse 90% 70% at 50% 50%, rgba(12, 10, 20, 0.0) 0%, rgba(5, 3, 10, 0.7) 100%),
                        linear-gradient(180deg, #080510 0%, #0C0816 30%, #090610 70%, #05030A 100%)
                    `,
                    zIndex: 0
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 302,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: `
                        radial-gradient(ellipse 40% 30% at 30% 20%, rgba(224, 176, 255, 0.03) 0%, transparent 70%),
                        radial-gradient(ellipse 35% 25% at 70% 60%, rgba(74, 14, 96, 0.05) 0%, transparent 70%)
                    `,
                    zIndex: 0
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 313,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay",
                style: {
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/></svg>')",
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 323,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                    zIndex: 1
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 330,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$ScrollReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollReveal"], {
                className: "relative z-10 pt-24 pb-20 px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-5xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-6xl md:text-8xl font-extrabold tracking-tighter text-gradient mb-6 drop-shadow-2xl header-glow",
                            children: "Architecture"
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                            lineNumber: 341,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg md:text-xl text-muted max-w-2xl mx-auto tracking-wide font-medium",
                            children: "Five-tier autonomous reliability pipeline — from raw signal to closed-loop healing"
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                            lineNumber: 344,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                    lineNumber: 340,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 339,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 px-8 mb-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: staircaseRef,
                    className: "max-w-6xl mx-auto relative w-full h-[1200px] md:h-[1400px] lg:h-[1600px]",
                    children: [
                        tiers.map((tier, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StaircaseCard, {
                                tier: tier,
                                index: index,
                                total: tiers.length,
                                isExpanded: isExpanded,
                                isHovered: hoveredIndex === index,
                                onHoverStart: ()=>setHoveredIndex(index),
                                onHoverEnd: ()=>setHoveredIndex(null)
                            }, tier.id, false, {
                                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                lineNumber: 357,
                                columnNumber: 25
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: hoveredIndex !== null && isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailTile, {
                                tier: tiers[hoveredIndex],
                                index: hoveredIndex
                            }, tiers[hoveredIndex].id, false, {
                                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                lineNumber: 372,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                            lineNumber: 370,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                    lineNumber: 352,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 351,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$ScrollReveal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollReveal"], {
                delay: 0.15,
                className: "relative z-10 px-8 mb-32",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-mono uppercase tracking-[0.3em] text-primary/60 mb-6 px-2",
                            children: "System Overview"
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                            lineNumber: 385,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                    className: "lg:col-span-8 p-12 lg:p-14 min-h-[350px] flex flex-col justify-between box-dna texture-a",
                                    entryDelay: 0.1,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-3xl md:text-4xl font-bold tracking-tight text-white mb-5 leading-[1.15] header-glow",
                                                    children: [
                                                        "Closed-Loop",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                            lineNumber: 395,
                                                            columnNumber: 48
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-500",
                                                            children: "Reliability Engine"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted leading-relaxed max-w-xl",
                                                    children: "AEGIS operates as a continuous feedback system. Every remediation outcome refines the reasoning model. Anomaly baselines adapt to infrastructure drift. The platform becomes more precise with every incident it processes — converging toward zero human intervention for known failure modes."
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                            lineNumber: 393,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 flex gap-10 mt-8 text-sm font-mono",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-primary text-xl font-bold mb-1 neon-highlight",
                                                            children: "5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-gray-500 uppercase tracking-wider text-xs",
                                                            children: "Processing Tiers"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                            lineNumber: 409,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-primary text-xl font-bold mb-1 neon-highlight",
                                                            children: "∞"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                            lineNumber: 412,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-gray-500 uppercase tracking-wider text-xs",
                                                            children: "Feedback Loops"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                            lineNumber: 413,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-primary text-xl font-bold mb-1 neon-highlight",
                                                            children: "<12s"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                            lineNumber: 416,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-gray-500 uppercase tracking-wider text-xs",
                                                            children: "End-to-End Cycle"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                            lineNumber: 417,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                            lineNumber: 406,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                    lineNumber: 389,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-4 flex flex-col gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                            className: "p-10 flex-[1.4] flex flex-col justify-center box-dna texture-b",
                                            entryDelay: 0.2,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-white mb-3 header-glow",
                                                    children: "Extensible Pipeline"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 427,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted text-sm leading-relaxed",
                                                    children: "Every tier exposes plugin interfaces — custom anomaly detectors, bespoke reasoning modules, and organization-specific remediation playbooks integrate seamlessly."
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                            lineNumber: 423,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                            className: "p-10 flex-[0.6] flex flex-col justify-center box-dna texture-c",
                                            entryDelay: 0.3,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-white mb-3 header-glow",
                                                    children: "Zero-Trust Execution"
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 439,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted text-sm leading-relaxed",
                                                    children: "All remediation actions traverse an audit gateway with cryptographic provenance and approval chain verification."
                                                }, void 0, false, {
                                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                            lineNumber: 435,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                                    lineNumber: 422,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                            lineNumber: 386,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                    lineNumber: 384,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 383,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 h-32"
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
                lineNumber: 450,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aegis_sre/components/ArchitectureSection.tsx",
        lineNumber: 300,
        columnNumber: 9
    }, this);
}
}),
"[project]/aegis_sre/components/DashboardView.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardView",
    ()=>DashboardView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/lucide-react/dist/esm/icons/activity.js [app-ssr] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-ssr] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/InteractiveCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/lib/motion.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function DashboardView({ onBackToHome }) {
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateTime = ()=>{
            const now = new Date();
            setCurrentTime(now.toISOString().split("T")[1].split(".")[0] + " UTC");
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return ()=>clearInterval(interval);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        transition: {
            duration: 0.3
        },
        className: "w-full min-h-screen text-white bg-[#05020A] relative overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay",
                style: {
                    backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/></svg>')"
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-6xl mx-auto px-6 py-24 flex flex-col gap-8",
                children: [
                    onBackToHome && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: onBackToHome,
                        initial: {
                            opacity: 0,
                            x: -10
                        },
                        animate: {
                            opacity: 1,
                            x: 0
                        },
                        transition: {
                            duration: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DURATION"].moderate,
                            ease: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EASE_OUT_EXPO"]
                        },
                        className: "self-start inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors tracking-wide group bg-transparent border-none cursor-pointer -mt-8 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "transform transition-transform group-hover:-translate-x-1",
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 61,
                                columnNumber: 25
                            }, this),
                            "Back to Home"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                        lineNumber: 54,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_ENTRY_VARIANTS"],
                        initial: "hidden",
                        animate: "visible",
                        transition: {
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CARD_ENTRY_TRANSITION"],
                            delay: 0.05
                        },
                        className: "box-dna texture-c p-6 flex flex-col sm:flex-row justify-between items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                        className: "w-5 h-5 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 75,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-sm font-semibold tracking-wider uppercase text-gray-300 header-glow",
                                        children: "SRE Command Center"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 76,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-4 items-center font-mono text-xs uppercase",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-2 neon-highlight",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 rounded-full bg-red-500 animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 81,
                                                columnNumber: 29
                                            }, this),
                                            "System: Critical"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 80,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 85,
                                                columnNumber: 29
                                            }, this),
                                            "1 Active Incident"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 84,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1.5 rounded-full bg-[#A0B4F0]/10 text-[#A0B4F0] border border-[#A0B4F0]/20 flex items-center gap-2",
                                        children: "Agent: Reasoning"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 88,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 92,
                                                columnNumber: 29
                                            }, this),
                                            currentTime || "00:00:00 UTC"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 91,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 79,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                        lineNumber: 67,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                className: "box-dna texture-b p-8 flex flex-col",
                                entryDelay: 0.1,
                                noTap: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4 header-glow",
                                        children: "Signals"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 105,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "flex flex-col gap-4 font-mono text-sm",
                                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STAGGER_CONTAINER"],
                                        initial: "hidden",
                                        whileInView: "visible",
                                        viewport: {
                                            once: true
                                        },
                                        children: [
                                            {
                                                label: "Logs Ingested",
                                                value: "1,048,576",
                                                sev: "normal"
                                            },
                                            {
                                                label: "Errors Detected",
                                                value: "24",
                                                sev: "high"
                                            },
                                            {
                                                label: "Failed Builds",
                                                value: "0",
                                                sev: "normal"
                                            },
                                            {
                                                label: "Port Conflicts",
                                                value: "1",
                                                sev: "critical"
                                            },
                                            {
                                                label: "Missing Env Vars",
                                                value: "0",
                                                sev: "normal"
                                            }
                                        ].map((signal, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                variants: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIGNAL_VARIANTS"],
                                                transition: {
                                                    ...__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SIGNAL_TRANSITION"],
                                                    delay: idx * 0.06
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: "flex justify-between items-center p-3 rounded-lg cursor-default",
                                                    variants: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROW_FOCUS_VARIANTS"],
                                                    initial: "rest",
                                                    whileHover: "hover",
                                                    transition: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROW_FOCUS_TRANSITION"],
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-2 h-2 rounded-full ${signal.sev === 'critical' ? 'bg-red-500' : signal.sev === 'high' ? 'bg-orange-500' : 'bg-green-500'}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                    lineNumber: 135,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-400",
                                                                    children: signal.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                    lineNumber: 139,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: signal.sev === 'critical' ? 'text-red-400 font-bold' : 'text-gray-200',
                                                            children: signal.value
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 37
                                                }, this)
                                            }, idx, false, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 121,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 107,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                                className: "box-dna texture-a p-8 flex flex-col",
                                entryDelay: 0.15,
                                noTap: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4 header-glow",
                                        children: "Root Cause Analysis"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 154,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-5 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-500 uppercase tracking-wider text-xs font-bold mb-1",
                                                        children: "Detected Issue"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-white font-medium",
                                                        children: "Node.js Allocation Error: Port 3000 in use"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 156,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500 uppercase tracking-wider text-xs font-bold",
                                                                title: "Model confidence based on historical telemetry patterns",
                                                                children: "Confidence"
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 163,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#A0B4F0] font-mono",
                                                                children: "94%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-1.5 bg-white/10 rounded-full overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            initial: {
                                                                width: 0
                                                            },
                                                            animate: {
                                                                width: "94%"
                                                            },
                                                            transition: {
                                                                duration: 1.2,
                                                                ease: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EASE_OUT_EXPO"],
                                                                delay: 0.4
                                                            },
                                                            className: "h-full bg-gradient-to-r from-[#4A0E60] to-[#A0B4F0]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 161,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-500 uppercase tracking-wider text-xs font-bold mb-1",
                                                        children: "Hypothesis"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-gray-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5",
                                                        children: "Previous deployment gracefully failed but left zombie process attached to port 3000, preventing new container allocation."
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 178,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 176,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-gray-500 uppercase tracking-wider text-xs font-bold mb-1",
                                                                children: "Affected Services"
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-gray-300 font-mono text-xs p-2 rounded bg-red-500/10 text-red-300 border border-red-500/20 inline-block",
                                                                children: "frontend-api-prod"
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 186,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-gray-500 uppercase tracking-wider text-xs font-bold mb-1",
                                                                children: "Suggested Remediation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 189,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-gray-300 font-mono text-xs",
                                                                children: "SIGKILL orphan PID & restart spec"
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 183,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 155,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 149,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                        lineNumber: 98,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                        className: "box-dna texture-c p-8 flex flex-col",
                        entryDelay: 0.2,
                        noTap: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4 header-glow",
                                children: "Proposed Actions"
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 203,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left text-sm whitespace-nowrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "text-gray-500 uppercase tracking-wider text-xs font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 font-medium",
                                                        children: "Action Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 font-medium",
                                                        children: "Risk Level"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 font-medium",
                                                        children: "Approval"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 font-medium text-right",
                                                        children: "Execute"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 207,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                            lineNumber: 206,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-white/5",
                                            children: [
                                                {
                                                    name: "Terminate Orphan Process (Port 3000)",
                                                    risk: "Medium",
                                                    riskColor: "orange",
                                                    approval: "Yes"
                                                },
                                                {
                                                    name: "Restart Deployment Spec",
                                                    risk: "Low",
                                                    riskColor: "green",
                                                    approval: "No"
                                                }
                                            ].map((action, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].tr, {
                                                    variants: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROW_FOCUS_VARIANTS"],
                                                    initial: "rest",
                                                    whileHover: "hover",
                                                    transition: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROW_FOCUS_TRANSITION"],
                                                    className: "cursor-default",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-4 font-mono text-gray-200",
                                                            children: action.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-2 py-1 rounded bg-${action.riskColor}-500/10 text-${action.riskColor}-400 border border-${action.riskColor}-500/20 text-xs font-bold uppercase`,
                                                                children: action.risk
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 239,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: action.approval
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 67
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-4 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                disabled: true,
                                                                className: "px-4 py-1.5 rounded glass-panel border border-[#A0B4F0]/20 text-[#A0B4F0] opacity-50 cursor-not-allowed text-xs font-bold uppercase",
                                                                children: "Execute"
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 243,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                            lineNumber: 242,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 37
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                            lineNumber: 214,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                    lineNumber: 205,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 204,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                        lineNumber: 198,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$InteractiveCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InteractiveCard"], {
                        className: "box-dna texture-b p-8 flex flex-col",
                        entryDelay: 0.25,
                        noTap: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-white mb-6 border-b border-white/10 pb-4 header-glow",
                                children: "Incident Timeline"
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 258,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative pl-6 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-[11px] top-2 bottom-2 w-px bg-white/10"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 261,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: "space-y-6",
                                        variants: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STAGGER_CONTAINER"],
                                        initial: "hidden",
                                        whileInView: "visible",
                                        viewport: {
                                            once: true,
                                            margin: "-20px"
                                        },
                                        children: [
                                            {
                                                time: "T-00:04",
                                                title: "Error Detected",
                                                desc: "Telemetry agent reported healthcheck failure on frontend-api-prod.",
                                                active: false
                                            },
                                            {
                                                time: "T-00:02",
                                                title: "Hypothesis Formed",
                                                desc: "LLM correlation engine identified Port 3000 orphaned process.",
                                                active: false
                                            },
                                            {
                                                time: "T-00:00",
                                                title: "Action Proposed",
                                                desc: "Remediation payload generated. Awaiting human validation.",
                                                active: true
                                            }
                                        ].map((event, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                                variants: __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_ENTRY_VARIANTS"],
                                                transition: {
                                                    ...__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$lib$2f$motion$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TIMELINE_ENTRY_TRANSITION"],
                                                    delay: idx * 0.12
                                                },
                                                className: "relative flex flex-col gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `absolute -left-[30px] top-1 w-3 h-3 rounded-full border-2 border-[#05020A] ${event.active ? 'bg-[#8B9FE8] shadow-[0_0_10px_#8B9FE8]' : 'bg-gray-600'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-xs text-gray-500",
                                                                children: event.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 284,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `font-semibold text-sm ${event.active ? 'text-[#A0B4F0]' : 'text-gray-300'}`,
                                                                children: event.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                                lineNumber: 285,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-500 leading-relaxed -ml-1 pl-1",
                                                        children: event.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                        lineNumber: 287,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                                lineNumber: 276,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                        lineNumber: 264,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                                lineNumber: 259,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                        lineNumber: 253,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aegis_sre/components/DashboardView.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aegis_sre/components/DashboardView.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
}),
"[project]/aegis_sre/components/Footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function Footer() {
    const [inquiry, setInquiry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (inquiry.trim()) {
            setSubmitted(true);
            setInquiry("");
            setTimeout(()=>setSubmitted(false), 3000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        id: "contact",
        className: "relative w-full text-white overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                style: {
                    background: `
                        linear-gradient(180deg, #05030A 0%, #08060E 40%, #0A0812 100%)
                    `,
                    zIndex: 0
                }
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/Footer.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-7xl mx-auto px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-px w-full",
                    style: {
                        background: "linear-gradient(90deg, transparent 0%, rgba(139, 159, 232, 0.15) 30%, rgba(139, 159, 232, 0.15) 70%, transparent 100%)"
                    }
                }, void 0, false, {
                    fileName: "[project]/aegis_sre/components/Footer.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/aegis_sre/components/Footer.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-7xl mx-auto px-8 py-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-mono uppercase tracking-[0.3em] text-[#8B9FE8]/60 mb-6",
                                        children: "Get in Touch"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                        lineNumber: 54,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 header-glow",
                                        children: "Contact Us"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                        lineNumber: 57,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4 mb-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                                        style: {
                                                            background: "rgba(139, 159, 232, 0.1)",
                                                            border: "1px solid rgba(139, 159, 232, 0.15)"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "14",
                                                            height: "14",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "#8B9FE8",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                    x: "2",
                                                                    y: "4",
                                                                    width: "20",
                                                                    height: "16",
                                                                    rx: "2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                                    lineNumber: 64,
                                                                    columnNumber: 152
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                    points: "22,4 12,13 2,4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                                    lineNumber: 64,
                                                                    columnNumber: 202
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                            lineNumber: 64,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted text-sm tracking-wide",
                                                        children: "contact@aegis-sre.dev"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 62,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-lg flex items-center justify-center",
                                                        style: {
                                                            background: "rgba(139, 159, 232, 0.1)",
                                                            border: "1px solid rgba(139, 159, 232, 0.15)"
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "14",
                                                            height: "14",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "#8B9FE8",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                                    lineNumber: 70,
                                                                    columnNumber: 152
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                    cx: "12",
                                                                    cy: "10",
                                                                    r: "3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                                    lineNumber: 70,
                                                                    columnNumber: 211
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                            lineNumber: 70,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-muted text-sm tracking-wide",
                                                        children: "Cloud-Native • Globally Distributed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 68,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                        lineNumber: 61,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-mono uppercase tracking-[0.2em] text-gray-500 block",
                                                children: "Quick Inquiry"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 78,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: inquiry,
                                                        onChange: (e)=>setInquiry(e.target.value),
                                                        placeholder: "Ask us anything...",
                                                        className: "flex-1 px-5 py-3 rounded-xl text-sm text-white placeholder:text-gray-600 transition-all focus:outline-none focus:ring-1 focus:ring-[#8B9FE8]/30",
                                                        style: {
                                                            background: "rgba(15, 17, 23, 0.6)",
                                                            border: "1px solid rgba(255, 255, 255, 0.06)",
                                                            backdropFilter: "blur(12px)"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].button, {
                                                        type: "submit",
                                                        whileHover: {
                                                            scale: 1.02
                                                        },
                                                        whileTap: {
                                                            scale: 0.98
                                                        },
                                                        className: "px-6 py-3 rounded-xl text-sm font-medium tracking-wide transition-all cursor-pointer",
                                                        style: {
                                                            background: "linear-gradient(135deg, rgba(139, 159, 232, 0.15) 0%, rgba(79, 70, 229, 0.2) 100%)",
                                                            border: "1px solid rgba(139, 159, 232, 0.25)",
                                                            color: "#8B9FE8"
                                                        },
                                                        children: submitted ? "Sent ✓" : "Send"
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 81,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                        lineNumber: 77,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                lineNumber: 53,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-5",
                                                children: "Sitemap"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 115,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-3",
                                                children: [
                                                    {
                                                        label: "Overview",
                                                        href: "#overview"
                                                    },
                                                    {
                                                        label: "Capabilities",
                                                        href: "#capabilities"
                                                    },
                                                    {
                                                        label: "Architecture",
                                                        href: "#architecture"
                                                    },
                                                    {
                                                        label: "Contact",
                                                        href: "#contact"
                                                    }
                                                ].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: link.href,
                                                            onClick: (e)=>{
                                                                e.preventDefault();
                                                                document.getElementById(link.href.slice(1))?.scrollIntoView({
                                                                    behavior: "smooth"
                                                                });
                                                            },
                                                            className: "text-sm text-gray-400 hover:text-white transition-colors tracking-wide cursor-pointer",
                                                            children: link.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, link.href, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 118,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                        lineNumber: 114,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-5",
                                                children: "Project"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 143,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-gray-400 tracking-wide",
                                                            children: "AEGIS SRE Platform"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                            lineNumber: 148,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm text-gray-400 tracking-wide",
                                                            children: "College Project 2026"
                                                        }, void 0, false, {
                                                            fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://github.com",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-sm text-gray-400 hover:text-white transition-colors tracking-wide inline-flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "14",
                                                                    height: "14",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                                        lineNumber: 155,
                                                                        columnNumber: 109
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                                    lineNumber: 155,
                                                                    columnNumber: 41
                                                                }, this),
                                                                "GitHub"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 146,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mt-8 mb-5",
                                                children: "Connect"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 161,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    "LinkedIn",
                                                    "Twitter"
                                                ].map((social)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "#",
                                                        className: "px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-gray-500 hover:text-white transition-all",
                                                        style: {
                                                            background: "rgba(255, 255, 255, 0.03)",
                                                            border: "1px solid rgba(255, 255, 255, 0.06)"
                                                        },
                                                        children: social
                                                    }, social, false, {
                                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                        lineNumber: 166,
                                                        columnNumber: 37
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 164,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                        lineNumber: 142,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                lineNumber: 112,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                        lineNumber: 50,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4",
                        style: {
                            borderTop: "1px solid rgba(255, 255, 255, 0.04)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        className: "text-[#8B9FE8]/40",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 2L3 7v10l9 5 9-5V7l-9-5z",
                                                stroke: "currentColor",
                                                strokeWidth: "1.5",
                                                fill: "none"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 187,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M12 7L7 10v4l5 3 5-3v-4l-5-3z",
                                                stroke: "currentColor",
                                                strokeWidth: "1",
                                                fill: "currentColor",
                                                fillOpacity: "0.15"
                                            }, void 0, false, {
                                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                                lineNumber: 188,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                        lineNumber: 186,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-600 tracking-wide",
                                        children: "AEGIS SRE — Autonomous Reliability Engineering"
                                    }, void 0, false, {
                                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                                        lineNumber: 190,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                lineNumber: 185,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-600 tracking-wide",
                                children: "© 2026 AEGIS Project. All rights reserved."
                            }, void 0, false, {
                                fileName: "[project]/aegis_sre/components/Footer.tsx",
                                lineNumber: 192,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/aegis_sre/components/Footer.tsx",
                        lineNumber: 184,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/aegis_sre/components/Footer.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/aegis_sre/components/Footer.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
}),
"[project]/aegis_sre/components/SmoothScrollProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmoothScrollProvider",
    ()=>SmoothScrollProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/lenis/dist/lenis.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
function SmoothScrollProvider({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const lenis = new __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$lenis$2f$dist$2f$lenis$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]({
            duration: 1.2,
            easing: (t)=>Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return ()=>{
            lenis.destroy();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/aegis_sre/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/Navigation.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$LandingView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/LandingView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$CapabilitiesSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/CapabilitiesSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$ArchitectureSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/ArchitectureSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$DashboardView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/DashboardView.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/Footer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$SmoothScrollProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/aegis_sre/components/SmoothScrollProvider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function Home() {
    const [isLanding, setIsLanding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$SmoothScrollProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SmoothScrollProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "w-full min-h-screen bg-[#050505] overflow-x-hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: isLanding ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    exit: {
                        opacity: 0,
                        scale: 0.95
                    },
                    transition: {
                        duration: 0.5
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$Navigation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navigation"], {}, void 0, false, {
                            fileName: "[project]/aegis_sre/app/page.tsx",
                            lineNumber: 23,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$LandingView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LandingView"], {
                            onEnterAegis: ()=>setIsLanding(false)
                        }, void 0, false, {
                            fileName: "[project]/aegis_sre/app/page.tsx",
                            lineNumber: 26,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$CapabilitiesSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CapabilitiesSection"], {}, void 0, false, {
                            fileName: "[project]/aegis_sre/app/page.tsx",
                            lineNumber: 27,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$ArchitectureSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArchitectureSection"], {}, void 0, false, {
                            fileName: "[project]/aegis_sre/app/page.tsx",
                            lineNumber: 28,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$Footer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                            fileName: "[project]/aegis_sre/app/page.tsx",
                            lineNumber: 29,
                            columnNumber: 15
                        }, this)
                    ]
                }, "landing", true, {
                    fileName: "[project]/aegis_sre/app/page.tsx",
                    lineNumber: 21,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$aegis_sre$2f$components$2f$DashboardView$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardView"], {
                    onBackToHome: ()=>setIsLanding(true)
                }, "dashboard", false, {
                    fileName: "[project]/aegis_sre/app/page.tsx",
                    lineNumber: 32,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/aegis_sre/app/page.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/aegis_sre/app/page.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/aegis_sre/app/page.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__910ba9ea._.js.map