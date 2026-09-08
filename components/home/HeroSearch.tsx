"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  demoAppUrl,
  newSessionToken,
  searchRestaurants,
  type PlaceSuggestion,
} from "@/lib/demoAssistant";

/**
 * The hero's restaurant search box — autocomplete against the demo backend,
 * inline results dropdown, and the hand-off to the demo app.
 *
 * Split out of Hero so that Hero itself can be a Server Component. The hero
 * headline is the home page's LCP element, and while it lived inside the
 * "use client" boundary React had to hydrate the entire hero subtree —
 * background, logo, headline, subtitle and all — before that work was done,
 * on a main thread Lighthouse throttles 4x. None of that markup is
 * interactive; only this box is. As an island it hydrates on its own while
 * the text around it stays static server-rendered HTML that never re-renders.
 */
export default function HeroSearch({
  ctaLabel = "Build your AI",
}: {
  ctaLabel?: string;
} = {}) {
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
  const inputRef = useRef<HTMLInputElement>(null);
  const hintTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Guards against spamming Enter: without this, N rapid submits fire N
  // native `submit` events, each triggering its own pick()/navigation.
  // One submit action at a time, full stop.
  const submitLockRef = useRef(false);
  // Shown when "Hear it live" is submitted with nothing typed — the button
  // otherwise did nothing visible, which read as broken rather than "type
  // something first". Cleared as soon as the person starts typing.
  const [emptyHint, setEmptyHint] = useState(false);
  const [shake, setShake] = useState(false);
  // The dropdown/hint render into a portal (see below) instead of as
  // position:absolute children here, so their on-screen position has to be
  // tracked in state and recomputed on resize/scroll.
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

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
    setEmptyHint(false);
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
  // refocusing the input shows them again without a re-fetch). The overlay
  // is portaled to <body> (see below), so it's not a DOM descendant of
  // searchBoxRef any more — overlayRef has to be checked too, or every
  // click on a result would register as "outside" and close the dropdown
  // on mousedown, before its own onClick ever got to fire on mouseup.
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(target) &&
        !overlayRef.current?.contains(target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  // Clear the pending auto-dismiss so a fast unmount can't set state after.
  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
  }, []);

  const showDropdown = dropdownOpen && query.trim().length >= 2;
  const showOverlay = showDropdown || emptyHint;

  // The hero section this box lives in has `overflow-hidden` (it clips the
  // animated background), which also clips any `position: absolute`
  // descendant the moment it needs to extend past the section's own box —
  // exactly what a dropdown does on a short/manually-resized viewport where
  // the section's flow-content height leaves little room below the search
  // bar. Rendering the overlay into a body-level portal, positioned from the
  // search box's own measured rect, escapes that clip entirely — this must
  // never silently break again regardless of viewport size.
  //
  // The rect is only recomputed on open and on resize, NOT continuously on
  // scroll — re-measuring and re-rendering on every scroll tick is what made
  // this visibly jank while flicking through the page. Since this search box
  // sits in the hero at the very top of the page, a scroll happening while
  // the overlay is open just closes it, same as any other popover.
  useEffect(() => {
    if (!showOverlay) return;

    if (searchBoxRef.current) {
      setAnchorRect(searchBoxRef.current.getBoundingClientRect());
    }

    const handleResize = () => {
      if (searchBoxRef.current) {
        setAnchorRect(searchBoxRef.current.getBoundingClientRect());
      }
    };
    const handleScroll = () => {
      setDropdownOpen(false);
      setEmptyHint(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showOverlay]);

  // Flip above the search box when there isn't room below (short viewport,
  // or the box sitting low on the page) — picks whichever side actually has
  // more space rather than always preferring one direction.
  const DROPDOWN_HEIGHT_ESTIMATE = 300;
  const OVERLAY_GAP = 12;
  const placeAbove =
    anchorRect !== null &&
    typeof window !== "undefined" &&
    window.innerHeight - anchorRect.bottom < DROPDOWN_HEIGHT_ESTIMATE + OVERLAY_GAP &&
    anchorRect.top > window.innerHeight - anchorRect.bottom;

  const overlayPositionStyle = (gap: number): React.CSSProperties =>
    anchorRect
      ? {
          position: "fixed",
          left: anchorRect.left,
          width: anchorRect.width,
          ...(placeAbove
            ? { bottom: window.innerHeight - anchorRect.top + gap }
            : { top: anchorRect.bottom + gap }),
        }
      : {};

  return (
    <div ref={searchBoxRef} className="relative w-full sm:flex-1">
      <form
        className={`flex h-[54px] w-full items-center overflow-hidden rounded-[73.26px] border bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-lg transition-colors sm:h-[58px] ${
          emptyHint ? "border-[#ff8a80]" : "border-white/40"
        } ${shake ? "ht-shake" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          // Swallow rapid repeat submits (spamming Enter) — see the
          // submitLockRef comment above for why this matters beyond
          // just avoiding duplicate navigations.
          if (submitLockRef.current) return;

          if (query.trim().length === 0) {
            // Nothing typed at all — the button otherwise did nothing
            // visible, which read as broken. Nudge instead: focus the
            // input, shake the bar, and surface a hint that clears
            // itself once they start typing (see onQueryChange) or
            // after a few seconds either way.
            inputRef.current?.focus();
            setShake(true);
            setTimeout(() => setShake(false), 400);
            setEmptyHint(true);
            if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
            hintTimeoutRef.current = setTimeout(() => setEmptyHint(false), 3000);
            return;
          }

          submitLockRef.current = true;
          setTimeout(() => {
            submitLockRef.current = false;
          }, 800);

          if (results.length > 0) {
            pick(results[0]);
          } else {
            // Nothing to pick yet — surface the dropdown's own
            // "start typing" / "no matches" copy instead of silently
            // doing nothing.
            setDropdownOpen(true);
          }
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setDropdownOpen(true)}
          placeholder="Search for your restaurant"
          aria-label="Search for your restaurant"
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-white pl-5 pr-2 font-body text-[15px] font-normal leading-[110%] text-[#251f21] outline-none placeholder:text-[#251f21] sm:pl-7 sm:pr-4 sm:text-[16px]"
        />
        <button
          type="submit"
          className="flex h-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-orange px-4 font-body text-[15px] font-bold leading-[110%] text-[#f6f3ec] transition-all duration-300 btn-grad btn-grad-orange hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_34px_rgba(239,114,0,0.55)] sm:gap-3 sm:px-8 sm:text-[16px]"
        >
          {ctaLabel}
        </button>
      </form>

      {/* Both overlays below are portaled to <body> and positioned from
          anchorRect (viewport coordinates, position: fixed) instead of
          being position:absolute children here — see the effect above for
          why. */}
      {anchorRect &&
        createPortal(
          <div ref={overlayRef}>
            {/* Nudge for submitting with an empty box — mutually exclusive
                with the results dropdown below (that one only shows once
                there's at least a 2-char query). */}
            {emptyHint && (
              <div
                role="alert"
                style={overlayPositionStyle(10)}
                className="z-20 flex justify-center"
              >
                <span className="rounded-full bg-[#2a1518]/95 px-4 py-2 text-[13px] font-medium text-[#ffcec7] shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                  Type your restaurant&rsquo;s name first
                </span>
              </div>
            )}

            {/* Inline results dropdown — same data/behavior the old modal
                used, just anchored to the search bar instead of taking over
                the screen. */}
            {showDropdown && (
              <div
                style={overlayPositionStyle(12)}
                className="z-20 overflow-hidden rounded-[24px] border border-[#251f21]/10 bg-[#f6f3ec] text-left text-[#251f21] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
              >
                {results.length > 0 ? (
                  <ul className="max-h-[300px] divide-y divide-[#251f21]/10 overflow-y-auto">
                    {results.slice(0, 3).map((r) => (
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
          </div>,
          document.body,
        )}
    </div>
  );
}
