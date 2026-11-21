"use client";

import { useEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "equiply-theme";
const TRANSITION_CLASS = "theme-transition";
const TRANSITION_MS = 260;

export default function ThemeToggle({ className = "" }) {
    const buttonRef = useRef(null);

    // Keep the accessible label in sync with the theme without using state,
    // which avoids any server/client render mismatch.
    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const sync = () => {
            const isDark = document.documentElement.classList.contains("dark");
            const label = isDark
                ? "Switch to light mode"
                : "Switch to dark mode";

            button.setAttribute("aria-label", label);
            button.setAttribute("title", label);
            button.setAttribute("aria-pressed", String(isDark));
        };

        sync();

        const observer = new MutationObserver(sync);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const handleToggle = () => {
        const root = document.documentElement;
        const isDark = !root.classList.contains("dark");
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!reduceMotion) {
            root.classList.add(TRANSITION_CLASS);
            window.setTimeout(
                () => root.classList.remove(TRANSITION_CLASS),
                TRANSITION_MS
            );
        }

        root.classList.toggle("dark", isDark);
        root.style.colorScheme = isDark ? "dark" : "light";

        try {
            localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
        } catch {
            // Storage may be unavailable (private mode); the theme still applies.
        }
    };

    return (
        <button
            ref={buttonRef}
            type="button"
            onClick={handleToggle}
            aria-label="Switch to dark mode"
            title="Switch to dark mode"
            aria-pressed="false"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#142B45] shadow-sm transition duration-200 hover:border-[#35C77A]/40 hover:bg-[#35C77A]/10 hover:text-[#229c5b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A] ${className}`}
        >
            <Sun size={18} className="theme-icon-light" aria-hidden="true" />
            <Moon size={18} className="theme-icon-dark" aria-hidden="true" />
        </button>
    );
}
