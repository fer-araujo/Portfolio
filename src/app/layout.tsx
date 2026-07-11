import type { Metadata, Viewport } from "next";
import { Geist, Inter } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
