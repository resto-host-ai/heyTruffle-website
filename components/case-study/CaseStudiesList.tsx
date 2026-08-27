"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CASES } from "@/lib/data/case-studies";

type Category = "operational" | "cuisine" | "location";

const FILTER_GROUPS: { key: Category; label: string; options: string[] }[] = [
  {
    key: "operational",
    label: "Operational need",
    options: ["Reservations", "Phone Orders"],
  },
  {
    key: "cuisine",
    label: "Cuisine",
    options: [
      "Mexican",
      "Mediterranean",
      "Steakhouse",
      "Latin/Caribbean",
      "Korean Chicken",
      "American",
      "Cuban",
      "Pan-Asian",
    ],
  },
  {
    key: "location",
    label: "Location",
    options: [
      "Atlanta",
      "Mississippi",
      "Miami",
      "Orlando",
      "LA",
      "Dallas",
      "New Jersey",
    ],
  },
];

function ChevronCircle({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m8 11 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0 text-brand-orange"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function CaseStudiesList() {
  const [open, setOpen] = useState<Category | null>(null);
  const [selected, setSelected] = useState<Record<Category, string[]>>({
    operational: [],
    cuisine: [],
    location: [],
  });
  const filtersRef = useRef<HTMLDivElement>(null);

  // Close the open dropdown when clicking outside the filter row.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const toggleOption = (key: Category, option: string) => {
    setSelected((prev) => {
      const has = prev[key].includes(option);
      return {
        ...prev,
        [key]: has
          ? prev[key].filter((o) => o !== option)
          : [...prev[key], option],
      };
    });
  };

  const visible = CASES.filter((c) => {
    const okOp =
      selected.operational.length === 0 ||
      selected.operational.includes(c.operational);
    const okCui =
      selected.cuisine.length === 0 || selected.cuisine.includes(c.cuisine);
    const okLoc =
      selected.location.length === 0 || selected.location.includes(c.location);
    return okOp && okCui && okLoc;
  });

  return (
    <section className="relative overflow-hidden bg-cream pb-24 pt-32 md:pb-32 md:pt-40 min-h-[95vh]">
      {/* Warm orange (#EF7200) glow from the top-right and bottom-left corners */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(60% 65% at 100% 0%, rgba(239,114,0,0.7) 0%, rgba(239,114,0,0.16) 36%, transparent 64%)",
            "radial-gradient(60% 65% at 0% 100%, rgba(239,114,0,0.7) 0%, rgba(239,114,0,0.16) 36%, transparent 64%)",
          ].join(", "),
        }}
      />

      <div className="relative mx-auto w-full px-6 lg:px-[73px]">
        <h1 className="mx-auto max-w-[1085px] text-center font-serif text-[34px] font-bold! leading-[110%] text-[#251f21] md:text-[44px] lg:text-[52px]">
          Real restaurants. Real results.
        </h1>
        <p className="mx-auto mt-6 max-w-[1085px] text-center font-body text-[16px] font-normal leading-[145%] text-[#251f21] md:text-[18px]">
          Explore how restaurants are capturing more reservations, orders and
          catering with heytruffle. Filter by operational need, cuisine or
          location to find the case closest to your own.
        </p>

        {/* Filters */}
        <div
          ref={filtersRef}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {FILTER_GROUPS.map((group) => (
            <div key={group.key} className="relative w-[290px] max-w-full">
              <button
                type="button"
                onClick={() =>
                  setOpen((cur) => (cur === group.key ? null : group.key))
                }
                className="flex w-full items-center justify-between gap-4 whitespace-nowrap rounded-full bg-[#251f21]/60 px-8 py-5 font-body text-[16px] font-bold leading-none text-cream backdrop-blur-sm transition-colors hover:bg-[#251f21]/75"
              >
                {group.label}
                <ChevronCircle open={open === group.key} />
              </button>

              {open === group.key && (
                <div className="absolute left-0 top-full z-30 mt-3 w-full rounded-[20px] bg-cream p-3 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
                  {group.options.map((option) => {
                    const isSelected = selected[group.key].includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleOption(group.key, option)}
                        className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left font-body text-[16px] leading-[145%] md:text-[18px] text-[#251f21] transition-colors hover:bg-[#251f21]/[0.06]"
                      >
                        <span className={isSelected ? "font-medium" : ""}>
                          {option}
                        </span>
                        {isSelected && <Check />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Case grid — photo-first cards: real dining room on top (name and
            operational-need chip over it), white body with the number tied to
            its unit and an operational one-liner below. 3 columns so the 9
            cards land as full rows and the photos keep enough width to read. */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => (
            <Link
              key={c.name}
              href={c.slug ? `/case-study/${c.slug}/` : "#"}
              className="group relative flex flex-col overflow-hidden rounded-[25px] border border-[#251f21]/10 bg-white shadow-[0_14px_40px_rgba(37,31,33,0.10)] transition-shadow duration-300 hover:shadow-[0_22px_54px_rgba(37,31,33,0.18)]"
            >
              {/* Dark bg + a hair of scale: fill images round down to whole
                  pixels, and on fractional card widths that leaves a white
                  sliver of the card peeking at the photo's edges. */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#251f21]">
                <Image
                  src={c.image}
                  alt={`${c.name} — ${c.cuisine} restaurant in ${c.location}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="scale-[1.01] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {/* Legibility scrim behind the name */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#251f21]/60 to-transparent"
                />
                <p className="absolute right-4 top-4 max-w-[70%] text-right font-body text-[13px] font-bold uppercase leading-[120%] tracking-[0.08em] text-cream">
                  {c.name}
                </p>
                <span className="absolute bottom-3.5 left-4 rounded-full bg-brand-orange px-3 py-1.5 font-body text-[12px] font-bold uppercase leading-none tracking-[0.06em] text-white">
                  {c.operational}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center px-5 pb-5 pt-4">
                <p>
                  <span className="font-serif text-[32px] font-bold leading-[110%] text-[#251f21]">
                    {c.stat}
                  </span>{" "}
                  <span className="font-body text-[16px] font-normal text-[#251f21]/70">
                    {c.statLabel}
                  </span>
                </p>
                <p className="mt-1 font-body text-[15px] font-normal leading-[145%] text-[#251f21]/70">
                  {c.cuisine} · {c.locations}{" "}
                  {c.locations === "1" ? "location" : "locations"} · {c.location}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center font-body text-[22px] text-[#251f21]/70">
            No restaurants match those filters yet.
          </p>
        )}
      </div>
    </section>
  );
}
