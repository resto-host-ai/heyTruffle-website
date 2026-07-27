"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  demoAppUrl,
  newSessionToken,
  searchRestaurants,
  type PlaceSuggestion,
} from "@/lib/demoAssistant";

export default function DemoAssistant({
  open,
  initialQuery,
  onClose,
}: {
  open: boolean;
  initialQuery: string;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState<string | null>(null);

  const tokenRef = useRef<string>("");
  const searchIdRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Reset + seed the flow each time the modal opens (a legit "sync to the
  // `open` prop" reset, hence the disabled set-state-in-effect rule).
  useEffect(() => {
    if (!open) return;
    tokenRef.current = newSessionToken();
    /* eslint-disable react-hooks/set-state-in-effect */
    setResults([]);
    setError(null);
    setRedirecting(null);
    setQuery(initialQuery);
    /* eslint-enable react-hooks/set-state-in-effect */
    runSearch(initialQuery);
  }, [open, initialQuery, runSearch]);

  // Body scroll lock + Escape to close.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  function onQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(value), 250);
  }

  // Step 2 + 3: we already have the placeId from the suggestion — hand off
  // to the demo app, which takes it from there.
  function pick(suggestion: PlaceSuggestion) {
    setRedirecting(suggestion.placeId);
    window.location.href = demoAppUrl(suggestion.placeId);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Try heytruffle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#1c1917]/75 p-4 backdrop-blur-md"
    >
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] bg-[#f6f3ec] text-[#251f21] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full border border-[#251f21]/15 text-[#251f21]/60 transition-colors hover:bg-[#251f21]/5 hover:text-[#251f21]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        <div className="p-7 md:p-8">
          <SearchStep
            query={query}
            results={results}
            searching={searching}
            error={error}
            redirecting={redirecting}
            onQueryChange={onQueryChange}
            onPick={pick}
          />
        </div>
      </div>
    </div>
  );
}

function SearchStep({
  query,
  results,
  searching,
  error,
  redirecting,
  onQueryChange,
  onPick,
}: {
  query: string;
  results: PlaceSuggestion[];
  searching: boolean;
  error: string | null;
  redirecting: string | null;
  onQueryChange: (v: string) => void;
  onPick: (s: PlaceSuggestion) => void;
}) {
  return (
    <>
      <h3 className="font-serif text-2xl text-[#251f21]">Find your restaurant</h3>
      <p className="mt-1.5 text-sm text-[#251f21]/60">
        We&rsquo;ll show you a live demo of your AI host.
      </p>

      <div className="relative mt-5">
        <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#251f21]/40">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Type a restaurant..."
          aria-label="Type a restaurant"
          className="w-full rounded-xl border border-[#251f21]/15 bg-white/70 py-3 pl-11 pr-4 text-[15px] text-[#251f21] outline-none transition-colors placeholder:text-[#251f21]/40 focus:border-brand-orange focus:bg-white"
        />
      </div>

      <div className="mt-3 max-h-[300px] overflow-y-auto">
        {results.length > 0 ? (
          <ul className="divide-y divide-[#251f21]/10">
            {results.map((r) => (
              <li key={r.placeId}>
                <button
                  type="button"
                  onClick={() => onPick(r)}
                  disabled={redirecting !== null}
                  className="flex w-full items-start gap-3 py-3 text-left transition-colors hover:text-brand-orange disabled:cursor-wait disabled:opacity-60"
                >
                  <span aria-hidden className="mt-0.5 text-brand-orange">
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
          <p className="py-4 text-center text-sm text-[#251f21]/50">
            {error
              ? error
              : searching
                ? "Searching…"
                : query.trim().length < 2
                  ? "Start typing your restaurant name."
                  : "No matches yet — keep typing."}
          </p>
        )}
      </div>
    </>
  );
}
