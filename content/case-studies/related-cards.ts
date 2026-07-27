import type { RelatedCard } from "./types";

/**
 * Shared "related case study" cards, reused byte-for-byte across the pages
 * that reference them (verified against the original 9 page.tsx files before
 * extraction). Rreal Tacos' own page uses two different variants of the
 * Mojitos and Baires Grill cards — those are NOT here, they're local to
 * content/case-studies/rreal-tacos.ts, on purpose: they render different
 * values today and merging them would change output.
 */

export const RREAL_TACOS: RelatedCard = {
  name: "Rreal tacos",
  location: "Atlanta, 12 locations",
  value: "5.513",
  metric: "Calls recovered in one month.",
  desc: "Reservations, orders and catering that would have gone unanswered.",
  image: "/images/case-rreal.webp",
  bg: "#f4efe3",
  bgIdle: "#cfcabf",
  accent: "#ef7200",
};

export const MOJITOS: RelatedCard = {
  name: "Mojitos",
  location: "Miami",
  value: "4.000",
  metric: "Calls recovered in one month.",
  desc: "Reservations, orders and catering that would have gone unanswered.",
  image: "/images/mojitos.webp",
  bg: "#eae6dc",
  bgIdle: "#c8c5bf",
  accent: "#943e72",
};

export const BAIRES_GRILL: RelatedCard = {
  name: "Baires Grill",
  location: "Miami, 9 locations",
  value: "7.520",
  metric: "Calls handled in one month.",
  desc: "Every call answered while the team stayed on the floor.",
  image: "/images/case-baires.webp",
  bg: "#eae6dc",
  bgIdle: "#c8c5bf",
  accent: "#a05fc4",
};
