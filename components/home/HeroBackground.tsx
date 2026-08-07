import Image from "next/image";
import { NOISE } from "@/lib/noise";

/**
 * Animated hero background — the Figma "HeyTruffle_UI" living gradient.
 *
 * This used to be a live inline SVG: 9 colour blobs, each inside an
 * feGaussianBlur of up to stdDeviation 200, under an feTurbulence grain pass,
 * covering the whole viewport. WebKit rasterises that filter chain on the
 * CPU — and iOS re-rasterises it EVERY time the viewport resizes, which on
 * iPhones happens on every scroll as Safari's URL bar collapses/expands.
 * That starved the compositor for whole seconds per scroll: the drift
 * animation never got a frame (the bg looked frozen on phones), logo paints
 * lagged, and content below the hero appeared seconds late. Measured on
 * iPhone 15 / 17 Pro Max against both Render and Vercel — hosting-independent.
 *
 * The SVG is now pre-rendered ONCE into hero-living-gradient.webp (34KB —
 * captured without the noise pass, whose high-frequency grain defeats webp;
 * the grain is reapplied below as the site's cheap NOISE texture). The
 * .hero-bg-anim wrapper keeps the exact same CSS drift, now moving a plain
 * bitmap: zero runtime filters, and the motion finally runs on phones too.
 * The source SVG lives in git history (this file, before 2026-07-28) if the
 * gradient ever needs re-rendering.
 */
export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="hero-bg-anim pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-ink"
    >
      <Image
        src="/images/hero-living-gradient.webp"
        alt=""
        fill
        preload
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
      {/* Grain — replaces the SVG's feTurbulence pass. Plain opacity (no
          mix-blend) keeps it free on mobile compositors. */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{ backgroundImage: NOISE }}
      />
    </div>
  );
}
