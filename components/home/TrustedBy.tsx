import Image from "next/image";

/** Restaurant logos for the infinite carousel — every `logo_*` asset.
 *
 *  These were .svg files, but only nominally: each was a base64 PNG inside an
 *  <svg> shell, which cost 33% in encoding overhead and forced `unoptimized`
 *  on the <Image> (next/image will not process an SVG). Re-encoded as real
 *  WebP at the same pixel dimensions, the set went from 291 KB to 116 KB and
 *  can now be served as AVIF by the optimizer.
 *
 *  `w`/`h` are the bitmap's true intrinsic size, which is NOT what the old
 *  values described — those were the <svg> element's box (108x73 for a bitmap
 *  that is really 218x148). They only set the aspect ratio and the width
 *  next/image sizes against; the rendered size comes from .marquee-item in
 *  globals.css, which caps height at 74px. Keep them at 2x that cap: the fine
 *  strokes on KYU and Baires visibly resample below it. */
/* Trimmed copies (public/images/logos-trimmed): the originals carry uneven
   transparent padding, which made the same CSS gap look different between
   logos. `w`/`h` are the trimmed bitmap's size. */
const LOGOS = [
  { src: "/images/logos-trimmed/logo_kyu.webp", alt: "KYU", w: 207, h: 128 },
  { src: "/images/logos-trimmed/logo_canita.webp", alt: "La Cañita", w: 233, h: 102 },
  { src: "/images/logos-trimmed/logo_mojitos.webp", alt: "Mojitos", w: 189, h: 99 },
  { src: "/images/logos-trimmed/logo_lima.webp", alt: "Lima", w: 304, h: 143 },
  { src: "/images/logos-trimmed/logo_rreal.webp", alt: "Rreal Tacos", w: 148, h: 148 },
  { src: "/images/logos-trimmed/logo_south.webp", alt: "South Beach", w: 150, h: 148 },
  { src: "/images/logos-trimmed/logo_grove.webp", alt: "The Grove", w: 383, h: 86 },
  { src: "/images/logos-trimmed/logo_baires.webp", alt: "Baires Grill", w: 133, h: 106 },
  { src: "/images/logos-trimmed/logo_palms.webp", alt: "Palm Tree Club", w: 384, h: 90 },
  { src: "/images/logos-trimmed/logo_esme.webp", alt: "Esme", w: 241, h: 129 },
];

/* Optical sizing: every logo gets the same visual area instead of the same
   height. Height scales with 1/sqrt(aspect), so a square mark renders at the
   full --logo-base height and a long wordmark proportionally shorter (and
   wider). Clamped so the widest marks don't shrink to a sliver. */
const heightFactor = (w: number, h: number) => Math.max(0.5, Math.min(1, 1 / Math.sqrt(w / h)));

// Duplicated so the -50% translate loops seamlessly.
const TRACK = [...LOGOS, ...LOGOS];

export default function TrustedBy() {
  return (
    <section id="trusted" className="pb-6 pt-16 md:pt-[calc(80*var(--fx))]">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <h2 className="reveal reveal-up font-body text-center text-[16px] font-normal! leading-[145%] md:text-[calc(18*var(--fx))] text-cream/90">
          Restaurants powered by heytruffle answer every call.{" "}
          <span className="text-[#d592f3]">Your restaurant can too.</span>
        </h2>
      </div>

      {/* Infinite carousel. The edge fade is a mask only from md — masking a
          container whose content translates every frame makes WebKit
          re-composite the whole strip per frame; phones get two cheap gradient
          overlays over the section bg instead. */}
      <div className="group relative mt-12 overflow-hidden md:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee mobile-logo-marquee flex w-max items-center gap-12 pr-12 [--logo-base:72px] md:gap-[calc(72*var(--fx))] md:pr-[calc(72*var(--fx))] md:[--logo-base:calc(100*var(--fx))]">
          {TRACK.map((logo, i) => (
            <div
              className="marquee-item marquee-item--optical"
              key={i}
              style={{ height: `calc(var(--logo-base) * ${heightFactor(logo.w, logo.h).toFixed(3)})` }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                aria-hidden={i >= LOGOS.length}
                loading={i < 3 ? "eager" : "lazy"}
                fetchPriority={i < 3 ? "low" : undefined}
                unoptimized
                className="h-full w-auto shrink-0"
              />
            </div>
          ))}
        </div>
        {/* Phone-only edge fades (see the mask note above) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink to-transparent md:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink to-transparent md:hidden"
        />
      </div>

      <p className="mt-12 text-center font-body text-[15px] font-normal leading-[110%] md:text-[calc(16*var(--fx))] text-cream">
        Trusted by +100 U.S brands
      </p>
    </section>
  );
}
