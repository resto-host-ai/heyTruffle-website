"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookDemoButton } from "@/components/ui/BookDemoButton";
import HeroBackground from "@/components/home/HeroBackground";
import {
  demoAppUrl,
  newSessionToken,
  searchRestaurants,
  type PlaceSuggestion,
} from "@/lib/demoAssistant";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState<string | null>(null);
  // Dropdown visibility is its own bit of state, not just "results.length >
  // 0": it also needs to show the searching/error/no-matches copy, and it
  // needs to hide again on outside click even if results are still cached.
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tokenRef = useRef<string>("");
  const searchIdRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Run an autocomplete request, ignoring out-of-order responses.
  const runSearch = useCallback((input: string) => {
    const q = input.trim();
    if (q.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    const id = ++searchIdRef.current;
    setSearching(true);
    setError(null);
    searchRestaurants(q, tokenRef.current)
      .then((r) => {
        if (id === searchIdRef.current) setResults(r);
      })
      .catch((err) => {
        if (id === searchIdRef.current) {
          setResults([]);
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      })
      .finally(() => {
        if (id === searchIdRef.current) setSearching(false);
      });
  }, []);

  function onQueryChange(value: string) {
    // A fresh session token per search, reused across its keystrokes —
    // "new search" here means typing again from an empty box.
    if (!query && value) tokenRef.current = newSessionToken();
    setQuery(value);
    setDropdownOpen(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(value), 250);
  }

  // Step 2 + 3: we already have the placeId from the suggestion — hand off
  // to the demo app, which takes it from there.
  function pick(suggestion: PlaceSuggestion) {
    setDropdownOpen(false);
    setRedirecting(suggestion.placeId);
    window.location.href = demoAppUrl(suggestion.placeId);
  }

  // Close the dropdown on outside click (but leave `results` cached so
  // refocusing the input shows them again without a re-fetch).
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const showDropdown = dropdownOpen && query.trim().length >= 2;

  // Mobile paddings/type are compressed so the whole stack (logo →
  // "Talk to our team") fits a ~660px svh phone viewport with browser
  // chrome visible — the secondary CTA was falling below the fold.
  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden pb-12 pt-24 desk-tall:pt-32 desk-tall:pb-16 desk-short:items-center-safe desk-short:pt-28 desk-short:pb-12">
      {/* Animated gradient background (Figma living-gradient) */}
      <HeroBackground />

      {/* Bottom fade into the #251F21 of the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-56 bg-gradient-to-b from-transparent to-[#251f21]"
      />


      {/* Content */}
      <div className="flex flex-col items-center gap-5 px-6 text-center text-cream desk-tall:gap-6 desk-short:gap-4">
        {/* Logo — the page's single H1. Its accessible name (the image alt)
            carries the brand + primary keyword. */}
        <h1 className="m-0 leading-none">
          <Image
            src="/images/icono.svg"
            alt="heytruffle — voice AI for restaurants"
            width={105}
            height={96}
            priority
            unoptimized
            className="h-12 w-auto sm:h-[60px]"
          />
        </h1>

        {/* Headline — demoted from <h1> to <p> so the logo stays the only H1.
            Sized against the RestoHost scale (h1 caps at 88px there); Gowun
            Batang reads heavier than a sans at the same px, so this sits a
            step below it. */}
        <p className="max-w-[1000px] font-serif text-[38px] font-bold! leading-[110%] tracking-tight text-cream sm:text-[60px] lg:text-[76px]">
          You operate the restaurant.
          <br />
          We operate the phones.
        </p>

        {/* Subtitle — RestoHost sets body copy at 18px max; 20px keeps a bit
            more presence without the 26px that read as oversized. */}
        <p className="font-body w-full max-w-[860px] text-[16px] font-normal leading-[145%] text-cream/85 sm:text-[20px] desk-tall:h-[80px]">
          A fully managed service that answers every call for your restaurants:
          every reservation booked, every order taken, every catering inquiry
          handled.
        </p>

        {/* CTAs — desktop shows the search bar; mobile shows stacked buttons */}
        {/* Extra top margin on top of the parent gap sets the copy apart from
            the CTAs, matching RestoHost's 36px mobile / 48px desktop. Uses the
            desk-* variants rather than sm: so a short desktop (MacBook 14")
            stays compressed instead of both rules matching at ≥640px. */}
        <div className="mt-3 flex w-full max-w-[500px] flex-col items-stretch gap-3 desk-tall:mt-6 desk-tall:gap-5 desk-short:mt-4 desk-short:gap-4">
          {/* Search + primary CTA. Shown at every width: the search box is the
              hero's main gesture, so mobile keeps it rather than falling back
              to a plain button. Results drop down inline, in the page, right
              below the bar — no modal takeover. */}
          <div ref={searchBoxRef} className="relative w-full">
            <form
              className="flex h-[54px] w-full items-center overflow-hidden rounded-[73.26px] border border-white/40 bg-[#f6f3ec]/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:h-[58px]"
              onSubmit={(e) => {
                e.preventDefault();
                if (results.length > 0) pick(results[0]);
              }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onFocus={() => setDropdownOpen(true)}
                placeholder="Search for your restaurant"
                aria-label="Search for your restaurant"
                autoComplete="off"
                className="h-full min-w-0 flex-1 bg-transparent pl-5 pr-2 font-body text-[15px] font-normal leading-[110%] text-[#251f21] outline-none placeholder:text-[#251f21] sm:pl-7 sm:pr-4 sm:text-[16px]"
              />
              <button
                type="submit"
                className="flex h-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-orange px-4 font-body text-[15px] font-bold leading-[110%] text-[#f6f3ec] transition-all duration-300 btn-grad btn-grad-orange hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:gap-3 sm:px-8 sm:text-[16px]"
              >
                Hear it live
                <svg
                  width="8"
                  height="17"
                  viewBox="0 0 19 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                  /* Optical nudge: "Hear it live" has no descenders, so its
                     visual mass sits above the centre of the line box. From sm
                     up the text box (17.6px) is taller than the chevron (17px)
                     and centring it geometrically reads as ~1px low. */
                  className="shrink-0 sm:-translate-y-px"
                >
                  <path d="M3 4l13 16-13 16" />
                </svg>
              </button>
            </form>

            {/* Inline results dropdown — same data/behavior the old modal
                used, just anchored to the search bar instead of taking over
                the screen. */}
            {showDropdown && (
              <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-20 overflow-hidden rounded-[24px] border border-[#251f21]/10 bg-[#f6f3ec] text-left text-[#251f21] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                {results.length > 0 ? (
                  <ul className="max-h-[300px] divide-y divide-[#251f21]/10 overflow-y-auto">
                    {results.map((r) => (
                      <li key={r.placeId}>
                        <button
                          type="button"
                          onClick={() => pick(r)}
                          disabled={redirecting !== null}
                          className="flex w-full items-start gap-3 px-5 py-3 text-left transition-colors hover:text-brand-orange disabled:cursor-wait disabled:opacity-60"
                        >
                          <span aria-hidden className="mt-0.5 shrink-0 text-brand-orange">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                          </span>
                          <span>
                            <span className="block text-[15px] font-semibold leading-tight">
                              {r.mainText}
                            </span>
                            <span className="block text-[13px] leading-tight text-[#251f21]/55">
                              {r.secondaryText}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-5 py-4 text-center text-sm text-[#251f21]/50">
                    {error
                      ? error
                      : searching
                        ? "Searching…"
                        : "No matches yet — keep typing."}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Secondary CTA — auto width at every size so it reads as the
              quieter of the two actions, the way it does on desktop. */}
          <BookDemoButton className="mt-1 flex h-[50px] w-auto items-center justify-center self-center rounded-full bg-[#1c1917]/85 px-8 text-[16px] font-semibold text-cream shadow-lg backdrop-blur-md transition-all duration-300 btn-grad btn-grad-blue sm:mt-4 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(79,84,144,0.55)]">
            Talk to our team
          </BookDemoButton>
        </div>
      </div>
    </section>
  );
}
