"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global Smooth Scroll Provider using Lenis.
 * Creates a premium, weighted scroll feel across the entire page.
 * 
 * scroll-experience skill: "Enhance scroll, don't replace it."
 * Lenis gives a cinematic weight without hijacking native scroll behavior.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,        // Smooth deceleration duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}