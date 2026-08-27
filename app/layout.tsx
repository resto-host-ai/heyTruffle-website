import type { Metadata } from "next";
import localFont from "next/font/local";
import { preload } from "react-dom";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RebrandModal from "@/components/layout/RebrandModal";
import ScrollReveal from "@/components/layout/ScrollReveal";
import Clarity from "@/components/layout/Clarity";
import Reb2b from "@/components/layout/Reb2b";
import SiteJsonLd from "@/components/layout/JsonLd";
import Chatbase from "@/components/layout/Chatbase";

/* FONTS — self-hosted latin slices, NOT next/font/google. This is a measured
   performance fix, not a style change: the files in ./fonts are byte-identical
   to the latin (u+00??) woff2 slices next/font/google was already serving, and
   the metric overrides below are the ones it generated. Rendering is unchanged.
   
   Why: next/font/google declares EVERY unicode-range slice Google publishes for
   a family and only *preloads* the ones named in `subsets`. The declarations
   still ship. On this site that meant 252 @font-face rules across three
   render-blocking stylesheets — Gowun Batang alone emitted 191 (93 KB raw, of
   which Lighthouse measured 27.4 KB transferred as 100% unused, blocking render
   for 880 ms) because Google ships it as ~190 Korean slices. The site is
   English-only, so 250 of those 252 rules could never match a glyph.
   Going local declares exactly the slices we render: 5 rules, ~1 KB.
   
   Do not "simplify" this back to next/font/google — that regresses ~93 KB of
   render-blocking CSS. To refresh a file, run a build with the google loader
   temporarily restored and re-copy the u+00?? slice out of dist/static/media/. */

// Body/UI (Tailwind `font-sans`). One variable file covers 400-700 — the four
// weights next/font/google declared all pointed at this same file.
const inter = localFont({
  src: "./fonts/Inter-var-latin.woff2",
  variable: "--font-inter",
  weight: "400 700",
  display: "swap",
  // 48 KB. Text paints immediately in the size-adjusted Arial fallback below
  // with no layout shift, so spending critical-path bandwidth here would only
  // starve the LCP font (Gowun Batang 700) it competes with.
  preload: false,
  adjustFontFallback: "Arial",
});

// NOTE: the display family (Tailwind `font-serif` / `font-display`, Gowun
// Batang) is deliberately NOT loaded here. It is declared by hand in
// globals.css against /fonts/gowun-batang-*-latin.woff2 so that the `<link
// rel="preload">` below can point at a stable URL.
//
// Why it has to be that way: the home page LCP element is the hero headline,
// which is this family at weight 700. Lighthouse measured it arriving 774 ms in
// (the longest request chain on the page) because the font was only discovered
// after its stylesheet parsed. next/font names a preloadable file
// `<hash>-s.p.woff2` but Next 16 emits no preload tag for next/font/local in
// the App Router, and it does not expose the hashed URL to application code —
// so there is nothing stable to preload. A path under /public is stable, hence
// the split. next.config.ts gives /fonts/* the immutable cache header the
// content hash would otherwise have provided.

// Section description / lead copy (Tailwind `font-body`). Keeps the GRAD
// (grade) axis globals.css leans on — see the `font-body-graded` rule there.
// Google Sans isn't in next/font's metric-override dataset, so there are no
// generated fallback metrics to reproduce; the explicit stack stands in.
const googleSans = localFont({
  src: "./fonts/GoogleSans-var-latin.woff2",
  variable: "--font-google-sans",
  weight: "400 700",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
});

// Mono accents (Tailwind `font-mono`) — a dozen uses, none above the fold.
const geistMono = localFont({
  src: "./fonts/GeistMono-var-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
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
  /* The hero headline is the home page LCP element and it renders in Gowun
     Batang 700 (declared in globals.css). Without this the browser cannot even
     ask for the file until it has fetched and parsed the stylesheet, which is
     what put it 774 ms into the load - the longest request chain Lighthouse
     found on the page. Preloading starts the fetch off the HTML instead, so
     the headline paints in its real face rather than swapping out of Times New
     Roman mid-load.

     crossOrigin is required, not decorative: fonts are always fetched in CORS
     mode, so a preload without it lands in a separate cache entry that the
     stylesheet request then has to fetch all over again. Only the 700 weight
     is preloaded - the 400 is below the fold.

     react-dom preload() rather than a <link> in the JSX: React hoists a
     rendered <link> into <head> but ALSO registers it as a resource, which
     emitted the tag twice. */
  preload("/fonts/gowun-batang-700-latin.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${googleSans.variable} h-full antialiased`}
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
