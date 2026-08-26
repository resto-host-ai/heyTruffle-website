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

  /* A plain async <script> rather than next/script.
     
     This was <Script strategy="beforeInteractive">, chosen because that is the
     only next/script strategy rendered into the server HTML itself — the
     others inject via client JS after hydration, and script-verification tools
     that fetch the raw HTML would never see the tag. A plain <script> keeps
     that property (React renders it into the HTML, and hoists async scripts
     into <head>) while dropping what beforeInteractive also did: it made Next
     emit a <link rel=preload as=script> and fetch this pixel BEFORE any
     first-party code, so on a throttled phone connection a tracking script was
     taking bandwidth from the stylesheet and fonts the first paint waits on.

     async + fetchPriority="low" keeps it off the critical path. It also now
     sits after the redeclaration guard in <body> rather than ahead of it in
     <head>, which is the order that guard was written to assume. */
  return (
    <script
      id="graph8-flow"
      src="https://events.flow.graph8.com/p.js"
      data-write-key={GRAPH8_WRITE_KEY}
      async
      fetchPriority="low"
    />
  );
}
