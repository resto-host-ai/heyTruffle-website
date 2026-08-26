"use client";

import { useState } from "react";
import Image from "next/image";

/** A single logo in the TrustedBy marquee. If the asset 404s or fails to
 *  decode, the slot disappears entirely — a blank gap reads better in a
 *  trust-signal band than a visibly broken-image icon. */
export default function TrustedByLogo({
  src,
  alt,
  width,
  height,
  hidden,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  hidden?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      /* The marquee renders every logo 48px tall (h-12), so let the
         optimizer serve AVIF at the density the device asks for instead of
         the full-size source. `unoptimized` used to be unavoidable here:
         these assets were .svg wrappers around a base64 PNG, and next/image
         refuses to process SVG. They are real rasters now
         (scripts/extract-logo-rasters.mjs), so it can.

         `sizes` is what makes the srcset useful at this scale. Without it
         next/image treats the image as fixed-size and offers only 1x/2x off
         `width`, snapped up to the nearest configured width — a 205px-wide
         logo asked for its 2x at 410px, found nothing between 384 and 640,
         and shipped 640. With `sizes` the whole `imageSizes` ladder
         (16...384) becomes available, so the browser picks the candidate that
         actually matches the slot at its own DPR. Every logo renders at one
         fixed width at every breakpoint (h-12, w-auto), so `sizes` is just
         that width in px. */
      sizes={`${width}px`}
      aria-hidden={hidden}
      onError={() => setFailed(true)}
      className="h-12 w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100"
    />
  );
}
