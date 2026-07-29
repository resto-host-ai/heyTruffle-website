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

  // A plain <script> tag, not next/script's <Script>: every next/script
  // strategy (including beforeInteractive) inserts the tag via a runtime
  // bootstrap, never as literal markup, so external script-verification
  // tools that fetch the raw HTML without executing JS can never see it.
  // A native tag renders as real server HTML like any other element.
  return (
    <script
      async
      id="graph8-flow"
      src="https://events.flow.graph8.com/p.js"
      data-write-key={GRAPH8_WRITE_KEY}
    />
  );
}
