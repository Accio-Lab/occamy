import type { Metadata } from "next";
import { Geist_Mono, Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], display: "swap", style: ["normal", "italic"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://occamy-research.ianwang030303.chatgpt.site"),
  title: "Occamy-1.0: Open Pareto-frontier 35B Intelligence for Co-work",
  description: "Occamy-1.0 is a Qwen3.6-35B-A3B model specialized for persistent, reliable execution across long-horizon co-work tasks.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon.svg?v=77", sizes: "any", type: "image/svg+xml" }],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Occamy-1.0: Open Pareto-frontier 35B Intelligence for Co-work",
    description: "Results, real Accio Work trajectories, and a playable artifact from the Accio Team.",
    images: [{ url: "/og-occamy.png", width: 1200, height: 630, alt: "Occamy model and real Accio Work trajectory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Occamy-1.0: Open Pareto-frontier 35B Intelligence for Co-work",
    description: "Results and real Accio Work trajectories from the Accio Team.",
    images: ["/og-occamy.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${newsreader.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
