"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { g8 } from "@graph8/sdk";

// Official graph8 SDK (npm: @graph8/sdk), replacing the old hand-rolled
// <script src="https://events.flow.graph8.com/p.js"> tag.
const GRAPH8_WRITE_KEY = process.env.NEXT_PUBLIC_GRAPH8_WRITE_KEY;

// This account's real ingest host — MUST be passed explicitly. The SDK
// defaults to https://t.graph8.com (the value in graph8's public docs),
// but that host 404s on every path — the root, /p.js, /api/s/page and
// /api/s/track all return nginx 404 with no CORS headers at all. Leaving
// the default in place silently kills tracking: every pageview POST gets
// blocked at the preflight and jitsu swallows the failure.
// events.flow.graph8.com, by contrast, serves /p.js (200) and answers the
// /api/s/* preflights with 200 + the exact headers jitsu sends
// (x-write-key, x-ip-policy, …), echoing back whatever Origin it's given.
// Verified by curl against both hosts, 2026-08-06.
// Env override so a future graph8 ingest migration needs no code change.
const GRAPH8_HOST =
  process.env.NEXT_PUBLIC_GRAPH8_HOST ?? "https://events.flow.graph8.com";

// Called during render, not inside an effect, so it runs before any child
// mounts (including PageTracker below) — and unconditionally, since
// init() is documented as safe to call on the server (it just skips
// creating the actual jitsu client there, but still marks the singleton
// initialized so nothing downstream throws "g8.init() must be called
// first"). g8 is the same global singleton everywhere, so no <G8Provider>
// wrapper is needed — this just initializes it directly.
if (GRAPH8_WRITE_KEY && !g8.initialized) {
  g8.init({ writeKey: GRAPH8_WRITE_KEY, host: GRAPH8_HOST });
}

// The SDK is deliberately lazy — init() only builds the client, it doesn't
// send anything on its own. The old script auto-fired a pageview on load;
// this replaces that by calling page() once per route change.
//
// Calls g8.page() directly instead of going through the useG8() hook:
// useG8() eagerly reads client.forms in the object it returns (a getter
// that always asserts init), so merely calling the hook — even just to
// destructure `page` — throws during SSR/static generation, where g8
// hasn't been (and doesn't need to be) initialized for real tracking.
// Calling g8.page() only from inside this effect means it never runs
// during server rendering at all (effects don't run on the server),
// sidestepping the getter entirely.
function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    g8.page();
  }, [pathname]);

  return null;
}

export default function Graph8Provider({ children }: { children: ReactNode }) {
  // Without a key the pixel can't identify our account — skip tracking
  // entirely rather than initialize the SDK with nothing to send.
  if (!GRAPH8_WRITE_KEY) return <>{children}</>;

  return (
    <>
      <PageTracker />
      {children}
    </>
  );
}
