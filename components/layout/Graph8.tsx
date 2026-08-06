"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { g8 } from "@graph8/sdk";

// Official graph8 SDK (npm: @graph8/sdk), replacing the old hand-rolled
// <script src="https://events.flow.graph8.com/p.js"> tag. That legacy host
// ran an older build of graph8's tracking runtime whose destination-fanout
// logic (insertTags/processDestinations) could re-inject the same inline
// script and crash with "Identifier 'uuid' has already been declared" —
// the SDK's default host (t.graph8.com) is the current, actively
// maintained tracking endpoint.
const GRAPH8_WRITE_KEY = process.env.NEXT_PUBLIC_GRAPH8_WRITE_KEY;

// Called during render, not inside an effect, so it runs before any child
// mounts (including PageTracker below) — and unconditionally, since
// init() is documented as safe to call on the server (it just skips
// creating the actual jitsu client there, but still marks the singleton
// initialized so nothing downstream throws "g8.init() must be called
// first"). g8 is the same global singleton everywhere, so no <G8Provider>
// wrapper is needed — this just initializes it directly.
if (GRAPH8_WRITE_KEY && !g8.initialized) {
  g8.init({ writeKey: GRAPH8_WRITE_KEY });
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
