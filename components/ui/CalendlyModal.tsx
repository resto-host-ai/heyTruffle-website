"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Fired by openCalendly() (BookDemoButton.tsx); this modal, mounted once in
 *  the root layout, listens for it. */
export const OPEN_CALENDLY_EVENT = "ht:open-calendly";

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

/** Calendly as an inline embed inside our own modal (header, close button,
 *  loading state), instead of Calendly's popup widget, which showed a blank
 *  white box until its iframe rendered and read as a broken page. */
export default function CalendlyModal() {
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const fallback = useRef<number | null>(null);

  const close = useCallback(() => {
    setUrl(null);
    setLoaded(false);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setLoaded(false);
      setUrl((e as CustomEvent<{ url: string }>).detail.url);
    };
    window.addEventListener(OPEN_CALENDLY_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CALENDLY_EVENT, onOpen);
  }, []);

  // Calendly posts "calendly.event_type_viewed" once the booking page has
  // actually rendered — that, not the iframe's load event, ends the loader.
  useEffect(() => {
    if (!url) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const event = (e.data as { event?: string } | null)?.event;
      if (event === "calendly.event_type_viewed" || event === "calendly.date_and_time_selected") setLoaded(true);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("message", onMessage);
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      if (fallback.current) window.clearTimeout(fallback.current);
    };
  }, [url, close]);

  if (!url) return null;

  const src = new URL(url);
  src.searchParams.set("embed_domain", window.location.host);
  src.searchParams.set("embed_type", "Inline");
  src.searchParams.set("hide_gdpr_banner", "1");

  // Portaled straight into <body> with .calendly-overlay: the Header watches
  // for that class to hide itself while a booking is open.
  return createPortal(
    <div
      className="calendly-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-3 backdrop-blur-sm md:p-6"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="calendly-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="flex h-[min(860px,94svh)] w-full max-w-[880px] flex-col overflow-hidden rounded-card bg-white font-body text-[#251f21] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-[#251f21]/10 px-5 py-4 md:px-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
            <CalendarIcon className="h-5 w-5" />
          </span>
          <h2 id="calendly-modal-title" className="flex-1 text-[16px] font-semibold">
            Schedule your free call
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#251f21]/60 transition-colors hover:bg-[#251f21]/5 hover:text-[#251f21]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="relative flex-1">
          <iframe
            src={src.toString()}
            title="Schedule your free call"
            onLoad={() => {
              // Safety net if the postMessage never arrives.
              fallback.current = window.setTimeout(() => setLoaded(true), 2500);
            }}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center" role="status">
              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(239,114,0,0.14),transparent_70%)]">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-[0_6px_20px_rgba(239,114,0,0.18)] ring-1 ring-brand-orange/10">
                  <CalendarIcon className="h-6 w-6" />
                </span>
              </span>
              <p className="mt-1 text-[18px] font-semibold">Loading availability...</p>
              <p className="mt-1 text-[15px] text-[#251f21]/60">Fetching live slots from our calendar</p>
              <span className="mt-4 flex gap-2" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="calendly-dot h-2 w-2 rounded-full bg-brand-orange"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
