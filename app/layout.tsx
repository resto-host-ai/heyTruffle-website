import type { Metadata } from "next";
import {
  Geist_Mono,
  Google_Sans,
  Gowun_Batang,
  Inter,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RebrandModal from "@/components/layout/RebrandModal";
import ScrollReveal from "@/components/layout/ScrollReveal";
import Clarity from "@/components/layout/Clarity";
import SiteJsonLd from "@/components/layout/JsonLd";

// Same type families as the RestoHost site: Inter for body/UI, Montserrat
// for the Resto Experience footer bar, and Geist Mono for mono accents.
// Display headings use Gowun Batang (wired into --font-display in globals.css).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Google Sans for section description / lead copy. Google Sans isn't in
// next/font's metric-override dataset, so the automatic size-adjusted fallback
// can't be generated (hence the "Failed to find font override values" warning).
// Disable that step and provide an explicit fallback stack instead.
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  adjustFontFallback: false,
  // Include the GRAD (grade) axis so components can shave a hair off the stroke
  // weight to match Figma's lighter rasterisation — grade changes thickness
  // WITHOUT altering the font's metrics, so size/layout stay identical.
  axes: ["GRAD"],
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heytruffle.ai"),
  // Plain-string default title: it covers the home page and any route that
  // sets no title of its own. Existing pages already append "— heytruffle" to
  // their own titles, so no template is used (it would double the suffix).
  title: "heytruffle — Voice AI That Answers Every Restaurant Call",
  description:
    "heytruffle is the fully managed voice AI service for U.S. restaurants. We answer 100% of calls 24/7 in English & Spanish — every reservation booked, every order taken, every catering inquiry closed.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "heytruffle",
    title: "heytruffle — Voice AI That Answers Every Restaurant Call",
    description:
      "The fully managed voice AI service that answers every call for your restaurants — reservations, orders and catering, 24/7 in English & Spanish.",
    url: "https://heytruffle.ai/",
  },
  twitter: {
    card: "summary_large_image",
    title: "heytruffle — Voice AI That Answers Every Restaurant Call",
    description:
      "The fully managed voice AI service that answers every restaurant call — reservations, orders and catering, 24/7.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} ${gowunBatang.variable} ${googleSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <Header />
        {children}
        <Footer />
        <RebrandModal />
        <ScrollReveal />
        <Clarity />
        <SiteJsonLd />
      </body>
    </html>
  );
}
