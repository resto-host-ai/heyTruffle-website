import Script from "next/script";

// graph8 flow tracking pixel. Loaded once from the root layout so it runs on
// every route. The write-key identifies our account to events.flow.graph8.com
// and is a public, client-side value by design — but it's still supplied via
// env (no hardcoded fallback) so it stays out of source/git and can be rotated
// without a code change.
const GRAPH8_WRITE_KEY = process.env.NEXT_PUBLIC_GRAPH8_WRITE_KEY;

export default function Graph8() {
  // Without a key the pixel can't identify our account — skip it entirely
  // rather than load a script that would only error.
  if (!GRAPH8_WRITE_KEY) return null;

  return (
    <Script
      id="graph8-flow"
      src="https://events.flow.graph8.com/p.js"
      data-write-key={GRAPH8_WRITE_KEY}
      // beforeInteractive is the only strategy Next.js renders into the
      // server HTML itself (the others inject via client-side JS after
      // hydration) — third-party script-verification tools that fetch the
      // raw HTML without executing JS otherwise never see this tag at all.
      strategy="beforeInteractive"
    />
  );
}
