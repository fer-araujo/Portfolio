"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
} from "@/components/ui/BrandIcons";
import { socialLinks } from "@/content/social";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon className="h-5 w-5" />,
  linkedin: <LinkedinIcon className="h-5 w-5" />,
};

const EMAIL = "ferno93@gmail.com";

/**
 * Contact section with email CTA and social links.
 *
 * - Section heading: "Get In Touch"
 * - Brief opportunity text
 * - Prominent email link button
 * - Social links row below
 * - Reveal animation on scroll into view
 */
export function ContactSection() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const content = document.querySelector<HTMLElement>(
        "[data-gsap-contact]"
      );
      if (!content) return;

      gsap.fromTo(
        content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      className="relative py-24 md:py-32"
      id="contact"
      data-testid="contact-section"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title="Get In Touch"
            subtitle={
              "I'm currently open to opportunities in senior engineering roles. " +
              "If you think I'd be a good fit for your team — let's talk."
            }
            aligned="center"
          />
        </Reveal>

        {/* ── GSAP reveal wrapper ────────────── */}
        <div data-gsap-contact>
          {/* ── Email CTA ─────────────────────── */}
          <div className="mt-8">
            <a
              href={`mailto:${EMAIL}`}
              aria-label={`Email me at ${EMAIL}`}
              className="inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Send an Email
            </a>
          </div>

          {/* ── Social links ───────────────────── */}
          <div
            className="mt-10 flex items-center justify-center gap-6"
            data-testid="contact-social-links"
          >
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent/30 hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                {iconMap[link.icon.toLowerCase()] ?? null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
