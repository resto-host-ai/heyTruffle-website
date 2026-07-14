"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";
import { openCalendly } from "@/components/BookDemoButton";
import {
  getRestaurant,
  newSessionToken,
  PHONE_STORAGE_KEY,
  requestDemoCall,
  searchRestaurants,
  type PlaceDetails,
  type PlaceSuggestion,
} from "@/lib/demoAssistant";

type Step = "search" | "confirm" | "phone" | "ringing";

export default function DemoAssistant({
  open,
  initialQuery,
  onClose,
}: {
  open: boolean;
  initialQuery: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<PlaceSuggestion | null>(null);
  const [details, setDetails] = useState<PlaceDetails | null>(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
    searchRestaurants(q, tokenRef.current)
      .then((r) => {
        if (id === searchIdRef.current) setResults(r);
      })
      .catch(() => {
        if (id === searchIdRef.current) setResults([]);
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
    setStep("search");
    setSelected(null);
    setDetails(null);
    setResults([]);
    setError(null);
    setSubmitting(false);
    setQuery(initialQuery);
    try {
      setPhone(localStorage.getItem(PHONE_STORAGE_KEY) ?? "");
    } catch {
      /* storage blocked */
    }
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

  function pick(suggestion: PlaceSuggestion) {
    setSelected(suggestion);
    setDetails(null);
    setStep("confirm");
    getRestaurant(suggestion.placeId, tokenRef.current)
      .then(setDetails)
      .catch(() => setDetails(null));
    // A details request ends the Places session — start a fresh token.
    tokenRef.current = newSessionToken();
  }

  function backToSearch() {
    setStep("search");
    setSelected(null);
    setDetails(null);
    setError(null);
    tokenRef.current = newSessionToken();
    runSearch(query);
  }

  async function submitPhone(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 8) {
      setError("Please enter your full phone number.");
      return;
    }
    if (!selected) return;
    setError(null);
    setSubmitting(true);
    try {
      await requestDemoCall(phone.trim(), selected.placeId);
      try {
        localStorage.setItem(PHONE_STORAGE_KEY, phone.trim());
      } catch {
        /* storage blocked */
      }
      setStep("ringing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const restaurantName = details?.name ?? selected?.mainText ?? "your restaurant";
  const photo = details?.photos?.[0]?.url;

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
          {step === "search" && (
            <SearchStep
              query={query}
              results={results}
              searching={searching}
              onQueryChange={onQueryChange}
              onPick={pick}
            />
          )}

          {step === "confirm" && selected && (
            <ConfirmStep
              name={restaurantName}
              address={details?.address ?? selected.secondaryText}
              rating={details?.rating}
              ratingCount={details?.userRatingCount}
              photo={photo}
              onYes={() => {
                setError(null);
                setStep("phone");
              }}
              onBack={backToSearch}
            />
          )}

          {step === "phone" && (
            <PhoneStep
              name={restaurantName}
              phone={phone}
              error={error}
              submitting={submitting}
              onPhoneChange={setPhone}
              onSubmit={submitPhone}
              onBack={() => {
                setError(null);
                setStep("confirm");
              }}
            />
          )}

          {step === "ringing" && (
            <RingingStep
              phone={phone}
              onRestart={backToSearch}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Steps ---------------- */

function SearchStep({
  query,
  results,
  searching,
  onQueryChange,
  onPick,
}: {
  query: string;
  results: PlaceSuggestion[];
  searching: boolean;
  onQueryChange: (v: string) => void;
  onPick: (s: PlaceSuggestion) => void;
}) {
  return (
    <>
      <h3 className="font-serif text-2xl text-[#251f21]">Find your restaurant</h3>
      <p className="mt-1.5 text-sm text-[#251f21]/60">
        We&rsquo;ll ring your phone with a live demo of your AI host.
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
                  className="flex w-full items-start gap-3 py-3 text-left transition-colors hover:text-brand-orange"
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
            {searching
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

function ConfirmStep({
  name,
  address,
  rating,
  ratingCount,
  photo,
  onYes,
  onBack,
}: {
  name: string;
  address: string;
  rating?: number;
  ratingCount?: number;
  photo?: string;
  onYes: () => void;
  onBack: () => void;
}) {
  return (
    <>
      <h3 className="font-serif text-2xl text-[#251f21]">Is this your restaurant?</h3>

      <div className="mt-5 overflow-hidden rounded-2xl border border-[#251f21]/10 bg-white/60">
        {photo && (
          <img
            src={photo}
            alt={name}
            className="h-40 w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="p-4">
          <p className="text-lg font-semibold leading-tight">{name}</p>
          <p className="mt-1 text-sm text-[#251f21]/60">{address}</p>
          {typeof rating === "number" && (
            <p className="mt-2 flex items-center gap-1 text-sm text-[#251f21]/70">
              <span className="text-brand-orange">★</span>
              {rating.toFixed(1)}
              {ratingCount ? (
                <span className="text-[#251f21]/45">
                  ({ratingCount.toLocaleString()})
                </span>
              ) : null}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onYes}
        className="mt-5 w-full rounded-full bg-brand-orange py-3.5 text-sm font-bold text-cream transition-colors hover:bg-[#d96700]"
      >
        Yes, this is my restaurant
      </button>
      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full text-center text-sm font-medium text-[#251f21]/60 transition-colors hover:text-[#251f21]"
      >
        Not your restaurant? Try another
      </button>
    </>
  );
}

function PhoneStep({
  name,
  phone,
  error,
  submitting,
  onPhoneChange,
  onSubmit,
  onBack,
}: {
  name: string;
  phone: string;
  error: string | null;
  submitting: boolean;
  onPhoneChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <h3 className="font-serif text-2xl text-[#251f21]">
        What number should we call you?
      </h3>
      <p className="mt-1.5 text-sm text-[#251f21]/60">
        Your heytruffle host will call you and answer just like it would for{" "}
        <span className="font-semibold text-[#251f21]">{name}</span>.
      </p>

      <label className="mt-5 block">
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#251f21]/55">
          Phone number
        </span>
        <input
          type="tel"
          autoFocus
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="+1 (555) 000-0000"
          aria-label="Phone number"
          className="w-full rounded-xl border border-[#251f21]/15 bg-white/70 px-3.5 py-3 text-[15px] text-[#251f21] outline-none transition-colors placeholder:text-[#251f21]/40 focus:border-brand-orange focus:bg-white"
        />
      </label>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-full bg-brand-orange py-3.5 text-sm font-bold text-cream transition-colors hover:bg-[#d96700] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Calling…" : "Call me now"}
      </button>
      <button
        type="button"
        onClick={onBack}
        className="mt-3 w-full text-center text-sm font-medium text-[#251f21]/60 transition-colors hover:text-[#251f21]"
      >
        Back
      </button>
    </form>
  );
}

function RingingStep({
  phone,
  onRestart,
  onClose,
}: {
  phone: string;
  onRestart: () => void;
  onClose: () => void;
}) {
  return (
    <div className="py-2 text-center">
      <div
        aria-hidden
        className="mx-auto mb-5 grid h-16 w-16 animate-pulse place-items-center rounded-full bg-gradient-to-br from-[#b53fc4] to-[#ef7200] shadow-[0_16px_40px_-12px_rgba(181,63,196,0.6)]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>
      <h3 className="font-serif text-2xl text-[#251f21]">Ringing your phone…</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#251f21]/60">
        Pick up{phone ? ` ${phone}` : ""} — your heytruffle host is calling to
        show you exactly how it answers.
      </p>

      <button
        type="button"
        onClick={() => {
          onClose();
          void openCalendly();
        }}
        className="mt-6 w-full rounded-full bg-brand-orange py-3.5 text-sm font-bold text-cream transition-colors hover:bg-[#d96700]"
      >
        Get this for your restaurant
      </button>
      <button
        type="button"
        onClick={onRestart}
        className="mt-3 w-full text-center text-sm font-medium text-[#251f21]/60 transition-colors hover:text-[#251f21]"
      >
        Try another restaurant
      </button>
    </div>
  );
}
