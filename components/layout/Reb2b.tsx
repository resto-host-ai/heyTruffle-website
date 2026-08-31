"use client";

import { useEffect } from "react";

const REB2B_KEY = process.env.NEXT_PUBLIC_REB2B_KEY;

/**
 * Reb2b — B2B visitor identification.
 *
 * Previously used `next/script`'s `strategy="lazyOnload"`, which schedules
 * the load via a bare `requestIdleCallback(cb)` — no timeout. On this site
 * that callback can be starved indefinitely: Next's own Link prefetching
 * keeps firing background `_rsc=` fetches as the page sits there, and the
 * browser never judges the main thread idle enough to run it. Confirmed via
 * a real Chrome Network tab: Clarity and Chatbase (both effectively
 * `afterInteractive`) loaded, Reb2b never did, on every check. Net effect —
 * zero visitor identification for as long as that strategy shipped.
 *
 * Fix: the same bounded-idle pattern Clarity.tsx already uses —
 * `requestIdleCallback` with an explicit timeout, `setTimeout` as the
 * fallback for browsers without it (Safari < 17) — so the script is
 * guaranteed to fire within a few seconds no matter how busy the page stays,
 * while still keeping it off the critical rendering path.
 *
 * That alone wasn't the whole story: the injected tag must NOT carry
 * `id="reb2b"`. Browsers expose any element with an id as `window.<id>`
 * (legacy named-access-on-Window) the moment it's inserted — so with that id
 * present, `window.reb2b` already resolves to the script element itself by
 * the time its own code runs, and the snippet's own guard
 * (`if(window.reb2b)return;`) trips on that and bails before ever setting
 * `window.reb2b = {loaded:true}` or injecting the real SDK. Confirmed live:
 * `window.reb2b` and `document.getElementById('reb2b')` returned the exact
 * same node. The id is ours (added for bookkeeping), not part of Reb2b's own
 * snippet — dropping it removes the collision.
 */
export default function Reb2b() {
  useEffect(() => {
    if (!REB2B_KEY) return;

    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const el = document.createElement("script");
      el.innerHTML = `!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement("script");s.async=true;s.src="https://ddwl4m2hdecbv.cloudfront.net/b/"+key+"/"+key+".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s,document.getElementsByTagName("script")[0]);}(${JSON.stringify(REB2B_KEY)});`;
      document.body.appendChild(el);
    };

    if (typeof requestIdleCallback === "function") {
      const handle = requestIdleCallback(start, { timeout: 4000 });
      return () => {
        cancelled = true;
        cancelIdleCallback(handle);
      };
    }

    const timer = setTimeout(start, 2500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return null;
}
