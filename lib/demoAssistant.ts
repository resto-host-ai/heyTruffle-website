/**
 * Client for the live demo-assistant flow that powers the hero "Search for
 * your restaurant" box: autocomplete a restaurant (Step 1), then hand off to
 * the standalone demo app with the chosen Place ID (Steps 2 & 3).
 *
 * We only ever call the autocomplete endpoint ourselves — everything after
 * the user picks a result (confirmation, the call, the wrap-up) happens on
 * the demo app, which reads `?placeId=` on load.
 */
const BASE = (
  process.env.NEXT_PUBLIC_DEMO_ASSISTANT_URL ??
  "https://landing-demo-assistant.onrender.com"
).replace(/\/+$/, "");

// Issued per client by the demo-assistant backend; required on every
// autocomplete request or it responds 401.
const API_KEY =
  process.env.NEXT_PUBLIC_DEMO_ASSISTANT_API_KEY ??
  "5cdccda1d4a1c08770f7469f6b2bfc71fec670a240fc661de3f3232ec1edb692";

const DEMO_APP_URL = (
  process.env.NEXT_PUBLIC_DEMO_APP_URL ??
  "https://landing-demo-assistant-frontend.onrender.com"
).replace(/\/+$/, "");

export type PlaceSuggestion = {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  types: string[];
};

/** A new Google Places session token per search → selection cycle. */
export function newSessionToken(): string {
  return crypto.randomUUID();
}

/** Autocomplete restaurants for the typed query. */
export async function searchRestaurants(
  input: string,
  sessionToken: string,
  coords?: { lat: number; lng: number },
): Promise<PlaceSuggestion[]> {
  const params = new URLSearchParams({ input, sessionToken });
  if (coords) {
    params.set("lat", String(coords.lat));
    params.set("lng", String(coords.lng));
  }

  const res = await fetch(`${BASE}/places/autocomplete?${params.toString()}`, {
    headers: { "x-api-key": API_KEY },
  });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) {
        msg = Array.isArray(body.message) ? body.message.join(", ") : body.message;
      }
    } catch {
      /* non-JSON error body */
    }
    throw new Error(msg);
  }
  return res.json() as Promise<PlaceSuggestion[]>;
}

/** Step 3: send the user to the demo app, which opens straight on this
 *  restaurant's confirmation screen. */
export function demoAppUrl(placeId: string): string {
  return `${DEMO_APP_URL}/?placeId=${encodeURIComponent(placeId)}`;
}
