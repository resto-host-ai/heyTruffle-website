import type { NextConfig } from "next";

/* The testimonials section embeds Vimeo (components/Testimonials.tsx). An
   iframe can only use a feature the parent page still holds, so every
   permission its `allow` attribute asks for has to be delegated here too —
   otherwise the player loses fullscreen/autoplay and fails silently. */
const VIMEO = "https://player.vimeo.com";

/* Everything the site does not use is denied outright; the rest is limited to
   this origin plus the Vimeo player. */
const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "camera=()",
  "display-capture=()",
  // Never requested: lib/demoAssistant.ts accepts optional coords but no
  // caller ever passes them, and the privacy policy states we don't collect
  // precise location.
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "usb=()",
  "xr-spatial-tracking=()",
  `autoplay=(self "${VIMEO}")`,
  `clipboard-write=(self "${VIMEO}")`,
  `encrypted-media=(self "${VIMEO}")`,
  `fullscreen=(self "${VIMEO}")`,
  `picture-in-picture=(self "${VIMEO}")`,
].join(", ");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  /* The site is never meant to be framed. Calendly is unaffected — it embeds
     its widget INTO our page, which this does not restrict. */
  { key: "X-Frame-Options", value: "DENY" },
  /* Deliberately short and without `preload`: HSTS preload is effectively
     irreversible, so we start at one day for launch and raise it to a year
     once the domain has run clean on HTTPS for a few weeks. No
     includeSubDomains yet either — demo.heytruffle.ai is a separate service. */
  { key: "Strict-Transport-Security", value: "max-age=86400" },
  { key: "Permissions-Policy", value: PERMISSIONS_POLICY },
];

const nextConfig: NextConfig = {
  distDir: 'dist',
  // Trailing slashes keep the served URLs in sync with the trailing-slash
  // canonicals declared in each page's metadata (and match the RestoHost SEO
  // setup this site inherits).
  trailingSlash: true,
  devIndicators: false,
  // Don't advertise the framework and its version to fingerprinting scanners.
  poweredByHeader: false,
  images: {
    /* 90 is the ceiling for the smooth gradient backgrounds — it keeps them
       free of banding at a fraction of the cost. 100 was measured at 5-9x the
       bytes of 90 for no visible gain (992 KB vs 111 KB on hero-gradiants2 at
       1920px) and is deliberately not allowed: anything not listed here is
       rejected, so `?q=100` can't be forced through the optimizer by hand. */
    qualities: [75, 90],
    /* AVIF first: 30-50% smaller than webp on the 100vw gradient backgrounds
       (the site's heaviest image class). Next's default is webp-only. */
    formats: ["image/avif", "image/webp"],
  },
  /* NOTE: no Content-Security-Policy yet — it's the one header here that can
     break the site (Calendly, Clarity, Vimeo and the demo backend all load
     third-party code), so it's being handled as its own change. */
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;