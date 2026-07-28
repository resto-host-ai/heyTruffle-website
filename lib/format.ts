/**
 * Locale is PINNED to en-US. Never call toLocaleString()/toLocaleDateString()
 * without an explicit locale — those resolve to the host's locale, which
 * differs between a dev machine, the Render container and a visitor's
 * browser. That's how "5,513" became "5.513" on this site: a formatter with
 * no locale resolved es-AR/de-DE style separators instead.
 *
 * Module-level singletons: same ICU output on every Node 20+/browser, so
 * server-rendered and client-rendered text always match (no hydration
 * mismatch).
 */
const COUNT = new Intl.NumberFormat("en-US");
const MONEY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCount(n: number): string {
  return COUNT.format(n);
}

export function formatMoney(n: number): string {
  return MONEY.format(n);
}

/** For fields typed `string | number` — a number always goes through the
 *  en-US formatter, a string (an intentional abbreviation like "3.2K+") is
 *  rendered as-is. */
export function formatValue(v: string | number): string {
  return typeof v === "number" ? formatCount(v) : v;
}
