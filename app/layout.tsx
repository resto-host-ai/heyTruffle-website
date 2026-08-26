import type { Metadata } from "next";
import { Geist_Mono, Google_Sans, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RebrandModal from "@/components/layout/RebrandModal";
import ScrollReveal from "@/components/layout/ScrollReveal";
import Clarity from "@/components/layout/Clarity";
import Graph8 from "@/components/layout/Graph8";
import Reb2b from "@/components/layout/Reb2b";
import SiteJsonLd from "@/components/layout/JsonLd";

// Same type families as the RestoHost site: Inter for body/UI and Geist Mono
// for mono accents. Display headings use Gowun Batang (wired into
// --font-display in globals.css). Montserrat was dropped: declared for the
// Resto Experience footer bar, but nothing in the codebase ever used it.

// Inter as its VARIABLE font (no `weight` array). The four static instances
// this used to request were four separate 48KB latin files — one download per
// weight the page happened to use — and 28 @font-face rules in the
// render-blocking stylesheet. The variable file covers 400-700 in one request.
//
// Preload left on. Dropping it was tried, on the theory that its 48KB sat in
// the preload queue ahead of the hero headline's font: it does not help,
// because Inter sets visible above-the-fold text (header nav, secondary CTA),
// so the browser then discovers it from CSS and fetches it at "VeryHigh" —
// ahead of the preloads rather than behind them.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/* Gowun Batang, self-hosted from a latin subset instead of next/font/google.

   WHY: Google ships this Korean face as ~190 numbered unicode-range slices per
   weight, and `subsets` does NOT filter them — per the next/font docs it only
   decides which subsets get a <link rel=preload>. All 190 @font-face rules
   therefore landed in the render-blocking stylesheet: 190 of the page's 252
   rules, ~28KB gzipped that Lighthouse reported as 100% unused CSS, and the
   deepest node in the critical request chain (the stylesheet had to arrive and
   parse before the browser could even discover the font file).

   These two files are the Google Fonts "text=" subset (the css2 endpoint with
   the site's actual charset: ASCII + Latin-1 + the typographic punctuation the
   copy uses), so they carry the glyphs the browser was downloading anyway —
   but as 2 @font-face rules instead of 190, and preloadable. The raw Google
   latin slice was NOT usable directly: its unicode-range omits H, I, M and N,
   which would have fallen back to Georgia mid-word. Anything outside the
   subset falls back per glyph to the serif stack in --font-display, exactly as
   it did before.

   To regenerate, request this with a browser User-Agent and download the two
   woff2 files it points at:
   fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap&text=<urlencoded charset> */
const gowunBatang = localFont({
  src: [
    {
      path: "./fonts/GowunBatang-latin-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GowunBatang-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gowun-batang",
  display: "swap",
  // Preloaded — worth stating why, because the obvious argument cuts the
  // other way. A <link rel=preload> is fetched at Chrome's "High" priority,
  // whereas a font the browser discovers from CSS as being needed for text
  // it is about to paint gets "VeryHigh"; preloading a hero font can
  // therefore DEMOTE it. Both were measured on Lighthouse mobile, and
  // preloading won where it counts: FCP 1.2s vs 1.4s and CLS 0 vs 0.04
  // (without the preload the swap into this face lands late enough to shift
  // the 38px headline). Preloading is only affordable at all because these
  // are 19KB latin files rather than 1.48MB of Korean slices.
  preload: true,
  // --font-display falls back to ui-serif/Georgia, so size-adjust the metric
  // fallback against a serif rather than next/font/local's Arial default.
  adjustFontFallback: "Times New Roman",
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

// Geist Mono is used only for small mono accents — the ROI calculator, the FAQ
// numbering, the integration/legal pages and the hosts demo. Nothing on the
// home page renders it, let alone above the fold, so preloading it only spent
// 23KB of a phone's first-paint bandwidth on a file most visits never use. It
// still loads normally on the pages that do use it.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heytruffle.ai"),
  // Plain-string default title: it covers the home page and any route that
  // sets no title of its own. Existing pages already append "— heytruffle" to
  // their own titles, so no template is used (it would double the suffix).
  title: "heytruffle — Fully managed AI Concierge for restaurants",
  description:
    "heytruffle answers your restaurant's phones with an AI Concierge trained for your brand. Reservations, orders, catering and events, tuned every week. ",
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
      "heytruffle answers your restaurant's phones with an AI Concierge trained for your brand. Reservations, orders, catering and events, tuned every week. ",
    url: "https://heytruffle.ai/",
  },
  twitter: {
    card: "summary_large_image",
    title: "heytruffle — Fully managed AI Concierge for restaurants",
    description:
      "heytruffle answers your restaurant's phones with an AI Concierge trained for your brand. Reservations, orders, catering and events, tuned every week. .",
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
            (Clarity, the Graph8 chat widget, Reb2b, Calendly) reads
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
        {/* graph8's flow pixel (events.flow.graph8.com/p.js) re-injects an
            inline <script> of its own — via insertTags() calling
            appendChild/insertBefore — on certain events (observed: right
            after a hero CTA click). Its inline payload re-declares a
            top-level `const uuid`, which throws
            "Identifier 'uuid' has already been declared" the second time,
            since classic (non-module) scripts share one global lexical
            scope. That SyntaxError aborts whatever ran it, which is why
            "Hear it live" sometimes did nothing — Clarity measured this on
            ~5% of sessions. We can't fix graph8's bundle, so patch the DOM
            APIs it uses to swallow only this specific redeclaration error
            (rethrowing everything else) before graph8's script ever loads. */}
        <script
          id="script-redeclare-guard"
          dangerouslySetInnerHTML={{
            __html: `(function(){
  function guard(name){
    var orig = Node.prototype[name];
    Node.prototype[name] = function(){
      try { return orig.apply(this, arguments); }
      catch (e) {
        if (e instanceof SyntaxError && /already been declared/.test(e.message)) {
          return arguments[0];
        }
        throw e;
      }
    };
  }
  guard("appendChild");
  guard("insertBefore");
})();`,
          }}
        />
        <Header />
        {children}
        <Footer />
        <RebrandModal />
        <ScrollReveal />
        <Clarity />
        <Graph8 />
        <Reb2b />
        <SiteJsonLd />
      </body>
    </html>
  );
}
