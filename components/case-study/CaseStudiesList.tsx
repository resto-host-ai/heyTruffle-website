"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NOISE } from "@/lib/noise";

type Category = "operational" | "cuisine" | "location";

type CaseCard = {
  name: string;
  stat: string;
  gradient: string;
  cuisine: string;
  location: string;
  operational: string;
  /** Number of locations (display badge). */
  locations: string;
  /** Detail-page slug (omit while the page doesn't exist yet). */
  slug?: string;
};

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
      "Mississipi",
      "Miami",
      "Orlando",
      "LA",
      "Dallas",
      "New Jersey",
    ],
  },
];

const CASES: CaseCard[] = [
  {
    name: "Rreal Tacos",
    stat: "19k+",
    slug: "rreal-tacos",
    location: "Atlanta",
    operational: "Reservations",
    cuisine: "Mexican",
    locations: "12",
    gradient:
      "radial-gradient(120% 110% at 50% 125%, #a5487c 0%, #52293f 34%, #241d20 68%)",
  },
  {
    name: "Aplos",
    stat: "3.2k+",
    slug: "aplos",
    location: "Mississipi",
    operational: "Phone Orders",
    cuisine: "Mediterranean",
    locations: "4",
    gradient:
      "radial-gradient(120% 110% at 50% 125%, #322a2d 0%, #241e20 44%, #1e1a1c 100%)",
  },
  {
    name: "Baires Grill",
    stat: "7.5k+",
    slug: "baires-grill",
    location: "Miami",
    operational: "Reservations",
    cuisine: "Steakhouse",
    locations: "9",
    gradient:
      "radial-gradient(120% 110% at 50% 125%, #302a2c 0%, #241e20 44%, #1e1a1c 100%)",
  },
  {
    name: "Mangos",
    stat: "1.7k+",
    slug: "mangos-tropical-cafe",
    location: "Orlando",
    operational: "Reservations",
    cuisine: "Latin/Caribbean",
    locations: "1",
    gradient:
      "radial-gradient(120% 115% at 50% 125%, #ef7200 0%, #8a4a17 36%, #241d20 70%)",
  },
  {
    name: "Kyochon",
    stat: "1.2k+",
    slug: "kyochon",
    location: "LA",
    operational: "Phone Orders",
    cuisine: "Korean Chicken",
    locations: "2",
    gradient:
      "radial-gradient(120% 115% at 50% 125%, #322a2d 0%, #241e20 44%, #1e1a1c 100%)",
  },
  {
    name: "Chelsea Corner",
    stat: "2.2k+",
    slug: "chelsea-corner",
    location: "Dallas",
    operational: "Reservations",
    cuisine: "American",
    locations: "1",
    gradient:
      "radial-gradient(120% 115% at 50% 125%, #3a2c22 0%, #271f1e 44%, #1e1a1c 100%)",
  },
  {
    name: "Rumba Cubana",
    stat: "4k+",
    slug: "rumba-cubana",
    location: "New Jersey",
    operational: "Reservations",
    cuisine: "Cuban",
    locations: "6",
    gradient:
      "radial-gradient(120% 115% at 50% 125%, #2f5bd7 0%, #223268 36%, #1c1a26 70%)",
  },
  {
    name: "KYU",
    stat: "1.2k+",
    slug: "kyu",
    location: "Miami",
    operational: "Reservations",
    cuisine: "Pan-Asian",
    locations: "3",
    gradient:
      "radial-gradient(120% 110% at 50% 125%, #302a2c 0%, #241e20 44%, #1e1a1c 100%)",
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

function ArrowUpRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
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
    <section className="relative overflow-hidden bg-cream pb-24 pt-32 md:pb-32 md:pt-40">
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
          catering with HeyTruffle. Filter by operational need, cuisine or
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

        {/* Case grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((c) => {
            // Always render two rows of two so the location count never ends
            // up stranded on its own line: [location, need] / [cuisine, count].
            const tagRows = [
              [c.location, c.operational],
              [c.cuisine, c.locations],
            ];
            return (
              <article
                key={c.name}
                className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[25px] text-cream md:h-[459.605px] md:min-h-0"
                style={{ backgroundImage: c.gradient }}
              >
                {/* Grain overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{ backgroundImage: NOISE }}
                />

                <div className="relative flex flex-1 flex-col justify-between p-7">
                  <h3 className="font-body text-[40px] font-normal! leading-[120%]">
                    {c.name}
                  </h3>

                  <div>
                    <p className="font-body text-[56px] font-normal leading-[110%] md:text-[72px]">
                      {c.stat}
                    </p>

                    <Link
                      href={c.slug ? `/case-study/${c.slug}` : "#"}
                      className="mt-5 inline-flex items-center gap-2 self-start font-body text-[16px] font-normal leading-[145%] md:text-[18px] underline underline-offset-4 transition-opacity hover:opacity-80 md:text-[26px]"
                    >
                      Read more
                      <ArrowUpRight />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {tagRows.map((row, r) => (
                      <div key={r} className="flex gap-2.5">
                        {row.map((tag, i) => (
                          <span
                            key={`${tag}-${i}`}
                            className="flex flex-auto min-w-0 min-h-[36px] items-center justify-center whitespace-nowrap rounded-full border border-cream px-3.5 py-1 text-center font-body text-[15px] font-normal leading-[110%] md:text-[16px] text-cream"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
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
