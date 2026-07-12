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
        {/* Global atmospheric gradient — creates fog/mist connecting all sections */}
        <div
          className="fixed inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            zIndex: -1,
            background: `
              linear-gradient(
                to bottom,
                var(--background) 0%,
                var(--background) 25%,
                var(--bg-alt) 40%,
                var(--bg-alt) 55%,
                var(--background) 65%,
                var(--bg-alt) 80%,
                var(--background) 100%
              )
            `,
          }}
        />
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
        <FilmGrain />
      </body>
    </html>
  );
}
