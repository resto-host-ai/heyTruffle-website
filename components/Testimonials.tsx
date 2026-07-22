"use client";

import Image from "next/image";
import { useState } from "react";

const TESTIMONIALS = [
  {
    id: "mojitos",
    restaurant: "Mojitos",
    person: "Luis Fernandez",
    role: "Owner & Operator",
    quote: "We never miss calls anymore",
    posterUrl: "/testimonials/lima-poster.webp",
    vimeoId: "1163755952",
  },
  {
    id: "rreal-tacos",
    restaurant: "Rreal Tacos",
    person: "Miguel Hernandez",
    role: "C.O.O & Co-Owner",
    quote: "Our staff finally focuses on guests",
    posterUrl: "/testimonials/rreal-poster.webp",
    vimeoId: "1163753938",
  },
] as const;

const VIMEO_PARAMS =
  "autoplay=1&color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-[#251f21] pb-24 md:pb-32">
      <div className="mx-auto w-full px-6 lg:px-[73px]">
        <div className="mx-auto mb-14 max-w-[720px] text-center">
          <h2 className="font-serif text-4xl text-cream md:text-5xl">
            What restaurants say about{" "}
            <span className="text-brand-orange">heytruffle.</span>
          </h2>
          <p className="font-body mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
            Real stories from restaurant owners and teams who streamlined
            their operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  restaurant,
  person,
  role,
  quote,
  posterUrl,
  vimeoId,
}: (typeof TESTIMONIALS)[number]) {
  const [playing, setPlaying] = useState(false);

  return (
    <article className="flex flex-col overflow-hidden rounded-[28px] bg-[#f6f3ec] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div
        className="relative w-full overflow-hidden bg-[#1c1917]"
        style={{ aspectRatio: "16 / 12" }}
      >
        {playing ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?${VIMEO_PARAMS}`}
            title={`${restaurant} testimonial`}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            aria-label={`Play ${restaurant} testimonial — ${person}`}
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block h-full w-full border-0 bg-transparent p-0"
          >
            <Image
              src={posterUrl}
              alt={`${person}, ${role} at ${restaurant}: "${quote}"`}
              fill
              sizes="(max-width: 720px) 100vw, 580px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f6f3ec]/90 shadow-[0_12px_34px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#251f21">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[#251f21]/10 px-6 py-5 md:px-7 md:py-6">
        <div>
          <div className="text-sm font-semibold text-[#251f21]">{person}</div>
          <div className="mt-0.5 text-[13px] text-[#251f21]/60">
            {role} · {restaurant}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPlaying(true)}
          disabled={playing}
          className="rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-[#d96700] disabled:pointer-events-none disabled:opacity-50"
        >
          {playing ? "Playing…" : "Watch ▶"}
        </button>
      </div>
    </article>
  );
}
