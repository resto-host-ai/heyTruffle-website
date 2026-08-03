"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

/**
 * Rebrand pop-up — shown ONCE to visitors arriving from restohost.ai, on ANY
 * page (the component lives in the root layout, so /, /integrations/clover/,
 * /blog/... all qualify — not just the home page).
 *
 * "Came from restohost" is detected from three independent signals, because
 * the redirect can reach us in different shapes:
 *   1. `?from=restohost`         — explicit marker appended by the redirect
 *   2. `utm_source=restohost`    — same idea via campaign params
 *   3. `document.referrer`       — any *.restohost.ai page linking here
 * Path-preserving 301s often drop the query string, so 3 is the safety net.
 * A server 301 hides restohost.ai from the referrer as well, so the redirect
 * on restohost.ai SHOULD still forward `?from=restohost` on every path — the
 * query marker is the only signal that survives a direct-typed URL.
 *
 * Once shown it is suppressed via localStorage. The marker is then stripped
 * from the URL so it is not carried into shares or bookmarks.
 *
 * NOTE (from the handoff): do not surface this before the rebrand launch —
 * the "New funding / New capabilities" chips are launch-day content. It stays
 * dormant until LAUNCH_DATE even if the marker is present. Move that date
 * earlier (or delete the guard) to go live.
 *
 * To re-test: clear the `ht_rebrand_seen` localStorage key and load any page
 * with `?from=restohost`.
 */
const STORAGE_KEY = "ht_rebrand_seen";
const LAUNCH_DATE = new Date("2026-07-28T00:00:00");

const CHIPS = ["New brand", "New funding", "New capabilities"];

/** restohost.ai and any subdomain of it (www., staging., …) */
function isRestohostReferrer(referrer: string): boolean {
  if (!referrer) return false;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return host === "restohost.ai" || host.endsWith(".restohost.ai");
  } catch {
    return false;
  }
}

/** Drop the `from` marker so it does not stick around in the address bar. */
function stripMarker() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("from")) return;
  url.searchParams.delete("from");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
}

export default function RebrandModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromRestohost =
      params.get("from")?.toLowerCase() === "restohost" ||
      params.get("utm_source")?.toLowerCase() === "restohost" ||
      isRestohostReferrer(document.referrer);
    if (!fromRestohost) return;
    if (new Date() < LAUNCH_DATE) return;

    stripMarker();

    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage blocked — treat as not seen */
    }
    // Must run on the client (reads window/localStorage), so the one-time
    // open has to happen from an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!seen) setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage blocked — nothing to persist */
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ht-rebrand-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-5 backdrop-blur-[2px]"
      style={{ background: "rgba(37,31,33,0.45)" }}
    >
      <div className="ht-pop relative w-[420px] max-w-full rounded-[24px] bg-white px-[30px] pb-[28px] pt-[26px] shadow-[0_8px_30px_rgba(37,31,33,0.16)]">
        {/* Header */}
        <div className="mb-[22px] flex items-center justify-between">
          <Image
            src="/images/heytruffle-logo.svg"
            alt="heytruffle"
            width={177}
            height={40}
            unoptimized
            className="h-5 w-auto brightness-0"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[17px] leading-none text-[#B7AFA8] transition-colors hover:bg-[#F6F3EC] hover:text-[#251F21]"
          >
            &#10005;
          </button>
        </div>

        <p className="mb-[10px] text-xs font-semibold uppercase tracking-[0.06em] text-brand-orange">
          Same care. New chapter.
        </p>

        <h2
          id="ht-rebrand-title"
          className="mb-4 font-serif text-[28px] font-normal leading-[1.18] tracking-normal text-[#251F21]"
        >
          <span className="text-[#5E5754]">RestoHost</span> is now heytruffle
        </h2>

        <div className="mb-[18px] flex flex-wrap gap-[7px]">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-[#FDF2E5] px-[13px] py-[5px] text-xs font-semibold text-[#C95F00]"
            >
              {chip}
            </span>
          ))}
        </div>

        <p className="mb-[22px] text-[15px] leading-[1.55] text-[#6F6668]">
          Same team and service you know, with a new name and a lot that&rsquo;s
          new.
        </p>

        <button
          type="button"
          onClick={close}
          className="block w-full rounded-[10px] bg-brand-orange py-[13px] text-center text-[15px] font-semibold text-white transition-colors hover:bg-[#C95F00]"
        >
          Continue to site
        </button>
      </div>
    </div>
  );
}
