"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { INTEGRATIONS } from "@/lib/integrations";

const ROW_TOP = [
  { name: "Postmates", file: "postmates.png" },
  { name: "Flipdish", file: "flipdish.png" },
  { name: "Toast", file: "toast.png" },
  { name: "Clover", file: "clover.png" },
  { name: "Grubhub", file: "grubhub.png" },
  { name: "DoorDash", file: "doordash.png" },
  { name: "Uber Eats", file: "uber-eats.png" },
  { name: "ChowNow", file: "chownow.png" },
] as const;

const ROW_BOTTOM = [
  { name: "DoorDash", file: "doordash.png" },
  { name: "SevenRooms", file: "sevenrooms.png" },
  { name: "Clover", file: "clover.png" },
  { name: "OpenTable", file: "opentable.png" },
  { name: "Resy", file: "resy.png" },
  { name: "Postmates", file: "postmates.png" },
  { name: "Toast", file: "toast.png" },
  { name: "Grubhub", file: "grubhub.png" },
] as const;

const TRANSLATE_RANGE = 450;

export default function Integrations() {
  const sectionRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const slugByBrand = useMemo(() => {
    const m = new Map<string, string>();
    for (const i of INTEGRATIONS) m.set(i.brand.toLowerCase(), i.slug);
    return m;
  }, []);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const total = vh + rect.height;
      const seen = vh - rect.top;
      const progress = Math.max(0, Math.min(1, seen / total));

      const tx = (progress - 0.5) * 2 * TRANSLATE_RANGE;

      if (topRef.current) {
        topRef.current.style.transform = `translate3d(${-tx}px, 0, 0)`;
      }
      if (bottomRef.current) {
        bottomRef.current.style.transform = `translate3d(${tx}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="integrations" className="bg-[#251f21] py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mx-auto mb-12 max-w-[760px] text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/60">
            Restaurant stack
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-cream md:text-5xl">
            Integrates with your existing{" "}
            <span className="text-[#d592f3]">restaurant stack.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
            Plug heytruffle into the tools you already use: POS, reservations
            and delivery aggregators. No migrations, no replatforming.
          </p>
        </div>
      </div>

      <div className="int-fade">
        <div ref={topRef} className="int-row">
          {[...ROW_TOP, ...ROW_TOP, ...ROW_TOP].map((logo, i) => (
            <Logo
              key={`top-${logo.name}-${i}`}
              {...logo}
              slug={slugByBrand.get(logo.name.toLowerCase())}
            />
          ))}
        </div>
        <div ref={bottomRef} className="int-row">
          {[...ROW_BOTTOM, ...ROW_BOTTOM, ...ROW_BOTTOM].map((logo, i) => (
            <Logo
              key={`bot-${logo.name}-${i}`}
              {...logo}
              slug={slugByBrand.get(logo.name.toLowerCase())}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Logo({
  name,
  file,
  slug,
}: {
  name: string;
  file: string;
  slug?: string;
}) {
  const img = (
    <img
      className="int-logo"
      src={`/images/integrations/${file}`}
      alt={name}
      title={name}
      loading="lazy"
      decoding="async"
    />
  );
  if (!slug) {
    return (
      <span className="int-logo-link" aria-hidden>
        {img}
      </span>
    );
  }
  return (
    <Link
      href={`/integrations/${slug}`}
      aria-label={`${name} integration`}
      className="int-logo-link"
    >
      {img}
    </Link>
  );
}
