import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/content/site";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.name} · ${profile.role}`,
  description:
    "Senior frontend engineer in Dhaka focused on React, Next.js and TypeScript for data-heavy enterprise products, with full-stack depth in NestJS and SQL.",
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description: "Case study, selected work, technical notes and writing.",
    type: "website",
    images: ["/headshot.jpg"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#090B10", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
