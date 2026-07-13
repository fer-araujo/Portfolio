import type { Metadata, Viewport } from "next";
import { Geist, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/lib/lenis";
import { FilmGrain } from "@/components/ui/FilmGrain";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fer Araujo — Sr Software Engineer",
  description:
    "Senior Software Engineer specializing in modern frontend architecture, React, TypeScript, and building performant web experiences.",
  keywords: [
    "software engineer",
    "frontend",
    "react",
    "typescript",
    "portfolio",
  ],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} dark`}>
      <body className="min-h-dvh bg-bg text-text font-body antialiased">
        {/* Skip link — first focusable element, visually hidden until focused (A11Y-01) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-2 focus:left-2 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {/* Global atmospheric gradient — creates fog/mist connecting all sections */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-bg via-bg-alt to-bg"
          aria-hidden="true"
        />
        <LenisProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
        <FilmGrain />
      </body>
    </html>
  );
}
