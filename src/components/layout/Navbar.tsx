"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLenisScroll } from "@/lib/lenis";

interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "Experience", href: "#experience", sectionId: "experience" },
  { label: "Projects", href: "#work", sectionId: "work" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

/**
 * Sticky top navbar with scroll-aware styling.
 *
 * - Transparent at top of page → solid (with backdrop-blur) on scroll
 * - Logo/name "Fer Araujo" on the left
 * - Nav links on the right: About, Skills, Experience, Projects, Contact
 * - Active section highlighted based on scroll position
 * - Mobile hamburger menu with animated open/close
 * - Respects prefers-reduced-motion
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const lenis = useLenisScroll();

  /* ── Scroll tracking ─────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Active section tracking ─────────────────────── */
  useEffect(() => {
    const handleActive = () => {
      const scrollY = window.scrollY + 120;
      let active = "";

      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.sectionId);
        if (section && section.offsetTop <= scrollY) {
          active = link.sectionId;
        }
      }

      setActiveSection(active);
    };

    window.addEventListener("scroll", handleActive, { passive: true });
    handleActive();
    return () => window.removeEventListener("scroll", handleActive);
  }, []);

  /* ── Smooth scroll helper ────────────────────────── */
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      if (lenis?.scrollTo) {
        lenis.scrollTo(section);
      } else {
        section.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    [lenis]
  );

  return (
    <motion.nav
      data-testid="navbar"
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? prefersReduced
            ? "bg-bg"
            : "bg-bg/80 backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* ── Logo ──────────────────────────────────── */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="text-lg font-heading font-bold tracking-tight text-text"
        >
          Fer Araujo
        </a>

        {/* ── Desktop nav links ─────────────────────── */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => scrollToSection(link.sectionId)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                activeSection === link.sectionId
                  ? "text-accent"
                  : "text-text-muted hover:cursor-pointer hover:text-text hover:bg-white/5"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── Mobile hamburger ──────────────────────── */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-lg p-2 text-text-muted hover:cursor-pointer hover:text-text md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile menu ──────────────────────────────── */}
      {mobileOpen && (
        <motion.div
          data-testid="mobile-menu"
          initial={prefersReduced ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-bg px-4 pb-4 pt-2 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors hover:cursor-pointer",
                  activeSection === link.sectionId
                    ? "bg-accent/5 text-accent"
                    : "text-text-muted hover:text-text hover:bg-white/5"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
