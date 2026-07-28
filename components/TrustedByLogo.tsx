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
      unoptimized
      aria-hidden={hidden}
      onError={() => setFailed(true)}
      className="h-12 w-auto shrink-0 opacity-70 transition-opacity hover:opacity-100"
    />
  );
}
