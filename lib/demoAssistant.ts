/**
 * Client for the live demo-assistant backend that powers the hero
 * "Search for your restaurant" flow: autocomplete a restaurant, then have the
 * AI host place a live demo call to the visitor's phone.
 *
 * Contract mirrors the reference demo (landing-demo-assistant). Override the
 * backend with NEXT_PUBLIC_DEMO_ASSISTANT_URL when a heytruffle-hosted one
 * exists.
 */
const BASE = (
  process.env.NEXT_PUBLIC_DEMO_ASSISTANT_URL ??
  "https://landing-demo-assistant.onrender.com"
).replace(/\/+$/, "");

export type PlaceSuggestion = {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  types: string[];
};

export type PlacePhoto = { url: string; widthPx?: number; heightPx?: number };

export type PlaceDetails = {
  placeId: string;
  name: string;
  address: string;
  primaryType?: string;
  rating?: number;
  userRatingCount?: number;
  priceLevel?: string;
  description?: string;
  phone?: string;
  websiteUri?: string;
  photos?: PlacePhoto[];
};

/** A new Google Places session token per search → selection cycle. */
export function newSessionToken(): string {
  return crypto.randomUUID();
}

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
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
  return res.json() as Promise<T>;
}

/** Autocomplete restaurants for the typed query. */
export function searchRestaurants(
  input: string,
  sessionToken: string,
  coords?: { lat: number; lng: number },
): Promise<PlaceSuggestion[]> {
  const params = new URLSearchParams({ input, sessionToken });
  if (coords) {
    params.set("lat", String(coords.lat));
    params.set("lng", String(coords.lng));
  }
  return getJSON<PlaceSuggestion[]>(`/places/autocomplete?${params.toString()}`);
}

/** Full details for a chosen restaurant (photos normalised to absolute URLs). */
export async function getRestaurant(
  placeId: string,
  sessionToken: string,
): Promise<PlaceDetails> {
  const params = new URLSearchParams({ sessionToken });
  const details = await getJSON<PlaceDetails>(
    `/places/${encodeURIComponent(placeId)}?${params.toString()}`,
  );
  return {
    ...details,
    photos: (details.photos ?? []).map((p) => ({
      ...p,
      url: p.url.startsWith("/") ? `${BASE}${p.url}` : p.url,
    })),
  };
}

/** Sample menu the AI host references during the demo call. */
export const DEMO_MENU = [
  {
    sectionName: "Entrees",
    items: [
      { name: "Bruschetta" },
      { name: "Calamari" },
      { name: "Stuffed mushrooms" },
      { name: "Caprese salad" },
      { name: "Garlic bread" },
    ],
  },
  {
    sectionName: "Main dishes",
    items: [
      { name: "Grilled salmon" },
      { name: "Ribeye steak" },
      { name: "Margherita pizza" },
      { name: "Chicken alfredo" },
      { name: "Vegetable risotto" },
    ],
  },
  {
    sectionName: "Beverage",
    items: [
      { name: "Sparkling water" },
      { name: "Fresh lemonade" },
      { name: "Iced tea" },
      { name: "Espresso" },
      { name: "Soft drink" },
    ],
  },
  {
    sectionName: "Desserts",
    items: [
      { name: "Tiramisu" },
      { name: "Cheesecake" },
      { name: "Chocolate lava cake" },
      { name: "Gelato" },
      { name: "Fruit tart" },
    ],
  },
  {
    sectionName: "Wine",
    items: [
      { name: "House red" },
      { name: "House white" },
      { name: "Cabernet sauvignon" },
      { name: "Chardonnay" },
      { name: "Rosé" },
    ],
  },
] as const;

/** Trigger the live demo call to the visitor's phone. */
export async function requestDemoCall(
  toNumber: string,
  placeId: string,
): Promise<void> {
  const res = await fetch(`${BASE}/superdash/call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toNumber, placeId, menu: DEMO_MENU }),
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
}

/** localStorage key the reference demo uses to remember the phone number. */
export const PHONE_STORAGE_KEY = "restohost.phone";
