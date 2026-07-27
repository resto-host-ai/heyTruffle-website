import type { CaseStudy } from "./types";
import { RREAL_TACOS, BAIRES_GRILL } from "./related-cards";

export const chelseaCorner: CaseStudy = {
  slug: "chelsea-corner",
  name: "Chelsea Corner",
  seo: {
    title: "Chelsea Corner — Case Study — heytruffle",
    description:
      "How Chelsea Corner keeps its weekend rush covered with HeyTruffle — every call answered, the waitlist held and the table booked, so the team stays with the room.",
    canonical: "/case-study/chelsea-corner/",
  },
  logo: { src: "/images/chelsealogo.webp", alt: "Chelsea Corner" },

  heroTags: ["American", "Reservations", "Dallas", "1 location"],
  heroWidth: "narrow",
  headline: { lead: "Where the weekend rush ", accent: "meets its match." },
  paragraphs: [
    "Chelsea Corner packs its Friday-to-Sunday nights, when the floor is busiest and the phone never stops.",
    "heytruffle answers every call, holds the waitlist, and books the table, so the team stays with the room, not the receiver.",
  ],
  heroStats: [
    { value: "2.2k", label: "Calls handled" },
    { value: "407", label: "SMS sent" },
    { value: "70%", label: "Resolved by AI" },
  ],

  hostSampleLabel: "Sample call",

  measured: {
    heading: ["No assumptions.", "Just the results."],
    intro:
      "Every metric comes directly from Chelsea Corner's call data for a single month.",
    cards: [
      { value: "2.176", label: "Calls handled", color: "#943e72" },
      { value: "407", label: "SMS sent", color: "#3773d7" },
      { value: "56%", label: "Recovered after hours", color: "#ef7200" },
      { value: "22%", label: "Captured after-hours", color: "#2f3d7c" },
    ],
  },

  related: [RREAL_TACOS, BAIRES_GRILL],
};
