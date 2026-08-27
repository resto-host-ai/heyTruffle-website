import type { Metadata } from "next";
import {
  Geist_Mono,
  Google_Sans,
  Gowun_Batang,
  Inter,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RebrandModal from "@/components/layout/RebrandModal";
import ScrollReveal from "@/components/layout/ScrollReveal";
import Clarity from "@/components/layout/Clarity";
import Reb2b from "@/components/layout/Reb2b";
import SiteJsonLd from "@/components/layout/JsonLd";
import Chatbase from "@/components/layout/Chatbase";

// Same type families as the RestoHost site: Inter for body/UI and Geist Mono
// for mono accents. Display headings use Gowun Batang (wired into
// --font-display in globals.css). Montserrat was dropped: declared for the
// Resto Experience footer bar, but nothing in the codebase ever used it.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  subsets: ["latin"],
  weight: ["400", "700"],
  // Gowun Batang is a Korean font that Google ships as ~190 unicode-range
  // slices; with preload on, Next emitted 94 <link rel=preload> = 1.48MB of
  // woff2 on EVERY page (measured — it was 55% of the mobile page weight).
  // Without preload the browser fetches only the latin slices it actually
  // renders (~2 files) once the CSS lands. Do not re-enable.
  preload: false,
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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heytruffle.ai"),
  // Plain-string default title: it covers the home page and any route that
  // sets no title of its own. Existing pages already append "— heytruffle" to
  // their own titles, so no template is used (it would double the suffix).
  title: "heytruffle — Fully managed AI Concierge for restaurants",
  description:
    "heytruffle answers your restaurant's phones with an AI Concierge trained for your brand. Reservations, orders, catering and events, tuned every week.",
  alternates: { canonical: "/" },
  verification: {
    google: "A7AGiI5P2uFC-8t5bwNa0gRWdbT5sI5WZpVVQCgZRW0",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "heytruffle",
    title: "heytruffle — Fully managed AI Concierge for restaurants",
    description:
      "heytruffle answers your restaurant's phones with an AI Concierge trained for your brand. Reservations, orders, catering and events, tuned every week.",
    url: "https://heytruffle.ai/",
  },
  twitter: {
    card: "summary_large_image",
    title: "heytruffle — Fully managed AI Concierge for restaurants",
    description:
      "heytruffle answers your restaurant's phones with an AI Concierge trained for your brand. Reservations, orders, catering and events, tuned every week.",
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
      className={`${inter.variable} ${geistMono.variable} ${gowunBatang.variable} ${googleSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        {/* Instagram's in-app browser (and other stripped-down WKWebViews)
            don't define window.webkit, but some third-party script we load
            (Clarity, Reb2b, Calendly) reads
            window.webkit.messageHandlers unguarded to detect a native app
            bridge, throwing "undefined is not an object" and aborting the
            rest of that script — Clarity flagged this on ~25% of sessions
            (Instagram referral traffic). We can't patch a vendor's minified
            bundle, so stub the object before any other script runs: this
            must be the first thing in <body>, and inline (not `src`) so it
            executes synchronously as soon as the parser reaches it. */}
        <script
          id="webkit-stub"
          dangerouslySetInnerHTML={{
            __html: "window.webkit = window.webkit || {};",
          }}
        />
        <Header />
        {children}
        <Footer />
        <RebrandModal />
        <ScrollReveal />
        <Clarity />
        <Reb2b />
        <SiteJsonLd />
        <Chatbase />
      </body>
    </html>
  );
}
