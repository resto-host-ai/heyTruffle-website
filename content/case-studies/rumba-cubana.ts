import type { CaseStudy } from "./types";
import { RREAL_TACOS, BAIRES_GRILL } from "./related-cards";

export const rumbaCubana: CaseStudy = {
  slug: "rumba-cubana",
  name: "Rumba Cubana",
  seo: {
    title: "Rumba Cubana — Case Study — heytruffle",
    description:
      "How Rumba Cubana keeps six New Jersey kitchens covered with HeyTruffle — every call answered, the table booked and the link sent, with the same warm welcome at each.",
    canonical: "/case-study/rumba-cubana/",
  },
  logo: { src: "/images/rumbalogo.png", alt: "Rumba Cubana" },

  heroTags: ["Cuban", "Reservations", "New Jersey", "6 locations"],
  heroWidth: "narrow",
  headline: { lead: "Six kitchens, ", accent: "one warm welcome." },
  paragraphs: [
    "Rumba Cubana fields thousands of calls a month across six New Jersey locations, from reservations to pickup orders.",
    "heytruffle answers every one, books the table, and sends the link, with the same warm welcome at each.",
  ],
  heroStats: [
    { value: "4k", label: "Calls handled" },
    { value: "153", label: "Reservations booked" },
    { value: "885", label: "Links sent" },
  ],

  hostSampleLabel: "Sample call",

  measured: {
    heading: ["No assumptions.", "Just the results."],
    intro:
      "Every metric comes directly from Rumba Cubana's call data for a single month.",
    cards: [
      { value: "4.042", label: "Calls handled", color: "#943e72" },
      { value: "885", label: "SMS sent", color: "#3773d7" },
      { value: "35%", label: "Recovered after hours", color: "#ef7200" },
      { value: "55", label: "Host hours saved", color: "#2f3d7c" },
    ],
  },

  related: [RREAL_TACOS, BAIRES_GRILL],
};
